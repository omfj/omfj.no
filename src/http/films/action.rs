use axum::Form;
use axum::extract::Path;
use axum::http::HeaderMap;
use axum::response::Response;
use reqwest::StatusCode;
use serde::Deserialize;

use crate::http::session::RequireAuth;
use crate::http::state::SharedState;
use crate::http::{AppError, mutation_response};

use super::view;

#[derive(Deserialize)]
pub(crate) struct FilmForm {
    id: String,
    title: String,
    rating: i64,
}

/// Validates and creates or updates a film for an authenticated visitor.
pub(crate) async fn create_film(
    state: SharedState,
    _auth: RequireAuth,
    headers: HeaderMap,
    Form(form): Form<FilmForm>,
) -> Result<Response, AppError> {
    if !form.id.starts_with("tt")
        || form.title.trim().is_empty()
        || !(1..=100).contains(&form.rating)
    {
        return Err(AppError::BadRequest(
            "Enter a title, an IMDb tt-id, and a rating from 1–100.",
        ));
    }
    let film_id = form.id.trim();
    let title = form.title.trim();

    let film = state.films.save(film_id, title, form.rating).await?;
    Ok(mutation_response(
        &headers,
        view::film_row(&film, true),
        "/omdb",
    ))
}

/// Deletes a film by its IMDb identifier for an authenticated visitor.
pub(crate) async fn delete_film(
    state: SharedState,
    _auth: RequireAuth,
    Path(id): Path<String>,
) -> Result<StatusCode, AppError> {
    state.films.delete(&id).await?;
    Ok(StatusCode::OK)
}
