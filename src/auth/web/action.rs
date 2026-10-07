use axum::response::Redirect;
use axum_extra::extract::CookieJar;
use axum_extra::extract::cookie::Cookie;

use super::SESSION_COOKIE;
use crate::http::error::AppError;
use crate::http::state::SharedState;

/// Deletes the current server session and clears its browser cookie.
pub(crate) async fn sign_out(
    state: SharedState,
    jar: CookieJar,
) -> Result<(CookieJar, Redirect), AppError> {
    if let Some(cookie) = jar.get(SESSION_COOKIE) {
        state.auth.sign_out(cookie.value()).await?;
    }
    Ok((jar.remove(Cookie::from(SESSION_COOKIE)), Redirect::to("/")))
}
