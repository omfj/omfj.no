use std::sync::Arc;

use crate::web::{AppError, AppState, SharedState};
use axum::{
    Router,
    extract::{Path, Query},
    response::Redirect,
    routing::{get, post},
};
use axum_extra::extract::cookie::{Cookie, CookieJar, SameSite};
use serde::Deserialize;

/// Registers provider-neutral OAuth and sign-out routes.
pub(crate) fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/auth/{provider}", get(oauth_login))
        .route("/auth/{provider}/callback", get(oauth_callback))
        .route("/auth/sign-out", post(sign_out))
}

/// Starts OAuth with a short-lived state token and matching cookie.
async fn oauth_login(
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
struct OAuthCallback {
    code: String,
    state: String,
}

/// Completes OAuth, verifies the allowed account, and creates a session.
async fn oauth_callback(
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

/// Deletes the current server session and clears its browser cookie.
async fn sign_out(state: SharedState, jar: CookieJar) -> Result<(CookieJar, Redirect), AppError> {
    if let Some(cookie) = jar.get("session") {
        state.auth.delete_session(cookie.value()).await?;
    }
    Ok((jar.remove(Cookie::from("session")), Redirect::to("/")))
}
