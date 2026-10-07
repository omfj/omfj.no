use axum::Form;
use axum::extract::Path;
use axum::http::{HeaderMap, StatusCode};
use axum::response::Response;
use serde::Deserialize;

use crate::apps::links::domain::LinkId;
use crate::domain::WebUrl;
use crate::http::error::AppError;
use crate::http::htmx::mutation_response;
use crate::http::session::RequireAuth;
use crate::http::state::SharedState;
use crate::validation::Valitools;

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
    let title = form.title.required("Enter a title.")?;
    let url = WebUrl::parse(&form.url)?;

    let link = state.links.create(title, &url).await?;
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
    Path(id): Path<LinkId>,
) -> Result<StatusCode, AppError> {
    state.links.delete(id).await?;
    Ok(StatusCode::OK)
}
