use sqlx::SqlitePool;

use crate::db::StorageError;
use crate::domain::WebUrl;

use super::domain::{Wish, WishId};

/// Persists wishlist items.
#[derive(Clone)]
pub struct WishRepository {
    pool: SqlitePool,
}

impl WishRepository {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    pub async fn list(&self) -> Result<Vec<Wish>, StorageError> {
        sqlx::query_as!(
            Wish,
            "SELECT id AS `id: WishId`, title, url, notes FROM wishes ORDER BY id DESC",
        )
        .fetch_all(&self.pool)
        .await
        .map_err(Into::into)
    }

    pub async fn create(
        &self,
        title: &str,
        url: Option<&WebUrl>,
        notes: Option<&str>,
    ) -> Result<Wish, StorageError> {
        let url = url.map(WebUrl::as_str);
        let result = sqlx::query!(
            "INSERT INTO wishes (title, url, notes) VALUES (?, ?, ?)",
            title,
            url,
            notes,
        )
        .execute(&self.pool)
        .await?;
        Ok(Wish {
            id: WishId(result.last_insert_rowid()),
            title: title.into(),
            url: url.map(Into::into),
            notes: notes.map(Into::into),
        })
    }

    pub async fn delete(&self, id: WishId) -> Result<(), StorageError> {
        sqlx::query!("DELETE FROM wishes WHERE id = ?", id.0)
            .execute(&self.pool)
            .await?;
        Ok(())
    }
}
