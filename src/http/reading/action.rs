use axum::Form;
use axum::extract::Path;
use axum::http::{HeaderMap, StatusCode};
use axum::response::Response;
use serde::Deserialize;
use url::Url;

use crate::http::session::RequireAuth;
use crate::http::state::SharedState;
use crate::http::{AppError, mutation_response};
use crate::title;

use super::view;

#[derive(Deserialize)]
pub(crate) struct ItemForm {
    url: String,
}

/// Validates a URL, fetches its title, and adds it to the reading list.
pub(crate) async fn create_item(
    state: SharedState,
    _auth: RequireAuth,
    headers: HeaderMap,
    Form(form): Form<ItemForm>,
) -> Result<Response, AppError> {
    let parsed =
        Url::parse(form.url.trim()).map_err(|_| AppError::BadRequest("Enter a valid URL."))?;
    if !matches!(parsed.scheme(), "http" | "https") || parsed.host_str().is_none() {
        return Err(AppError::BadRequest("Enter an http(s) URL."));
    }
    let url = parsed.as_str();
    let http = reqwest::Client::builder()
        .user_agent(concat!("omfj-no-rs/", env!("CARGO_PKG_VERSION")))
        .build()?;

    let title = title::fetch_from_url(&http, url)
        .await
        .unwrap_or_else(|| url.to_owned());

    let item = state.reading.create(&title, url).await?;
    Ok(mutation_response(
        &headers,
        view::item_row(&item),
        "/reading",
    ))
}

/// Toggles an item between read and unread for an authenticated visitor.
pub(crate) async fn toggle_read(
    state: SharedState,
    _auth: RequireAuth,
    headers: HeaderMap,
    Path(id): Path<i64>,
) -> Result<Response, AppError> {
    let item = state
        .reading
        .toggle_read(id)
        .await?
        .ok_or(AppError::NotFound)?;
    Ok(mutation_response(
        &headers,
        view::item_row(&item),
        "/reading",
    ))
}

/// Deletes an item by its database identifier for an authenticated visitor.
pub(crate) async fn delete_item(
    state: SharedState,
    _auth: RequireAuth,
    Path(id): Path<i64>,
) -> Result<StatusCode, AppError> {
    state.reading.delete(id).await?;
    Ok(StatusCode::OK)
}
