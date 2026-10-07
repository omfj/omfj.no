//! Authentication: OAuth sign-in and server-side sessions.

mod github;
mod repo;
pub(crate) mod web;

use std::{collections::HashMap, sync::Arc};

use async_trait::async_trait;
use sqlx::SqlitePool;
use time::Duration;

use url::Url;
use uuid::Uuid;

use self::{github::GitHubOAuth, repo::AuthRepository};
use crate::{config::Config, db::StorageError};

/// A user identity returned by an OAuth provider.
pub struct OAuthIdentity {
    pub subject: String,
    pub username: String,
}

/// The provider-specific parts of an OAuth authorization-code flow.
#[async_trait]
pub trait OAuthProvider: Send + Sync {
    /// Returns the stable identifier used in routes and persisted records.
    fn id(&self) -> &'static str;

    /// Creates the URL to which the browser should be redirected.
    fn authorization_url(&self, state: &str) -> Url;

    /// Exchanges an authorization code for the provider's user identity.
    async fn exchange_code(&self, code: &str) -> Result<OAuthIdentity, OAuthError>;

    /// Applies the provider's authorization policy to an authenticated identity.
    fn is_allowed(&self, identity: &OAuthIdentity) -> bool;
}

#[derive(Debug, thiserror::Error)]
pub enum OAuthError {
    #[error(transparent)]
    Http(#[from] reqwest::Error),
}

/// How long a visitor has to complete sign-in at the provider.
pub const OAUTH_STATE_TTL: Duration = Duration::minutes(10);

/// How long a session stays valid after sign-in.
pub const SESSION_TTL: Duration = Duration::days(30);

/// Why a sign-in attempt was refused or failed.
#[derive(Debug, thiserror::Error)]
pub enum LoginError {
    #[error("the requested OAuth provider is not configured")]
    ProviderNotConfigured,
    #[error("the OAuth state is missing, expired, or does not match")]
    InvalidState,
    #[error("the account is not allowed to sign in")]
    NotAllowed,
    #[error(transparent)]
    OAuth(#[from] OAuthError),
    #[error(transparent)]
    Storage(#[from] StorageError),
}

/// A sign-in attempt that has been started but not yet completed.
pub struct PendingLogin {
    /// Where to send the browser.
    pub authorization_url: Url,
    /// The anti-forgery token the provider will echo back to the callback.
    pub state: String,
}

/// Signs visitors in through the configured OAuth providers and tracks their sessions.
#[derive(Clone)]
pub struct AuthService {
    providers: Arc<HashMap<&'static str, Arc<dyn OAuthProvider>>>,
    repository: AuthRepository,
}

impl AuthService {
    /// Creates the configured OAuth providers.
    pub fn new(config: &Config, pool: SqlitePool, http: reqwest::Client) -> Self {
        let mut providers: Vec<Arc<dyn OAuthProvider>> = Vec::new();

        // Add GitHub provider if configured.
        if let (Some(client_id), Some(client_secret)) = (
            config.github_client_id.as_ref(),
            config.github_client_secret.as_ref(),
        ) {
            let github = GitHubOAuth {
                http,
                client_id: client_id.clone(),
                client_secret: client_secret.clone(),
                callback_url: config.github_callback_url.clone(),
                allowed_login: config.github_allowed_login.clone(),
            };
            providers.push(Arc::new(github));
        }

        Self::from_providers(providers, pool)
    }

    /// Builds an authentication service from provider implementations.
    pub fn from_providers(
        providers: impl IntoIterator<Item = Arc<dyn OAuthProvider>>,
        pool: SqlitePool,
    ) -> Self {
        let providers = providers
            .into_iter()
            .map(|provider| (provider.id(), provider))
            .collect::<HashMap<_, _>>();
        Self {
            providers: Arc::new(providers),
            repository: AuthRepository::new(pool),
        }
    }

    fn provider(&self, id: &str) -> Result<&dyn OAuthProvider, LoginError> {
        self.providers
            .get(id)
            .map(AsRef::as_ref)
            .ok_or(LoginError::ProviderNotConfigured)
    }

    /// Starts sign-in with a provider by issuing a short-lived, single-use state token.
    pub async fn begin_login(&self, provider_id: &str) -> Result<PendingLogin, LoginError> {
        let provider = self.provider(provider_id)?;
        let state = Uuid::new_v4().to_string();
        self.repository
            .create_oauth_state(&state, provider_id, OAUTH_STATE_TTL)
            .await?;
        Ok(PendingLogin {
            authorization_url: provider.authorization_url(&state),
            state,
        })
    }

    /// Completes sign-in and returns a new session token.
    ///
    /// `returned_state` is what the provider echoed back; `expected_state` is what this
    /// browser was given in [`Self::begin_login`]. They must match, and the state is consumed
    /// so it cannot be replayed.
    pub async fn complete_login(
        &self,
        provider_id: &str,
        code: &str,
        returned_state: &str,
        expected_state: Option<&str>,
    ) -> Result<String, LoginError> {
        let provider = self.provider(provider_id)?;
        if expected_state != Some(returned_state)
            || !self
                .repository
                .consume_oauth_state(returned_state, provider_id)
                .await?
        {
            return Err(LoginError::InvalidState);
        }

        let identity = provider.exchange_code(code).await?;
        if !provider.is_allowed(&identity) {
            return Err(LoginError::NotAllowed);
        }

        Ok(self.create_session(provider_id, &identity).await?)
    }

    /// Creates a session for an identity that has already been authenticated.
    pub async fn create_session(
        &self,
        provider: &str,
        identity: &OAuthIdentity,
    ) -> Result<String, StorageError> {
        let token = Uuid::new_v4().to_string();
        self.repository
            .create_session(
                &token,
                provider,
                &identity.subject,
                &identity.username,
                SESSION_TTL,
            )
            .await?;
        Ok(token)
    }

    pub async fn sign_out(&self, token: &str) -> Result<(), StorageError> {
        self.repository.delete_session(token).await
    }

    pub async fn is_session_valid(&self, token: &str) -> Result<bool, StorageError> {
        self.repository.is_session_valid(token).await
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    /// A provider that skips the network and returns a fixed identity.
    struct FakeProvider {
        allowed: bool,
    }

    #[async_trait]
    impl OAuthProvider for FakeProvider {
        fn id(&self) -> &'static str {
            "fake"
        }

        fn authorization_url(&self, state: &str) -> Url {
            Url::parse(&format!("https://provider.test/authorize?state={state}")).unwrap()
        }

        async fn exchange_code(&self, _code: &str) -> Result<OAuthIdentity, OAuthError> {
            Ok(OAuthIdentity {
                subject: "1".into(),
                username: "tester".into(),
            })
        }

        fn is_allowed(&self, _identity: &OAuthIdentity) -> bool {
            self.allowed
        }
    }

    async fn service(allowed: bool) -> AuthService {
        let pool = crate::db::connect_in_memory().await.unwrap();
        AuthService::from_providers([Arc::new(FakeProvider { allowed }) as _], pool)
    }

    #[tokio::test]
    async fn completes_login_once_per_state() {
        let auth = service(true).await;
        let pending = auth.begin_login("fake").await.unwrap();
        let state = pending.state.as_str();

        let session = auth
            .complete_login("fake", "code", state, Some(state))
            .await
            .unwrap();
        assert!(auth.is_session_valid(&session).await.unwrap());

        let replay = auth
            .complete_login("fake", "code", state, Some(state))
            .await;
        assert!(matches!(replay, Err(LoginError::InvalidState)));

        auth.sign_out(&session).await.unwrap();
        assert!(!auth.is_session_valid(&session).await.unwrap());
    }

    #[tokio::test]
    async fn rejects_a_state_that_does_not_match_the_browser() {
        let auth = service(true).await;
        let pending = auth.begin_login("fake").await.unwrap();

        let result = auth
            .complete_login("fake", "code", &pending.state, Some("other"))
            .await;
        assert!(matches!(result, Err(LoginError::InvalidState)));

        let result = auth
            .complete_login("fake", "code", &pending.state, None)
            .await;
        assert!(matches!(result, Err(LoginError::InvalidState)));
    }

    #[tokio::test]
    async fn rejects_accounts_the_provider_does_not_allow() {
        let auth = service(false).await;
        let pending = auth.begin_login("fake").await.unwrap();
        let state = pending.state.as_str();

        let result = auth
            .complete_login("fake", "code", state, Some(state))
            .await;
        assert!(matches!(result, Err(LoginError::NotAllowed)));
    }

    #[tokio::test]
    async fn unknown_providers_are_not_configured() {
        let auth = service(true).await;
        assert!(matches!(
            auth.begin_login("nope").await,
            Err(LoginError::ProviderNotConfigured)
        ));
    }
}
