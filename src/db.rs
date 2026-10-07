use sqlx::{
    SqlitePool,
    migrate::MigrateError,
    sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions},
};
use thiserror::Error;

use crate::config::Config;

#[derive(Debug, Error)]
pub enum DbError {
    #[error("database error: {0}")]
    Database(#[from] sqlx::Error),
    #[error("database migration error: {0}")]
    Migration(#[from] MigrateError),
}

/// A failure in the persistence layer.
#[derive(Debug, Error)]
#[error(transparent)]
pub struct StorageError(#[from] sqlx::Error);

/// Connects to the configured SQLite database and applies pending migrations.
pub async fn connect(config: &Config) -> Result<SqlitePool, DbError> {
    let options: SqliteConnectOptions = config.database_url.parse()?;

    // Honestly the `max_connections` probably doesn't matter for SQLite? Not sure,
    // so I am just leaving it at 5 for now.
    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect_with(
            options
                .create_if_missing(true)
                .journal_mode(SqliteJournalMode::Wal),
        )
        .await?;

    // Run the migrations to ensure the database schema is up to date.
    sqlx::migrate!().run(&pool).await?;

    Ok(pool)
}

/// Opens a fresh, migrated in-memory database for tests.
#[cfg(test)]
pub async fn connect_in_memory() -> Result<SqlitePool, DbError> {
    let pool = SqlitePoolOptions::new().connect("sqlite::memory:").await?;
    sqlx::migrate!().run(&pool).await?;
    Ok(pool)
}
