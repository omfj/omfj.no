mod action;
mod view;

use axum::routing::{get, post};
use axum_extra::extract::cookie::{Cookie, SameSite};
use time::Duration;

use crate::http::AppRouter;

/// Registers provider-neutral OAuth and sign-out routes.
pub(crate) fn router() -> AppRouter {
    AppRouter::new()
        .route("/auth/{provider}", get(view::oauth_login))
        .route("/auth/{provider}/callback", get(view::oauth_callback))
        .route("/auth/sign-out", post(action::sign_out))
}

/// Holds the session token of a signed-in visitor.
pub(crate) const SESSION_COOKIE: &str = "session";

/// Holds the OAuth state token while sign-in is in progress at the provider.
const OAUTH_STATE_COOKIE: &str = "oauth_state";

/// Builds an HTTP-only auth cookie that expires together with its server-side record.
fn cookie(name: &'static str, value: String, ttl: Duration, secure: bool) -> Cookie<'static> {
    Cookie::build((name, value))
        .path("/")
        .http_only(true)
        .same_site(SameSite::Lax)
        .secure(secure)
        .max_age(ttl)
        .build()
}
