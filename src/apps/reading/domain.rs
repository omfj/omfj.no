use chrono::{DateTime, Utc};

use crate::domain::entity_id;

entity_id!(
    /// Identifies a reading list item.
    ReadingItemId
);

/// An entry on the reading list.
#[derive(Debug)]
pub struct ReadingItem {
    pub id: ReadingItemId,
    pub title: String,
    pub url: String,
    pub created_at: DateTime<Utc>,
    pub read_at: Option<DateTime<Utc>>,
}

impl ReadingItem {
    /// The URL's hostname, for display next to the title.
    pub fn hostname(&self) -> String {
        crate::domain::hostname(&self.url)
    }
}
