use axum::Form;
use axum::extract::Path;
use axum::http::{HeaderMap, StatusCode};
use axum::response::Response;
use serde::Deserialize;
use url::Url;

use crate::http::session::RequireAuth;
use crate::http::state::SharedState;
use crate::http::{AppError, mutation_response};

use super::view;

#[derive(Deserialize)]
pub(crate) struct LinkForm {
    title: String,
    url: String,
}

/// Validates and adds a recommended link for an authenticated visitor.
pub(crate) async fn create_link(
    state: SharedState,
    _auth: RequireAuth,
    headers: HeaderMap,
    Form(form): Form<LinkForm>,
) -> Result<Response, AppError> {
    let parsed =
        Url::parse(form.url.trim()).map_err(|_| AppError::BadRequest("Enter a valid URL."))?;
    if !matches!(parsed.scheme(), "http" | "https") || form.title.trim().is_empty() {
        return Err(AppError::BadRequest("Enter a title and an http(s) URL."));
    }
    if parsed.host_str().is_none() {
        return Err(AppError::BadRequest("The URL needs a host."));
    }
    let title = form.title.trim();
    let url = parsed.as_str();

    let link = state.links.create(title, url).await?;
    Ok(mutation_response(
        &headers,
        view::link_item(&link, true),
        "/links",
    ))
}

/// Deletes a recommended link by its database identifier for an authenticated visitor.
pub(crate) async fn delete_link(
    state: SharedState,
    _auth: RequireAuth,
    Path(id): Path<i64>,
) -> Result<StatusCode, AppError> {
    state.links.delete(id).await?;
    Ok(StatusCode::OK)
}
