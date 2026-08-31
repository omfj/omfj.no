mod error;
mod routes;
mod session;
mod thoughts;

use std::sync::Arc;

use askama::Template;
use axum::{
    Router,
    extract::State,
    http::HeaderMap,
    response::{Html, IntoResponse, Redirect, Response},
};
use tower_http::{services::ServeDir, trace::TraceLayer};

use crate::{
    auth::AuthService,
    repository::{FilmRepository, LinkRepository, WishRepository},
};

pub(crate) use error::AppError;

#[derive(Clone)]
pub struct AppState {
    pub auth: AuthService,
    pub films: FilmRepository,
    pub links: LinkRepository,
    pub wishes: WishRepository,
}

pub(crate) type SharedState = State<Arc<AppState>>;

/// Builds the application router and attaches its shared state and middleware.
pub fn router(state: AppState) -> Router {
    Router::new()
        .merge(routes::home::router())
        .merge(routes::habits::router())
        .merge(routes::films::router())
        .merge(routes::links::router())
        .merge(routes::wishlist::router())
        .merge(routes::thoughts::router())
        .merge(routes::auth::router())
        .nest_service("/static", ServeDir::new("static"))
        .fallback(routes::errors::not_found)
        .method_not_allowed_fallback(routes::errors::method_not_allowed)
        .layer(TraceLayer::new_for_http())
        .with_state(Arc::new(state))
}

// Check if the request is an HTMX request by looking for the "HX-Request" header.
pub(crate) fn is_htmx(headers: &HeaderMap) -> bool {
    headers
        .get("HX-Request")
        .is_some_and(|value| value == "true")
}

/// Returns an HTML fragment to HTMX clients and a redirect to regular form clients.
pub(crate) fn mutation_response<T: Template>(
    headers: &HeaderMap,
    template: T,
    fallback: &'static str,
) -> Result<Response, AppError> {
    if is_htmx(headers) {
        Ok(Html(template.render()?).into_response())
    } else {
        Ok(Redirect::to(fallback).into_response())
    }
}

/// Renders a template and returns an `Html<String>` response. If the template
/// rendering fails, it returns an `AppError`.
pub(crate) fn render_html(template: impl Template) -> Result<Html<String>, AppError> {
    Ok(Html(template.render()?))
}
