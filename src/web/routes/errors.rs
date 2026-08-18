use crate::web::AppError;

/// Produces the application's standard response for an unknown route.
pub(crate) async fn not_found() -> AppError {
    AppError::NotFound
}

/// Produces the application's standard response for an unsupported HTTP method.
pub(crate) async fn method_not_allowed() -> AppError {
    AppError::MethodNotAllowed
}
