use std::sync::Arc;

use axum::{
    extract::{FromRef, FromRequestParts},
    http::request::Parts,
};
use axum_extra::extract::cookie::{Cookie, CookieJar};

use super::AppState;
use super::error::AppError;

/// The visitor's sign-in state, resolved at most once per request.
///
/// The first extraction checks the session cookie against the database and stores the
/// result in the request extensions; later extractions in the same request reuse it.
#[derive(Clone, Copy)]
pub(crate) struct Session {
    pub(crate) signed_in: bool,
}

impl<S> FromRequestParts<S> for Session
where
    Arc<AppState>: FromRef<S>,
    S: Send + Sync,
{
    type Rejection = AppError;

    async fn from_request_parts(parts: &mut Parts, state: &S) -> Result<Self, Self::Rejection> {
        if let Some(session) = parts.extensions.get::<Self>() {
            return Ok(*session);
        }

        let jar = CookieJar::from_request_parts(parts, state)
            .await
            .expect("failed to extract CookieJar from request");
        let state = Arc::<AppState>::from_ref(state);
        let session = Self {
            signed_in: is_signed_in(&state, &jar).await?,
        };
        parts.extensions.insert(session);
        Ok(session)
    }
}

/// Marks a handler as requiring a valid, unexpired session.
pub(crate) struct RequireAuth;

impl<S> FromRequestParts<S> for RequireAuth
where
    Arc<AppState>: FromRef<S>,
    S: Send + Sync,
{
    type Rejection = AppError;

    /// Validates the session before the handler is called.
    async fn from_request_parts(parts: &mut Parts, state: &S) -> Result<Self, Self::Rejection> {
        if Session::from_request_parts(parts, state).await?.signed_in {
            Ok(Self)
        } else {
            Err(AppError::Unauthorized)
        }
    }
}

/// Check if the user is signed in by verifying the session token in the cookie jar against the database.
async fn is_signed_in(state: &AppState, jar: &CookieJar) -> Result<bool, AppError> {
    let Some(token) = jar.get("session").map(Cookie::value) else {
        return Ok(false);
    };
    Ok(state.auth.is_session_valid(token).await?)
}
