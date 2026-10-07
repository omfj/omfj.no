use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
};
use maud::{Markup, html};

use crate::{
    auth::{self, LoginError},
    db::StorageError,
    http::Layout,
    validation::ValidationError,
};

#[derive(Debug, thiserror::Error)]
pub(crate) enum AppError {
    #[error("not found")]
    NotFound,
    #[error("method not allowed")]
    MethodNotAllowed,
    #[error("authentication required")]
    Unauthorized,
    #[error("you are not allowed to edit this site")]
    Forbidden,
    #[error("the requested OAuth provider is not configured")]
    OAuthProviderNotConfigured,
    #[error("{0}")]
    BadRequest(&'static str),
    #[error(transparent)]
    Storage(#[from] StorageError),
    #[error(transparent)]
    OAuth(#[from] auth::OAuthError),
}

/// Produces the application's standard response for an unknown route.
pub(crate) async fn not_found() -> AppError {
    AppError::NotFound
}

/// Produces the application's standard response for an unsupported HTTP method.
pub(crate) async fn method_not_allowed() -> AppError {
    AppError::MethodNotAllowed
}

/// Renders the shared error page. Errors are rendered without a session lookup,
/// so the header always shows the signed-out state.
fn error_page(status: StatusCode, title: &str, message: &str) -> Markup {
    let status = status.as_u16();
    Layout::new()
        .title(&format!("{status} — {title}"))
        .render(html! {
            main class="flex min-h-[55vh] items-center" {
                section class="w-full pl-5" aria-labelledby="error-title" {
                    p class="text-foreground-muted text-sm" { "status " (status) }
                    h1 #error-title class="mt-2 text-xl" { (title) }
                    p class="mt-3 max-w-md text-foreground-muted" { (message) }
                    div class="mt-6 flex flex-wrap gap-4" {
                        a href="/" class="link" { "<- Home" }
                    }
                }
            }
        })
}

impl AppError {
    /// Maps an application error to a safe status, title, and user-facing message.
    fn content(&self) -> (StatusCode, &'static str, String) {
        match self {
            Self::NotFound => (
                StatusCode::NOT_FOUND,
                "Page not found",
                "That page does not exist, or it may have moved.".into(),
            ),
            Self::MethodNotAllowed => (
                StatusCode::METHOD_NOT_ALLOWED,
                "Method not allowed",
                "This page does not support that kind of request.".into(),
            ),
            Self::Unauthorized => (
                StatusCode::UNAUTHORIZED,
                "Sign in required",
                "You need to sign in before you can make that change.".into(),
            ),
            Self::Forbidden => (
                StatusCode::FORBIDDEN,
                "Access denied",
                "Your account does not have permission to make that change.".into(),
            ),
            Self::OAuthProviderNotConfigured => (
                StatusCode::SERVICE_UNAVAILABLE,
                "Sign-in unavailable",
                "That sign-in provider has not been configured for this deployment.".into(),
            ),
            Self::BadRequest(message) => (
                StatusCode::BAD_REQUEST,
                "That request did not work",
                (*message).into(),
            ),
            Self::Storage(_) | Self::OAuth(_) => {
                tracing::error!(error = ?self, "request failed");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "Something went wrong",
                    "The server hit an unexpected problem. Please try again in a moment.".into(),
                )
            }
        }
    }
}

impl From<LoginError> for AppError {
    fn from(error: LoginError) -> Self {
        match error {
            LoginError::ProviderNotConfigured => Self::OAuthProviderNotConfigured,
            LoginError::InvalidState => Self::Unauthorized,
            LoginError::NotAllowed => Self::Forbidden,
            LoginError::OAuth(error) => Self::OAuth(error),
            LoginError::Storage(error) => Self::Storage(error),
        }
    }
}

impl From<ValidationError> for AppError {
    fn from(ValidationError(message): ValidationError) -> Self {
        Self::BadRequest(message)
    }
}

impl IntoResponse for AppError {
    /// Renders the shared error page while keeping internal failure details out of the response.
    fn into_response(self) -> Response {
        let (status, title, message) = self.content();
        (status, error_page(status, title, &message)).into_response()
    }
}
