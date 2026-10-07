use axum::Form;
use axum::extract::Path;
use axum::http::{HeaderMap, StatusCode};
use axum::response::Response;
use serde::Deserialize;

use crate::apps::films::domain::{ImdbId, Rating};
use crate::http::error::AppError;
use crate::http::htmx::mutation_response;
use crate::http::session::RequireAuth;
use crate::http::state::SharedState;
use crate::validation::Valitools;

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
    let id = ImdbId::parse(&form.id)?;
    let title = form.title.required("Enter a title.")?;
    let rating = Rating::new(form.rating)?;

    let film = state.films.save(&id, title, rating).await?;
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
    state.films.delete(&ImdbId::parse(&id)?).await?;
    Ok(StatusCode::OK)
}
