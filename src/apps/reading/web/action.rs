use axum::Form;
use axum::extract::Path;
use axum::http::{HeaderMap, StatusCode};
use axum::response::Response;
use serde::Deserialize;

use crate::apps::reading::domain::ReadingItemId;
use crate::domain::WebUrl;
use crate::http::error::AppError;
use crate::http::htmx::mutation_response;
use crate::http::session::RequireAuth;
use crate::http::state::SharedState;

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
    let url = WebUrl::parse(&form.url)?;
    let title = state
        .titles
        .fetch(&url)
        .await
        .unwrap_or_else(|| url.to_string());

    let item = state.reading.create(&title, &url).await?;
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
    Path(id): Path<ReadingItemId>,
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
    Path(id): Path<ReadingItemId>,
) -> Result<StatusCode, AppError> {
    state.reading.delete(id).await?;
    Ok(StatusCode::OK)
}
