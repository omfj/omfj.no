use axum::Form;
use axum::extract::Path;
use axum::http::{HeaderMap, StatusCode};
use axum::response::Response;
use serde::Deserialize;

use crate::domain::WebUrl;
use crate::http::error::AppError;
use crate::http::htmx::mutation_response;
use crate::http::session::RequireAuth;
use crate::http::state::SharedState;
use crate::validation::Valitools;

use super::view;
use crate::apps::wishlist::domain::WishId;

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
    let title = form.title.required("Enter a title.")?;
    let url = form.url.non_blank().map(WebUrl::parse).transpose()?;
    let notes = form.notes.non_blank();
    let wish = state.wishes.create(title, url.as_ref(), notes).await?;
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
    Path(id): Path<WishId>,
) -> Result<StatusCode, AppError> {
    state.wishes.delete(id).await?;
    Ok(StatusCode::OK)
}
