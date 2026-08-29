use std::env;

// Default values for configuration parameters.

const DEFAULT_PORT: u16 = 3000;
const DEFAULT_DATABASE_URL: &str = "sqlite::memory:";

// Environment variable names for configuration parameters.
// To prevent typos and reuse in the future.

const ENV_DATABASE_URL: &str = "DATABASE_URL";
const ENV_PORT: &str = "PORT";
const ENV_GITHUB_CLIENT_ID: &str = "GITHUB_CLIENT_ID";
const ENV_GITHUB_CLIENT_SECRET: &str = "GITHUB_CLIENT_SECRET";
const ENV_GITHUB_CALLBACK_URL: &str = "GITHUB_CALLBACK_URL";
const ENV_GITHUB_ALLOWED_LOGIN: &str = "GITHUB_ALLOWED_LOGIN";
const ENV_SECURE_COOKIES: &str = "SECURE_COOKIES";

/// Runtime configuration loaded from the environment and an optional `.env` file.
pub struct Config {
    /// The database connection URL.
    ///
    /// If not provided it defaults to an in-memory SQLite database.
    pub database_url: String,

    /// The port on which the application will listen for incoming HTTP requests.
    ///
    /// If not provided it defaults to `3000`.
    pub port: u16,

    /// The GitHub OAuth client ID for authentication.
    ///
    /// This is optional as we may not always need to authenticate with GitHub,
    /// depending on the application's use case.
    pub github_client_id: Option<String>,

    /// The GitHub OAuth client secret for authentication.
    ///
    /// This is optional as we may not always need to authenticate with GitHub,
    /// depending on the application's use case.
    pub github_client_secret: Option<String>,

    /// The callback URL for GitHub OAuth authentication.
    ///
    /// If not provided it defaults to an empty string.
    pub github_callback_url: String,

    /// The allowed GitHub ID login for authentication.
    ///
    /// If not provided it defaults to an empty string.
    pub github_allowed_login: String,

    /// Whether to use secure cookies (HTTPS only).
    pub secure_cookies: bool,
}

impl Config {
    /// Loads `.env`, then reads the application's environment variables.
    ///
    /// Values already present in the environment take precedence over `.env`.
    pub fn load() -> Self {
        dotenvy::dotenv().ok();

        Self {
            database_url: env::var(ENV_DATABASE_URL).unwrap_or(DEFAULT_DATABASE_URL.to_string()),
            port: env::var(ENV_PORT)
                .ok()
                .and_then(|value| value.parse().ok())
                .unwrap_or(DEFAULT_PORT),
            github_client_id: env::var(ENV_GITHUB_CLIENT_ID).ok(),
            github_client_secret: env::var(ENV_GITHUB_CLIENT_SECRET).ok(),
            github_callback_url: env::var(ENV_GITHUB_CALLBACK_URL).unwrap_or_default(),
            github_allowed_login: env::var(ENV_GITHUB_ALLOWED_LOGIN).unwrap_or_default(),
            secure_cookies: env::var(ENV_SECURE_COOKIES).map_or(true, |value| value != "false"),
        }
    }
}
