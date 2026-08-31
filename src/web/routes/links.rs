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
use url::Url;

use crate::repository::RecommendedLink;
use crate::web::{
    AppError, AppState, SharedState, mutation_response, render_html,
    session::{RequireAuth, is_signed_in},
};

/// Registers the recommended-links page and its protected mutation routes.
pub(crate) fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/links", get(links).post(create_link))
        .route("/links/{id}", delete(delete_link))
}

#[derive(Template)]
#[template(path = "links.html")]
struct LinksTemplate {
    signed_in: bool,
    links: Vec<RecommendedLink>,
}

#[derive(Template)]
#[template(path = "partials/link.html")]
struct LinkPartial<'a> {
    link: &'a RecommendedLink,
    signed_in: bool,
}

#[derive(Deserialize)]
struct LinkForm {
    title: String,
    url: String,
}

/// Loads and renders the ordered collection of recommended links.
async fn links(state: SharedState, jar: CookieJar) -> Result<Html<String>, AppError> {
    let links = state.links.list().await?;

    render_html(LinksTemplate {
        signed_in: is_signed_in(&state, &jar).await?,
        links,
    })
}

/// Validates and adds a recommended link for an authenticated visitor.
async fn create_link(
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
    mutation_response(
        &headers,
        LinkPartial {
            link: &link,
            signed_in: true,
        },
        "/links",
    )
}

/// Deletes a recommended link by its database identifier for an authenticated visitor.
async fn delete_link(
    state: SharedState,
    _auth: RequireAuth,
    Path(id): Path<i64>,
) -> Result<StatusCode, AppError> {
    state.links.delete(id).await?;
    Ok(StatusCode::OK)
}
