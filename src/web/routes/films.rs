use std::sync::Arc;

use axum::{
    Router,
    extract::{Form, Path},
    http::{HeaderMap, StatusCode},
    response::Response,
    routing::{delete, get},
};
use axum_extra::extract::cookie::CookieJar;
use maud::{Markup, html};
use serde::Deserialize;

use crate::repository::Film;
use crate::web::{
    AppError, AppState, Layout, SharedState, mutation_response,
    session::{RequireAuth, is_signed_in},
};

/// Registers the film list and its protected mutation routes.
pub(crate) fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/omdb", get(omdb).post(create_film))
        .route("/omdb/{id}", delete(delete_film))
}

#[derive(Deserialize)]
struct FilmForm {
    id: String,
    title: String,
    rating: i64,
}

/// Loads and renders the film list.
async fn omdb(state: SharedState, jar: CookieJar) -> Result<Markup, AppError> {
    let films = state.films.list().await?;
    let signed_in = is_signed_in(&state, &jar).await?;

    Ok(Layout::new("OMDb", signed_in).render(html! {
        main {
            h1 class="heading-1" { "OMDb" }
            br;
            p class="max-w-lg" { "A list of movies and series I have watched and my ratings." }
            br;
            @if signed_in {
                details class="mb-4" {
                    summary class="text-foreground-muted cursor-pointer hover:underline" { "Add a film" }
                    form class="mt-2 flex w-full flex-col gap-2"
                        hx-post="/omdb"
                        hx-target="#film-list"
                        hx-swap="afterbegin"
                        "hx-on:htmx:after:request"="this.reset()"
                        method="post"
                    {
                        label class="flex items-baseline gap-2" {
                            span class="w-20 shrink-0" { "Title:" }
                            input class=(INPUT_CLASS) name="title" required;
                        }
                        label class="flex items-baseline gap-2" {
                            span class="w-20 shrink-0" { "IMDb ID:" }
                            input class=(INPUT_CLASS)
                                name="id"
                                placeholder="tt1234567"
                                required
                                pattern="tt[0-9]+";
                        }
                        label class="flex items-baseline gap-2" {
                            span class="w-20 shrink-0" { "Rating:" }
                            input class=(INPUT_CLASS)
                                name="rating"
                                type="number"
                                min="1"
                                max="100"
                                placeholder="1-100"
                                required;
                        }
                        button class="text-foreground-muted mr-auto hover:underline" type="submit" {
                            span class="idle-label" { "Add film" }
                            span class="loading-label" { "Saving..." }
                        }
                    }
                }
            }
            table class="w-full" {
                thead {
                    tr class="border-divide-soft text-foreground-muted border-b text-left" {
                        th class="py-1 pr-4 font-normal" { "Title" }
                        th class="w-24 py-1 font-normal" { "Rating" }
                        @if signed_in {
                            th { span class="sr-only" { "Actions" } }
                        }
                    }
                }
                tbody #film-list {
                    @for film in &films {
                        (film_row(film, signed_in))
                    }
                }
            }
        }
    }))
}

const INPUT_CLASS: &str =
    "border-divide-soft w-full border-b bg-transparent outline-none focus:border-link";

/// Renders one film row, shared by the page and the HTMX create response.
fn film_row(film: &Film, signed_in: bool) -> Markup {
    html! {
        tr class="align-top" {
            td class="py-1 pr-4" {
                a class="link" href={ "https://www.imdb.com/title/" (film.id) "/" } { (film.title) }
            }
            td class="py-1" { (film.rating) }
            @if signed_in {
                td class="py-1" {
                    button class="text-foreground-muted hover:text-red-400"
                        aria-label={ "Delete " (film.title) }
                        hx-delete={ "/omdb/" (film.id) }
                        hx-target="closest tr"
                        hx-swap="outerHTML"
                    { "[x]" }
                }
            }
        }
    }
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

    state.films.save(film_id, title, form.rating).await?;

    let film = Film {
        id: film_id.into(),
        title: title.into(),
        rating: form.rating,
    };
    Ok(mutation_response(&headers, film_row(&film, true), "/omdb"))
}

/// Deletes a film by its IMDb identifier for an authenticated visitor.
async fn delete_film(
    state: SharedState,
    _auth: RequireAuth,
    Path(id): Path<String>,
) -> Result<StatusCode, AppError> {
    state.films.delete(&id).await?;
    Ok(StatusCode::OK)
}
