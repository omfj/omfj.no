use chrono::{DateTime, Utc};
use sqlx::SqlitePool;
use url::Url;

/// An entry on the reading list.
#[derive(Debug)]
pub struct ReadingItem {
    pub id: i64,
    pub title: String,
    pub url: String,
    pub created_at: DateTime<Utc>,
    pub read_at: Option<DateTime<Utc>>,
}

impl ReadingItem {
    /// The URL's hostname, for display next to the title.
    pub fn hostname(&self) -> String {
        Url::parse(&self.url)
            .ok()
            .and_then(|parsed| parsed.host_str().map(str::to_owned))
            .unwrap_or_default()
    }
}

/// Persists reading list items.
#[derive(Clone)]
pub struct ReadingRepository {
    pool: SqlitePool,
}

impl ReadingRepository {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    /// Lists unread items first, newest first, followed by read items, most recently read first.
    pub async fn list(&self) -> Result<Vec<ReadingItem>, sqlx::Error> {
        sqlx::query_as!(
            ReadingItem,
            "SELECT id, title, url, created_at AS `created_at: DateTime<Utc>`, read_at AS `read_at: DateTime<Utc>` FROM reading_items ORDER BY read_at IS NOT NULL, read_at DESC, created_at DESC, id DESC"
        )
        .fetch_all(&self.pool)
        .await
    }

    pub async fn create(&self, title: &str, url: &str) -> Result<ReadingItem, sqlx::Error> {
        sqlx::query_as!(
            ReadingItem,
            "INSERT INTO reading_items (title, url) VALUES (?, ?) RETURNING id, title, url, created_at AS `created_at: DateTime<Utc>`, read_at AS `read_at: DateTime<Utc>`",
            title,
            url
        )
        .fetch_one(&self.pool)
        .await
    }

    /// Marks an item as read now, or unread if it was already read.
    pub async fn toggle_read(&self, id: i64) -> Result<Option<ReadingItem>, sqlx::Error> {
        sqlx::query_as!(
            ReadingItem,
            "UPDATE reading_items SET read_at = CASE WHEN read_at IS NULL THEN unixepoch() END WHERE id = ? RETURNING id, title, url, created_at AS `created_at: DateTime<Utc>`, read_at AS `read_at: DateTime<Utc>`",
            id
        )
        .fetch_optional(&self.pool)
        .await
    }

    pub async fn delete(&self, id: i64) -> Result<(), sqlx::Error> {
        sqlx::query!("DELETE FROM reading_items WHERE id = ?", id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }
}
