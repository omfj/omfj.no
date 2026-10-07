mod action;
mod view;

use axum::routing::{get, post};

use super::AppRouter;

/// Registers provider-neutral OAuth and sign-out routes.
pub(crate) fn router() -> AppRouter {
    AppRouter::new()
        .route("/auth/{provider}", get(view::oauth_login))
        .route("/auth/{provider}/callback", get(view::oauth_callback))
        .route("/auth/sign-out", post(action::sign_out))
}
