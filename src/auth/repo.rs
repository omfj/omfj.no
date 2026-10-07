use sqlx::SqlitePool;
use time::Duration;

use crate::db::StorageError;

/// Persists OAuth state and authenticated sessions.
#[derive(Clone)]
pub struct AuthRepository {
    pool: SqlitePool,
}

impl AuthRepository {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    pub async fn create_oauth_state(
        &self,
        token: &str,
        provider: &str,
        ttl: Duration,
    ) -> Result<(), StorageError> {
        let ttl = ttl.whole_seconds();
        sqlx::query!(
            "INSERT INTO oauth_states (token, provider, expires_at) VALUES (?, ?, unixepoch() + ?)",
            token,
            provider,
            ttl
        )
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn consume_oauth_state(
        &self,
        token: &str,
        provider: &str,
    ) -> Result<bool, StorageError> {
        Ok(sqlx::query_scalar!(
            "DELETE FROM oauth_states WHERE token = ? AND provider = ? AND expires_at > unixepoch() RETURNING 1 AS `valid!: i64`",
            token,
            provider
        )
        .fetch_optional(&self.pool)
        .await?
        .is_some())
    }

    pub async fn create_session(
        &self,
        token: &str,
        provider: &str,
        subject: &str,
        username: &str,
        ttl: Duration,
    ) -> Result<(), StorageError> {
        let ttl = ttl.whole_seconds();
        sqlx::query!(
            "INSERT INTO sessions (token, provider, subject, username, expires_at) VALUES (?, ?, ?, ?, unixepoch() + ?)",
            token,
            provider,
            subject,
            username,
            ttl
        )
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn delete_session(&self, token: &str) -> Result<(), StorageError> {
        sqlx::query!("DELETE FROM sessions WHERE token = ?", token)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    pub async fn is_session_valid(&self, token: &str) -> Result<bool, StorageError> {
        Ok(sqlx::query_scalar!(
            "SELECT EXISTS(SELECT 1 FROM sessions WHERE token = ? AND expires_at > unixepoch())",
            token
        )
        .fetch_one(&self.pool)
        .await?
            != 0)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn oauth_state_and_session_lifecycle() {
        let pool = crate::db::connect_in_memory().await.unwrap();
        let repository = AuthRepository::new(pool);

        repository
            .create_oauth_state("state", "github", Duration::minutes(10))
            .await
            .unwrap();
        assert!(
            repository
                .consume_oauth_state("state", "github")
                .await
                .unwrap()
        );
        assert!(
            !repository
                .consume_oauth_state("state", "github")
                .await
                .unwrap()
        );

        repository
            .create_session("session", "github", "42", "user", Duration::days(30))
            .await
            .unwrap();
        assert!(repository.is_session_valid("session").await.unwrap());

        repository.delete_session("session").await.unwrap();
        assert!(!repository.is_session_valid("session").await.unwrap());
    }
}
