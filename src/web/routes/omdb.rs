use std::sync::Arc;

use askama::Template;
use axum::{
    Router,
    extract::{Form, Path},
    http::{HeaderMap, StatusCode},
    response::{Html, Response},
    routing::{delete, get},
};
use axum_extra::extract::cookie::CookieJar;
use serde::Deserialize;

use crate::web::{
    AppError, AppState, SharedState,
    models::Film,
    mutation_response, render_html,
    session::{RequireAuth, is_signed_in},
};

/// Registers the film list and its protected mutation routes.
pub(crate) fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/omdb", get(omdb).post(create_film))
        .route("/omdb/{id}", delete(delete_film))
}

#[derive(Template)]
#[template(path = "omdb.html")]
struct OmdbTemplate {
    signed_in: bool,
    films: Vec<Film>,
}

#[derive(Template)]
#[template(path = "partials/film.html")]
struct FilmPartial<'a> {
    film: &'a Film,
    signed_in: bool,
}

#[derive(Deserialize)]
struct FilmForm {
    id: String,
    title: String,
    rating: i64,
}

/// Loads and renders the film list.
async fn omdb(state: SharedState, jar: CookieJar) -> Result<Html<String>, AppError> {
    let films = sqlx::query_as!(
        Film,
        "SELECT id AS `id!`, title, rating FROM films ORDER BY rowid"
    )
    .fetch_all(&state.pool)
    .await?;

    render_html(OmdbTemplate {
        signed_in: is_signed_in(&state, &jar).await?,
        films,
    })
}

/// Validates and creates or updates a film for an authenticated visitor.
async fn create_film(
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

    sqlx::query!(
        "INSERT INTO films (id, title, rating) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET title = excluded.title, rating = excluded.rating",
        film_id,
        title,
        form.rating,
    )
    .execute(&state.pool)
    .await?;

    let film = Film {
        id: film_id.into(),
        title: title.into(),
        rating: form.rating,
    };
    mutation_response(
        &headers,
        FilmPartial {
            film: &film,
            signed_in: true,
        },
        "/omdb",
    )
}

/// Deletes a film by its IMDb identifier for an authenticated visitor.
async fn delete_film(
    state: SharedState,
    _auth: RequireAuth,
    Path(id): Path<String>,
) -> Result<StatusCode, AppError> {
    sqlx::query!("DELETE FROM films WHERE id = ?", id)
        .execute(&state.pool)
        .await?;
    Ok(StatusCode::OK)
}
