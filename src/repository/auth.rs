use sqlx::SqlitePool;

/// Persists OAuth state and authenticated sessions.
#[derive(Clone)]
pub struct AuthRepository {
    pool: SqlitePool,
}

impl AuthRepository {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    pub async fn create_oauth_state(&self, token: &str, provider: &str) -> Result<(), sqlx::Error> {
        sqlx::query!(
            "INSERT INTO oauth_states (token, provider, expires_at) VALUES (?, ?, unixepoch() + 600)",
            token,
            provider
        )
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn consume_oauth_state(
        &self,
        token: &str,
        provider: &str,
    ) -> Result<bool, sqlx::Error> {
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
    ) -> Result<(), sqlx::Error> {
        sqlx::query!(
            "INSERT INTO sessions (token, provider, subject, username, expires_at) VALUES (?, ?, ?, ?, unixepoch() + 2592000)",
            token,
            provider,
            subject,
            username
        )
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn delete_session(&self, token: &str) -> Result<(), sqlx::Error> {
        sqlx::query!("DELETE FROM sessions WHERE token = ?", token)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    pub async fn is_session_valid(&self, token: &str) -> Result<bool, sqlx::Error> {
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
    use sqlx::sqlite::SqlitePoolOptions;

    use super::*;

    #[tokio::test]
    async fn oauth_state_and_session_lifecycle() {
        let pool = SqlitePoolOptions::new()
            .max_connections(1)
            .connect("sqlite::memory:")
            .await
            .unwrap();
        sqlx::migrate!().run(&pool).await.unwrap();
        let repository = AuthRepository::new(pool);

        repository
            .create_oauth_state("state", "github")
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
            .create_session("session", "github", "42", "user")
            .await
            .unwrap();
        assert!(repository.is_session_valid("session").await.unwrap());

        repository.delete_session("session").await.unwrap();
        assert!(!repository.is_session_valid("session").await.unwrap());
    }
}
