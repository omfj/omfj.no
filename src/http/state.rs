use std::sync::Arc;

use axum::extract::State;

use crate::auth::AuthService;
use crate::config::Config;
use crate::repository::{FilmRepository, LinkRepository, ReadingRepository, WishRepository};

#[derive(Clone)]
pub struct AppState {
    pub auth: AuthService,
    pub site_url: String,
    pub films: FilmRepository,
    pub links: LinkRepository,
    pub reading: ReadingRepository,
    pub wishes: WishRepository,
}

impl AppState {
    pub async fn from_config(config: &Config) -> anyhow::Result<Self> {
        let pool = crate::db::connect(config).await?;
        Ok(Self {
            site_url: config.site_url.to_owned(),
            auth: AuthService::new(config, pool.clone())?,
            films: FilmRepository::new(pool.clone()),
            links: LinkRepository::new(pool.clone()),
            reading: ReadingRepository::new(pool.clone()),
            wishes: WishRepository::new(pool),
        })
    }
}

pub(crate) type SharedState = State<Arc<AppState>>;
