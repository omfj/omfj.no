use chrono::{DateTime, Utc};
use sqlx::SqlitePool;

use crate::db::StorageError;
use crate::domain::WebUrl;

use super::domain::{ReadingItem, ReadingItemId};

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
    pub async fn list(&self) -> Result<Vec<ReadingItem>, StorageError> {
        sqlx::query_as!(
            ReadingItem,
            "SELECT id AS `id: ReadingItemId`, title, url, created_at AS `created_at: DateTime<Utc>`, read_at AS `read_at: DateTime<Utc>` FROM reading_items ORDER BY read_at IS NOT NULL, read_at DESC, created_at DESC, id DESC"
        )
        .fetch_all(&self.pool)
        .await
        .map_err(Into::into)
    }

    pub async fn create(&self, title: &str, url: &WebUrl) -> Result<ReadingItem, StorageError> {
        let url = url.as_str();
        sqlx::query_as!(
            ReadingItem,
            "INSERT INTO reading_items (title, url) VALUES (?, ?) RETURNING id AS `id: ReadingItemId`, title, url, created_at AS `created_at: DateTime<Utc>`, read_at AS `read_at: DateTime<Utc>`",
            title,
            url
        )
        .fetch_one(&self.pool)
        .await
        .map_err(Into::into)
    }

    /// Marks an item as read now, or unread if it was already read.
    pub async fn toggle_read(
        &self,
        id: ReadingItemId,
    ) -> Result<Option<ReadingItem>, StorageError> {
        sqlx::query_as!(
            ReadingItem,
            "UPDATE reading_items SET read_at = CASE WHEN read_at IS NULL THEN unixepoch() END WHERE id = ? RETURNING id AS `id: ReadingItemId`, title, url, created_at AS `created_at: DateTime<Utc>`, read_at AS `read_at: DateTime<Utc>`",
            id.0
        )
        .fetch_optional(&self.pool)
        .await
        .map_err(Into::into)
    }

    pub async fn delete(&self, id: ReadingItemId) -> Result<(), StorageError> {
        sqlx::query!("DELETE FROM reading_items WHERE id = ?", id.0)
            .execute(&self.pool)
            .await?;
        Ok(())
    }
}
