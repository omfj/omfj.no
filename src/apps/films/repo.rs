use chrono::{DateTime, Utc};
use sqlx::SqlitePool;

use crate::db::StorageError;

use super::domain::{Film, ImdbId, Rating};

/// Persists films and their ratings.
#[derive(Clone)]
pub struct FilmRepository {
    pool: SqlitePool,
}

impl FilmRepository {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    pub async fn list(&self) -> Result<Vec<Film>, StorageError> {
        sqlx::query_as!(
            Film,
            "SELECT id AS `id!`, title, rating, created_at AS `created_at: DateTime<Utc>` FROM films ORDER BY created_at DESC NULLS LAST, rowid DESC"
        )
        .fetch_all(&self.pool)
        .await
        .map_err(Into::into)
    }

    /// Creates or updates a film, keeping the original `created_at` on update.
    pub async fn save(
        &self,
        id: &ImdbId,
        title: &str,
        rating: Rating,
    ) -> Result<Film, StorageError> {
        let (id, rating) = (id.as_str(), rating.get());
        sqlx::query_as!(
            Film,
            "INSERT INTO films (id, title, rating, created_at) VALUES (?, ?, ?, unixepoch()) ON CONFLICT(id) DO UPDATE SET title = excluded.title, rating = excluded.rating RETURNING id AS `id!`, title, rating, created_at AS `created_at: DateTime<Utc>`",
            id,
            title,
            rating,
        )
        .fetch_one(&self.pool)
        .await
        .map_err(Into::into)
    }

    pub async fn delete(&self, id: &ImdbId) -> Result<(), StorageError> {
        let id = id.as_str();
        sqlx::query!("DELETE FROM films WHERE id = ?", id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }
}
