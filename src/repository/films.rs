use serde::Serialize;
use sqlx::SqlitePool;

/// A film saved in the personal film list.
#[derive(Debug, Serialize, sqlx::FromRow)]
pub struct Film {
    pub id: String,
    pub title: String,
    pub rating: i64,
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
            "SELECT id AS `id!`, title, rating FROM films ORDER BY rowid"
        )
        .fetch_all(&self.pool)
        .await
    }

    pub async fn save(&self, id: &str, title: &str, rating: i64) -> Result<(), sqlx::Error> {
        sqlx::query!(
            "INSERT INTO films (id, title, rating) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET title = excluded.title, rating = excluded.rating",
            id,
            title,
            rating,
        )
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn delete(&self, id: &str) -> Result<(), sqlx::Error> {
        sqlx::query!("DELETE FROM films WHERE id = ?", id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }
}
