use serde::Serialize;
use sqlx::SqlitePool;
use url::Url;

/// A recommended link with a display-ready hostname.
#[derive(Debug, Serialize)]
pub struct RecommendedLink {
    pub id: i64,
    pub title: String,
    pub url: String,
    pub hostname: String,
}

impl RecommendedLink {
    fn with_hostname(id: i64, title: String, url: String) -> Self {
        let hostname = Url::parse(&url)
            .ok()
            .and_then(|parsed| parsed.host_str().map(str::to_owned))
            .unwrap_or_default();

        Self {
            id,
            title,
            url,
            hostname,
        }
    }
}

/// Persists recommended links.
#[derive(Clone)]
pub struct LinkRepository {
    pool: SqlitePool,
}

impl LinkRepository {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    pub async fn list(&self) -> Result<Vec<RecommendedLink>, sqlx::Error> {
        let links = sqlx::query!("SELECT id, title, url FROM links ORDER BY id DESC")
            .fetch_all(&self.pool)
            .await?;
        Ok(links
            .into_iter()
            .map(|link| RecommendedLink::with_hostname(link.id, link.title, link.url))
            .collect())
    }

    pub async fn create(&self, title: &str, url: &str) -> Result<RecommendedLink, sqlx::Error> {
        let result = sqlx::query!("INSERT INTO links (title, url) VALUES (?, ?)", title, url)
            .execute(&self.pool)
            .await?;
        Ok(RecommendedLink::with_hostname(
            result.last_insert_rowid(),
            title.into(),
            url.into(),
        ))
    }

    pub async fn delete(&self, id: i64) -> Result<(), sqlx::Error> {
        sqlx::query!("DELETE FROM links WHERE id = ?", id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }
}
