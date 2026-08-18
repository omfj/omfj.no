use std::sync::Arc;

use axum::{
    extract::{FromRef, FromRequestParts},
    http::request::Parts,
};
use axum_extra::extract::cookie::{Cookie, CookieJar};

use super::{AppError, AppState};

/// Marks a handler as requiring a valid, unexpired session.
pub(crate) struct RequireAuth;

impl<S> FromRequestParts<S> for RequireAuth
where
    Arc<AppState>: FromRef<S>,
    S: Send + Sync,
{
    type Rejection = AppError;

    /// Extracts and validates the session cookie before the handler is called.
    async fn from_request_parts(parts: &mut Parts, state: &S) -> Result<Self, Self::Rejection> {
        let jar = CookieJar::from_request_parts(parts, state)
            .await
            .expect("failed to extract CookieJar from request");
        let state = Arc::<AppState>::from_ref(state);
        if is_signed_in(&state, &jar).await? {
            Ok(Self)
        } else {
            Err(AppError::Unauthorized)
        }
    }
}

/// Check if the user is signed in by verifying the session token in the cookie jar against the database.
pub(crate) async fn is_signed_in(state: &AppState, jar: &CookieJar) -> Result<bool, AppError> {
    let Some(token) = jar.get("session").map(Cookie::value) else {
        return Ok(false);
    };
    Ok(state.auth.is_session_valid(token).await?)
}
