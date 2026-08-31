use serde::Serialize;
use sqlx::SqlitePool;

/// An item in the wishlist.
#[derive(Debug, Serialize, sqlx::FromRow)]
pub struct Wish {
    pub id: i64,
    pub title: String,
    pub url: Option<String>,
    pub notes: Option<String>,
}

/// Persists wishlist items.
#[derive(Clone)]
pub struct WishRepository {
    pool: SqlitePool,
}

impl WishRepository {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    pub async fn list(&self) -> Result<Vec<Wish>, sqlx::Error> {
        sqlx::query_as!(
            Wish,
            "SELECT id, title, url, notes FROM wishes ORDER BY id DESC",
        )
        .fetch_all(&self.pool)
        .await
    }

    pub async fn create(
        &self,
        title: &str,
        url: Option<&str>,
        notes: Option<&str>,
    ) -> Result<Wish, sqlx::Error> {
        let result = sqlx::query!(
            "INSERT INTO wishes (title, url, notes) VALUES (?, ?, ?)",
            title,
            url,
            notes,
        )
        .execute(&self.pool)
        .await?;
        Ok(Wish {
            id: result.last_insert_rowid(),
            title: title.into(),
            url: url.map(Into::into),
            notes: notes.map(Into::into),
        })
    }

    pub async fn delete(&self, id: i64) -> Result<(), sqlx::Error> {
        sqlx::query!("DELETE FROM wishes WHERE id = ?", id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }
}
