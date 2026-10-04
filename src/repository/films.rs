use chrono::{DateTime, Utc};
use serde::Serialize;
use sqlx::SqlitePool;

/// A film saved in the personal film list.
#[derive(Debug, Serialize, sqlx::FromRow)]
pub struct Film {
    pub id: String,
    pub title: String,
    pub rating: i64,
    pub created_at: Option<DateTime<Utc>>,
}

/// Persists films and their ratings.
#[derive(Clone)]
pub struct FilmRepository {
    pool: SqlitePool,
}

impl FilmRepository {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    pub async fn list(&self) -> Result<Vec<Film>, sqlx::Error> {
        sqlx::query_as!(
            Film,
            "SELECT id AS `id!`, title, rating, created_at AS `created_at: DateTime<Utc>` FROM films ORDER BY created_at DESC NULLS LAST, rowid DESC"
        )
        .fetch_all(&self.pool)
        .await
    }

    /// Creates or updates a film, keeping the original `created_at` on update.
    pub async fn save(&self, id: &str, title: &str, rating: i64) -> Result<Film, sqlx::Error> {
        sqlx::query_as!(
            Film,
            "INSERT INTO films (id, title, rating, created_at) VALUES (?, ?, ?, unixepoch()) ON CONFLICT(id) DO UPDATE SET title = excluded.title, rating = excluded.rating RETURNING id AS `id!`, title, rating, created_at AS `created_at: DateTime<Utc>`",
            id,
            title,
            rating,
        )
        .fetch_one(&self.pool)
        .await
    }

    pub async fn delete(&self, id: &str) -> Result<(), sqlx::Error> {
        sqlx::query!("DELETE FROM films WHERE id = ?", id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }
}
