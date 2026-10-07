use axum::extract::{Path, Query};
use axum::response::Redirect;
use axum_extra::extract::CookieJar;
use axum_extra::extract::cookie::{Cookie, SameSite};
use serde::Deserialize;

use crate::http::AppError;
use crate::http::state::SharedState;

/// Starts OAuth with a short-lived state token and matching cookie.
pub(crate) async fn oauth_login(
    state: SharedState,
    jar: CookieJar,
    Path(provider_id): Path<String>,
) -> Result<(CookieJar, Redirect), AppError> {
    let provider = state
        .auth
        .provider(&provider_id)
        .ok_or(AppError::OAuthProviderNotConfigured)?;
    let oauth_state = state.auth.create_oauth_state(&provider_id).await?;

    let authorize = provider.authorization_url(&oauth_state);

    let cookie = Cookie::build(("oauth_state", oauth_state))
        .path("/")
        .http_only(true)
        .same_site(SameSite::Lax)
        .secure(state.auth.secure_cookies)
        .max_age(time::Duration::minutes(10))
        .build();
    Ok((jar.add(cookie), Redirect::temporary(authorize.as_str())))
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
    let provider = state
        .auth
        .provider(&provider_id)
        .ok_or(AppError::OAuthProviderNotConfigured)?;
    let cookie_state = jar.get("oauth_state").map(Cookie::value);
    if cookie_state != Some(query.state.as_str()) {
        return Err(AppError::Unauthorized);
    }
    let valid = state
        .auth
        .consume_oauth_state(&query.state, &provider_id)
        .await?;
    if !valid {
        return Err(AppError::Unauthorized);
    }

    let identity = provider.exchange_code(&query.code).await?;
    if !provider.is_allowed(&identity) {
        return Err(AppError::Forbidden);
    }

    let session = state.auth.create_session(&provider_id, &identity).await?;
    let cookie = Cookie::build(("session", session))
        .path("/")
        .http_only(true)
        .same_site(SameSite::Lax)
        .secure(state.auth.secure_cookies)
        .max_age(time::Duration::days(30))
        .build();
    Ok((
        jar.remove(Cookie::from("oauth_state")).add(cookie),
        Redirect::to("/"),
    ))
}
