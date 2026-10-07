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
pub(crate) struct WishForm {
    title: String,
    url: Option<String>,
    notes: Option<String>,
}

/// Validates and adds a wish for an authenticated visitor.
pub(crate) async fn create_wish(
    state: SharedState,
    _auth: RequireAuth,
    headers: HeaderMap,
    Form(form): Form<WishForm>,
) -> Result<Response, AppError> {
    if form.title.trim().is_empty() {
        return Err(AppError::BadRequest("Enter a title."));
    }
    let clean_url = form.url.filter(|value| !value.trim().is_empty());
    if let Some(url) = &clean_url {
        let parsed = Url::parse(url).map_err(|_| AppError::BadRequest("Enter a valid URL."))?;
        if !matches!(parsed.scheme(), "http" | "https") {
            return Err(AppError::BadRequest("Only http(s) URLs are accepted."));
        }
    }
    let clean_notes = form.notes.filter(|value| !value.trim().is_empty());
    let title = form.title.trim();
    let wish = state
        .wishes
        .create(title, clean_url.as_deref(), clean_notes.as_deref())
        .await?;
    Ok(mutation_response(
        &headers,
        view::wish_item(&wish, true),
        "/onskeliste",
    ))
}

/// Deletes a wish by its database identifier for an authenticated visitor.
pub(crate) async fn delete_wish(
    state: SharedState,
    _auth: RequireAuth,
    Path(id): Path<i64>,
) -> Result<StatusCode, AppError> {
    state.wishes.delete(id).await?;
    Ok(StatusCode::OK)
}
