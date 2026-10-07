mod error;
mod feed;
mod layout;
mod routes;
mod session;
mod thoughts;

use std::sync::Arc;

use axum::{
    Router,
    extract::State,
    http::HeaderMap,
    response::{IntoResponse, Redirect, Response},
};
use maud::Markup;
use tower_http::{services::ServeDir, trace::TraceLayer};

use crate::{
    auth::AuthService,
    config::Config,
    repository::{FilmRepository, LinkRepository, ReadingRepository, WishRepository},
};

pub(crate) use error::AppError;
pub(crate) use layout::Layout;

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

/// Builds the application router and attaches its shared state and middleware.
pub fn router(state: AppState) -> Router {
    Router::new()
        .merge(routes::home::router())
        .merge(routes::habits::router())
        .merge(routes::films::router())
        .merge(routes::links::router())
        .merge(routes::reading::router())
        .merge(routes::wishlist::router())
        .merge(routes::thoughts::router())
        .merge(routes::auth::router())
        .nest_service("/static", ServeDir::new("static"))
        .fallback(routes::errors::not_found)
        .method_not_allowed_fallback(routes::errors::method_not_allowed)
        .layer(TraceLayer::new_for_http())
        .with_state(Arc::new(state))
}

// Check if the request is an HTMX request by looking for the "HX-Request" header.
pub(crate) fn is_htmx(headers: &HeaderMap) -> bool {
    headers
        .get("HX-Request")
        .is_some_and(|value| value == "true")
}

/// Returns an HTML fragment to HTMX clients and a redirect to regular form clients.
pub(crate) fn mutation_response(
    headers: &HeaderMap,
    fragment: Markup,
    fallback: &'static str,
) -> Response {
    if is_htmx(headers) {
        fragment.into_response()
    } else {
        Redirect::to(fallback).into_response()
    }
}
