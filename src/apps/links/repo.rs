use sqlx::SqlitePool;

use crate::db::StorageError;
use crate::domain::WebUrl;

use super::domain::{LinkId, RecommendedLink};

/// Persists recommended links.
#[derive(Clone)]
pub struct LinkRepository {
    pool: SqlitePool,
}

impl LinkRepository {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    pub async fn list(&self) -> Result<Vec<RecommendedLink>, StorageError> {
        let links = sqlx::query!("SELECT id, title, url FROM links ORDER BY id DESC")
            .fetch_all(&self.pool)
            .await?;
        Ok(links
            .into_iter()
            .map(|link| RecommendedLink::with_hostname(LinkId(link.id), link.title, link.url))
            .collect())
    }

    pub async fn create(&self, title: &str, url: &WebUrl) -> Result<RecommendedLink, StorageError> {
        let url = url.as_str();
        let result = sqlx::query!("INSERT INTO links (title, url) VALUES (?, ?)", title, url)
            .execute(&self.pool)
            .await?;
        Ok(RecommendedLink::with_hostname(
            LinkId(result.last_insert_rowid()),
            title.into(),
            url.into(),
        ))
    }

    pub async fn delete(&self, id: LinkId) -> Result<(), StorageError> {
        sqlx::query!("DELETE FROM links WHERE id = ?", id.0)
            .execute(&self.pool)
            .await?;
        Ok(())
    }
}
