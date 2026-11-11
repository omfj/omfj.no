use std::{env, str::FromStr};

// Default values for configuration parameters.

const DEFAULT_PORT: u16 = 3000;
const DEFAULT_DATABASE_URL: &str = "sqlite::memory:";
#[cfg(debug_assertions)]
const DEFAULT_SITE_URL: &str = "http://127.0.0.1:3000";
#[cfg(not(debug_assertions))]
const DEFAULT_SITE_URL: &str = "https://omfj.no";

// Environment variable names for configuration parameters.
// To prevent typos and reuse in the future.

const ENV_DATABASE_URL: &str = "DATABASE_URL";
const ENV_SITE_URL: &str = "SITE_URL";
const ENV_PORT: &str = "PORT";
const ENV_AUTH: &str = "AUTH";

/// Runtime configuration loaded from the environment and an optional `.env` file.
pub struct Config {
    /// The database connection URL.
    ///
    /// If not provided it defaults to an in-memory SQLite database.
    pub database_url: String,

    /// The public origin used for absolute URLs.
    pub site_url: String,

    /// The port on which the application will listen for incoming HTTP requests.
    ///
    /// If not provided it defaults to `3000`.
    pub port: u16,

    /// How visitors are signed in.
    ///
    /// If not provided it defaults to [`AuthMode::None`].
    pub auth: AuthMode,
}

/// How the app decides whether a visitor is signed in.
#[derive(Clone, Copy, Debug, Default, PartialEq, Eq)]
pub enum AuthMode {
    /// Everyone is signed out.
    #[default]
    None,
    /// Requests carrying the `X-Tailnet-User` header are signed in.
    ///
    /// Only use this when the app is reachable exclusively through a reverse proxy
    /// that strips the header from incoming requests and sets it for tailnet clients.
    Tailnet,
    /// Everyone is signed in. For local development only.
    Always,
}

impl FromStr for AuthMode {
    type Err = anyhow::Error;

    fn from_str(value: &str) -> Result<Self, Self::Err> {
        match value.trim().to_ascii_lowercase().as_str() {
            "" | "none" => Ok(Self::None),
            "tailnet" => Ok(Self::Tailnet),
            "always" => Ok(Self::Always),
            other => anyhow::bail!(
                "invalid {ENV_AUTH}={other:?}, expected one of: none, tailnet, always"
            ),
        }
    }
}

impl Config {
    /// Loads `.env`, then reads the application's environment variables.
    ///
    /// Values already present in the environment take precedence over `.env`.
    pub fn load() -> anyhow::Result<Self> {
        dotenvy::dotenv().ok();

        let database_url = env::var(ENV_DATABASE_URL).unwrap_or(DEFAULT_DATABASE_URL.to_string());
        if database_url == DEFAULT_DATABASE_URL {
            tracing::warn!("⚠️ Using in-memory database")
        }

        let auth = env::var(ENV_AUTH)
            .ok()
            .map(|value| value.parse())
            .transpose()?
            .unwrap_or_default();
        if auth == AuthMode::Always {
            tracing::warn!("⚠️ {ENV_AUTH}=always: every visitor is signed in")
        }

        Ok(Self {
            database_url: env::var(ENV_DATABASE_URL).unwrap_or(DEFAULT_DATABASE_URL.to_string()),
            site_url: env::var(ENV_SITE_URL)
                .unwrap_or(DEFAULT_SITE_URL.to_string())
                .trim_end_matches('/')
                .to_owned(),
            port: env::var(ENV_PORT)
                .ok()
                .and_then(|value| value.parse().ok())
                .unwrap_or(DEFAULT_PORT),
            auth,
        })
    }
}

#[cfg(test)]
mod tests {
    use super::AuthMode;

    #[test]
    fn parses_auth_modes() {
        assert_eq!("none".parse::<AuthMode>().unwrap(), AuthMode::None);
        assert_eq!("".parse::<AuthMode>().unwrap(), AuthMode::None);
        assert_eq!(" Tailnet ".parse::<AuthMode>().unwrap(), AuthMode::Tailnet);
        assert_eq!("always".parse::<AuthMode>().unwrap(), AuthMode::Always);
        assert!("true".parse::<AuthMode>().is_err());
    }
}
