mod action;
mod view;

use axum::routing::{delete, get};

use crate::http::AppRouter;

/// Registers the wishlist page and its protected mutation routes.
pub(crate) fn router() -> AppRouter {
    AppRouter::new()
        .route("/onskeliste", get(view::wishlist).post(action::create_wish))
        .route("/onskeliste/{id}", delete(action::delete_wish))
}
