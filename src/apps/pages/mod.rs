//! Standalone pages that are only views, with no domain or storage behind them.

mod habits;
mod home;

use axum::response::IntoResponse;
use axum::{http::header, routing::get};
use tower_http::services::ServeFile;

use crate::http::AppRouter;

/// Registers the home page, the habit tracker, and the files linked from the home page.
pub(crate) fn router() -> AppRouter {
    AppRouter::new()
        .route("/", get(home::home))
        .route("/habits", get(habits::habits))
        .route_service("/dog.png", ServeFile::new("static/dog.png"))
        .route("/static/omfj.asc", get(gpg_key))
}

async fn gpg_key() -> impl IntoResponse {
    (
        [(header::CONTENT_TYPE, "text/plain; charset=utf-8")],
        include_str!("../../../static/omfj.asc"),
    )
}
