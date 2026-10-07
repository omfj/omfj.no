mod action;
mod view;

use axum::routing::{delete, get};

use crate::http::AppRouter;

/// Registers the film list and its protected mutation routes.
pub(crate) fn router() -> AppRouter {
    AppRouter::new()
        .route("/omdb", get(view::films).post(action::create_film))
        .route("/omdb/{id}", delete(action::delete_film))
}
