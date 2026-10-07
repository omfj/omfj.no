use std::sync::Arc;

use axum::extract::State;

use crate::apps::films::FilmRepository;
use crate::apps::links::LinkRepository;
use crate::apps::reading::{HttpTitleFetcher, ReadingRepository, TitleFetcher};
use crate::apps::wishlist::WishRepository;
use crate::auth::AuthService;
use crate::config::Config;

#[derive(Clone)]
pub struct AppState {
    pub auth: AuthService,
    pub site_url: String,
    pub secure_cookies: bool,
    pub films: FilmRepository,
    pub links: LinkRepository,
    pub reading: ReadingRepository,
    pub wishes: WishRepository,
    pub titles: Arc<dyn TitleFetcher>,
}

impl AppState {
    pub async fn from_config(config: &Config) -> anyhow::Result<Self> {
        let pool = crate::db::connect(config).await?;
        // One client for all outbound requests, so connections are pooled and reused.
        let http = reqwest::Client::builder()
            .user_agent(concat!("omfj-no-rs/", env!("CARGO_PKG_VERSION")))
            .build()?;

        Ok(Self {
            site_url: config.site_url.to_owned(),
            secure_cookies: config.secure_cookies,
            auth: AuthService::new(config, pool.clone(), http.clone()),
            titles: Arc::new(HttpTitleFetcher::new(http)),
            films: FilmRepository::new(pool.clone()),
            links: LinkRepository::new(pool.clone()),
            reading: ReadingRepository::new(pool.clone()),
            wishes: WishRepository::new(pool),
        })
    }
}

pub(crate) type SharedState = State<Arc<AppState>>;
