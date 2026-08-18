use std::{collections::HashMap, sync::Arc};

use async_trait::async_trait;
use reqwest::header;
use serde::Deserialize;
use sqlx::SqlitePool;
use url::Url;
use uuid::Uuid;

use crate::{config::Config, repository::AuthRepository};

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

#[derive(Clone)]
pub struct AuthService {
    providers: Arc<HashMap<&'static str, Arc<dyn OAuthProvider>>>,
    repository: AuthRepository,
    pub secure_cookies: bool,
}

impl AuthService {
    /// Creates the configured OAuth providers.
    pub fn new(config: &Config, pool: SqlitePool) -> Result<Self, reqwest::Error> {
        // Create http client with a custom user agent. This is the user http client
        // that will be used by the OAuth providers to make requests to the provider's API.
        let http = reqwest::Client::builder()
            .user_agent("omfj-no-rs/0.1")
            .build()?;

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

        Ok(Self::from_providers(providers, pool, config.secure_cookies))
    }

    /// Builds an authentication service from provider implementations.
    pub fn from_providers(
        providers: impl IntoIterator<Item = Arc<dyn OAuthProvider>>,
        pool: SqlitePool,
        secure_cookies: bool,
    ) -> Self {
        let providers = providers
            .into_iter()
            .map(|provider| (provider.id(), provider))
            .collect::<HashMap<_, _>>();
        Self {
            providers: Arc::new(providers),
            repository: AuthRepository::new(pool),
            secure_cookies,
        }
    }

    pub fn provider(&self, id: &str) -> Option<Arc<dyn OAuthProvider>> {
        self.providers.get(id).cloned()
    }

    pub async fn create_oauth_state(&self, provider: &str) -> Result<String, sqlx::Error> {
        let token = Uuid::new_v4().to_string();
        self.repository.create_oauth_state(&token, provider).await?;
        Ok(token)
    }

    pub async fn consume_oauth_state(
        &self,
        token: &str,
        provider: &str,
    ) -> Result<bool, sqlx::Error> {
        self.repository.consume_oauth_state(token, provider).await
    }

    pub async fn create_session(
        &self,
        provider: &str,
        identity: &OAuthIdentity,
    ) -> Result<String, sqlx::Error> {
        let token = Uuid::new_v4().to_string();
        self.repository
            .create_session(&token, provider, &identity.subject, &identity.username)
            .await?;
        Ok(token)
    }

    pub async fn delete_session(&self, token: &str) -> Result<(), sqlx::Error> {
        self.repository.delete_session(token).await
    }

    pub async fn is_session_valid(&self, token: &str) -> Result<bool, sqlx::Error> {
        self.repository.is_session_valid(token).await
    }
}

struct GitHubOAuth {
    http: reqwest::Client,
    client_id: String,
    client_secret: String,
    callback_url: String,
    allowed_login: String,
}

#[derive(Deserialize)]
struct GitHubToken {
    access_token: String,
}

#[derive(Deserialize)]
struct GitHubUser {
    id: u64,
    login: String,
}

#[async_trait]
impl OAuthProvider for GitHubOAuth {
    fn id(&self) -> &'static str {
        "github"
    }

    fn authorization_url(&self, state: &str) -> Url {
        let mut url = Url::parse("https://github.com/login/oauth/authorize").expect("static URL");
        url.query_pairs_mut()
            .append_pair("client_id", &self.client_id)
            .append_pair("redirect_uri", &self.callback_url)
            .append_pair("scope", "read:user")
            .append_pair("state", state);
        url
    }

    async fn exchange_code(&self, code: &str) -> Result<OAuthIdentity, OAuthError> {
        let token = self
            .http
            .post("https://github.com/login/oauth/access_token")
            .header(header::ACCEPT, "application/json")
            .form(&[
                ("client_id", self.client_id.as_str()),
                ("client_secret", self.client_secret.as_str()),
                ("code", code),
                ("redirect_uri", self.callback_url.as_str()),
            ])
            .send()
            .await?
            .error_for_status()?
            .json::<GitHubToken>()
            .await?;
        let user = self
            .http
            .get("https://api.github.com/user")
            .bearer_auth(token.access_token)
            .send()
            .await?
            .error_for_status()?
            .json::<GitHubUser>()
            .await?;

        Ok(OAuthIdentity {
            subject: user.id.to_string(),
            username: user.login,
        })
    }

    fn is_allowed(&self, identity: &OAuthIdentity) -> bool {
        identity.username.eq_ignore_ascii_case(&self.allowed_login)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn github() -> GitHubOAuth {
        GitHubOAuth {
            http: reqwest::Client::new(),
            client_id: "client-id".into(),
            client_secret: "client-secret".into(),
            callback_url: "http://localhost/auth/github/callback".into(),
            allowed_login: "AllowedUser".into(),
        }
    }

    #[test]
    fn github_authorization_url_contains_the_shared_flow_parameters() {
        let provider = github();
        let url = provider.authorization_url("state-token");
        let query = url.query_pairs().collect::<HashMap<_, _>>();

        assert_eq!(provider.id(), "github");
        assert_eq!(
            query.get("client_id").map(|value| value.as_ref()),
            Some("client-id")
        );
        assert_eq!(
            query.get("state").map(|value| value.as_ref()),
            Some("state-token")
        );
        assert_eq!(
            query.get("scope").map(|value| value.as_ref()),
            Some("read:user")
        );
    }

    #[test]
    fn github_allows_the_configured_login_case_insensitively() {
        let identity = OAuthIdentity {
            subject: "1".into(),
            username: "alloweduser".into(),
        };

        assert!(github().is_allowed(&identity));
    }
}
