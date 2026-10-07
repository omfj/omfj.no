mod view;

use std::sync::Arc;

use crate::http::AppState;
use axum::response::IntoResponse;
use axum::{Router, http::header, routing::get};
use tower_http::services::ServeFile;

/// Registers the home page route.
pub(crate) fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/", get(view::home))
        .route_service("/dog.png", ServeFile::new("static/dog.png"))
        .route("/static/omfj.asc", get(gpg_key))
}

async fn gpg_key() -> impl IntoResponse {
    (
        [(header::CONTENT_TYPE, "text/plain; charset=utf-8")],
        include_str!("../../../static/omfj.asc"),
    )
}
