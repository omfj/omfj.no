use serde::Serialize;

use crate::domain::{entity_id, hostname};

entity_id!(
    /// Identifies a recommended link.
    LinkId
);

/// A recommended link with a display-ready hostname.
#[derive(Debug, Serialize)]
pub struct RecommendedLink {
    pub id: LinkId,
    pub title: String,
    pub url: String,
    pub hostname: String,
}

impl RecommendedLink {
    pub(super) fn with_hostname(id: LinkId, title: String, url: String) -> Self {
        Self {
            id,
            hostname: hostname(&url),
            title,
            url,
        }
    }
}
