use askama::Template;
use axum::{
    http::StatusCode,
    response::{Html, IntoResponse, Response},
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
    Database(#[from] sqlx::Error),
    #[error(transparent)]
    Template(#[from] askama::Error),
    #[error(transparent)]
    Http(#[from] reqwest::Error),
    #[error(transparent)]
    OAuth(#[from] crate::auth::OAuthError),
}

#[derive(Template)]
#[template(path = "error.html")]
struct ErrorTemplate<'a> {
    signed_in: bool,
    status: u16,
    title: &'a str,
    message: &'a str,
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
            Self::Database(_) | Self::Template(_) | Self::Http(_) | Self::OAuth(_) => {
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

impl IntoResponse for AppError {
    /// Renders the shared error page while keeping internal failure details out of the response.
    fn into_response(self) -> Response {
        let (status, title, message) = self.content();
        let template = ErrorTemplate {
            signed_in: false,
            status: status.as_u16(),
            title,
            message: &message,
        };

        match template.render() {
            Ok(body) => (status, Html(body)).into_response(),
            Err(error) => {
                tracing::error!(?error, "failed to render error page");
                (status, title).into_response()
            }
        }
    }
}
