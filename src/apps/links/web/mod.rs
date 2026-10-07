mod action;
mod view;

use axum::routing::{delete, get};

use crate::http::AppRouter;

/// Registers the recommended-links page and its protected mutation routes.
pub(crate) fn router() -> AppRouter {
    AppRouter::new()
        .route("/links", get(view::links).post(action::create_link))
        .route("/links/feed", get(view::feed))
        .route("/links/{id}", delete(action::delete_link))
}
