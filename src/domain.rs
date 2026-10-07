//! Value objects shared by several features.
//!
//! Each type can only be constructed through its parser, so a value that exists is valid.

use std::fmt;

use url::Url;

use crate::validation::ValidationError;

/// An absolute `http` or `https` URL with a host.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct WebUrl(Url);

impl WebUrl {
    pub fn parse(input: &str) -> Result<Self, ValidationError> {
        let url = Url::parse(input.trim()).map_err(|_| ValidationError("Enter a valid URL."))?;
        if !matches!(url.scheme(), "http" | "https") {
            return Err(ValidationError("Enter an http(s) URL."));
        }
        if url.host_str().is_none() {
            return Err(ValidationError("The URL needs a host."));
        }
        Ok(Self(url))
    }

    pub fn as_str(&self) -> &str {
        self.0.as_str()
    }
}

impl fmt::Display for WebUrl {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(self.as_str())
    }
}

/// Declares a row identifier type, so one entity's id cannot be passed where another's is expected.
macro_rules! entity_id {
    ($(#[$meta:meta])* $name:ident) => {
        $(#[$meta])*
        #[derive(Debug, Clone, Copy, PartialEq, Eq, serde::Deserialize, serde::Serialize, sqlx::Type)]
        #[serde(transparent)]
        #[sqlx(transparent)]
        pub struct $name(pub i64);

        impl std::fmt::Display for $name {
            fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
                self.0.fmt(f)
            }
        }
    };
}
pub(crate) use entity_id;

/// Returns the host of a stored URL for display, or an empty string if it has none.
pub fn hostname(url: &str) -> String {
    Url::parse(url)
        .ok()
        .and_then(|parsed| parsed.host_str().map(str::to_owned))
        .unwrap_or_default()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn web_url_accepts_trimmed_http_urls() {
        let url = WebUrl::parse("  https://example.com/post ").unwrap();
        assert_eq!(url.as_str(), "https://example.com/post");
    }

    #[test]
    fn web_url_rejects_non_web_urls() {
        for input in ["not a url", "ftp://example.com"] {
            assert!(WebUrl::parse(input).is_err(), "{input}");
        }
    }
}
