use std::sync::Arc;

use axum::{
    extract::{FromRef, FromRequestParts},
    http::{HeaderMap, request::Parts},
};

use super::AppState;
use super::error::AppError;
use crate::config::AuthMode;

/// Set by the reverse proxy for requests that arrive over the tailnet.
pub(crate) const TAILNET_USER_HEADER: &str = "x-tailnet-user";

/// The visitor's sign-in state.
///
/// Decided per request by the configured [`AuthMode`]. There are no sessions or cookies.
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
        let state = Arc::<AppState>::from_ref(state);
        let signed_in = match state.auth {
            AuthMode::None => false,
            AuthMode::Tailnet => is_on_tailnet(&parts.headers),
            AuthMode::Always => true,
        };
        Ok(Self { signed_in })
    }
}

/// Marks a handler as requiring a signed-in visitor.
pub(crate) struct RequireAuth;

impl<S> FromRequestParts<S> for RequireAuth
where
    Arc<AppState>: FromRef<S>,
    S: Send + Sync,
{
    type Rejection = AppError;

    async fn from_request_parts(parts: &mut Parts, state: &S) -> Result<Self, Self::Rejection> {
        if Session::from_request_parts(parts, state).await?.signed_in {
            Ok(Self)
        } else {
            Err(AppError::Unauthorized)
        }
    }
}

/// Check if the reverse proxy marked the request as coming from the tailnet.
///
/// Only trustworthy when the proxy strips the header from incoming requests, since any
/// client can send it when the app is reachable without the proxy in front.
fn is_on_tailnet(headers: &HeaderMap) -> bool {
    headers
        .get(TAILNET_USER_HEADER)
        .is_some_and(|value| !value.is_empty())
}
