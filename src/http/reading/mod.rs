mod action;
mod view;

use axum::routing::{delete, get, post};

use super::AppRouter;

/// Registers the reading list page and its protected mutation routes.
pub(crate) fn router() -> AppRouter {
    AppRouter::new()
        .route("/reading", get(view::reading).post(action::create_item))
        .route("/reading/{id}", delete(action::delete_item))
        .route("/reading/{id}/read", post(action::toggle_read))
}
