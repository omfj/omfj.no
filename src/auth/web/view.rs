use axum::extract::{Path, Query};
use axum::response::Redirect;
use axum_extra::extract::CookieJar;
use axum_extra::extract::cookie::Cookie;
use serde::Deserialize;

use super::{OAUTH_STATE_COOKIE, SESSION_COOKIE, cookie};
use crate::auth::{OAUTH_STATE_TTL, SESSION_TTL};
use crate::http::error::AppError;
use crate::http::state::SharedState;

/// Starts OAuth with a short-lived state token and matching cookie.
pub(crate) async fn oauth_login(
    state: SharedState,
    jar: CookieJar,
    Path(provider_id): Path<String>,
) -> Result<(CookieJar, Redirect), AppError> {
    let login = state.auth.begin_login(&provider_id).await?;
    let cookie = cookie(
        OAUTH_STATE_COOKIE,
        login.state,
        OAUTH_STATE_TTL,
        state.secure_cookies,
    );
    Ok((
        jar.add(cookie),
        Redirect::temporary(login.authorization_url.as_str()),
    ))
}

#[derive(Deserialize)]
pub(crate) struct OAuthCallback {
    code: String,
    state: String,
}

/// Completes OAuth, verifies the allowed account, and creates a session.
pub(crate) async fn oauth_callback(
    state: SharedState,
    jar: CookieJar,
    Path(provider_id): Path<String>,
    Query(query): Query<OAuthCallback>,
) -> Result<(CookieJar, Redirect), AppError> {
    let expected_state = jar.get(OAUTH_STATE_COOKIE).map(Cookie::value);
    let session = state
        .auth
        .complete_login(&provider_id, &query.code, &query.state, expected_state)
        .await?;
    let cookie = cookie(SESSION_COOKIE, session, SESSION_TTL, state.secure_cookies);
    Ok((
        jar.remove(Cookie::from(OAUTH_STATE_COOKIE)).add(cookie),
        Redirect::to("/"),
    ))
}
