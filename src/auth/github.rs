use async_trait::async_trait;
use reqwest::header;
use serde::Deserialize;
use url::Url;

use super::{OAuthError, OAuthIdentity, OAuthProvider};

/// GitHub's OAuth app flow, restricted to a single allowed login.
pub(super) struct GitHubOAuth {
    pub(super) http: reqwest::Client,
    pub(super) client_id: String,
    pub(super) client_secret: String,
    pub(super) callback_url: String,
    pub(super) allowed_login: String,
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
    use std::collections::HashMap;

    use super::*;
    use crate::auth::{OAuthIdentity, OAuthProvider};

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
