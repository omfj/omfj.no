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

use crate::repository::Wish;
use crate::web::{
    AppError, AppState, SharedState, mutation_response, render_html,
    session::{RequireAuth, is_signed_in},
};

/// Registers the wishlist page and its protected mutation routes.
pub(crate) fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/onskeliste", get(wishlist).post(create_wish))
        .route("/onskeliste/{id}", delete(delete_wish))
}

#[derive(Template)]
#[template(path = "wishlist.html")]
struct WishlistTemplate {
    signed_in: bool,
    wishes: Vec<Wish>,
}

#[derive(Template)]
#[template(path = "partials/wish.html")]
struct WishPartial<'a> {
    wish: &'a Wish,
    signed_in: bool,
}

#[derive(Deserialize)]
struct WishForm {
    title: String,
    url: Option<String>,
    notes: Option<String>,
}

/// Loads and renders the wishlist.
async fn wishlist(state: SharedState, jar: CookieJar) -> Result<Html<String>, AppError> {
    let wishes = state.wishes.list().await?;
    render_html(WishlistTemplate {
        signed_in: is_signed_in(&state, &jar).await?,
        wishes,
    })
}

/// Validates and adds a wish for an authenticated visitor.
async fn create_wish(
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
    mutation_response(
        &headers,
        WishPartial {
            wish: &wish,
            signed_in: true,
        },
        "/onskeliste",
    )
}

/// Deletes a wish by its database identifier for an authenticated visitor.
async fn delete_wish(
    state: SharedState,
    _auth: RequireAuth,
    Path(id): Path<i64>,
) -> Result<StatusCode, AppError> {
    state.wishes.delete(id).await?;
    Ok(StatusCode::OK)
}
