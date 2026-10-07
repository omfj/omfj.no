use std::sync::Arc;

use axum::{
    Router,
    extract::{Form, Path},
    http::{HeaderMap, StatusCode},
    response::Response,
    routing::{delete, get, post},
};
use maud::{Markup, html};
use serde::Deserialize;
use url::Url;

use crate::repository::ReadingItem;
use crate::title;
use crate::web::{
    AppError, AppState, Layout, SharedState, mutation_response, session::RequireAuth,
};

/// Registers the reading list page and its protected mutation routes.
pub(crate) fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/reading", get(reading).post(create_item))
        .route("/reading/{id}", delete(delete_item))
        .route("/reading/{id}/read", post(toggle_read))
}

#[derive(Deserialize)]
struct ItemForm {
    url: String,
}

/// Loads and renders the reading list.
async fn reading(state: SharedState, _auth: RequireAuth) -> Result<Markup, AppError> {
    let items = state.reading.list().await?;
    let unread = items.iter().filter(|item| item.read_at.is_none()).count();

    Ok(Layout::new("Reading list", true).render(html! {
        main {
            h1 class="heading-1" { "Reading list" }
            p class="text-foreground-muted mt-2 text-sm" {
                (unread) " unread, " (items.len() - unread) " read"
            }
            br;
            form class="mb-6 flex items-baseline gap-2"
                hx-post="/reading"
                hx-target="#reading-list"
                hx-swap="afterbegin"
                "hx-on:htmx:after:request"="this.reset()"
                method="post"
            {
                span class="shrink-0" { "URL:" }
                input class=(INPUT_CLASS) name="url" type="url" required;
                button class="text-foreground-muted shrink-0 hover:underline" type="submit" {
                    span class="idle-label" { "Add" }
                    span class="loading-label" { "Fetching..." }
                }
            }
            ul #reading-list class="space-y-3" {
                @for item in &items {
                    (item_row(item))
                }
            }
        }
    }))
}

const INPUT_CLASS: &str =
    "border-divide-soft w-full border-b bg-transparent outline-none focus:border-link";

fn item_row(item: &ReadingItem) -> Markup {
    let read = item.read_at.is_some();
    let checkbox = if read { "[x]" } else { "[ ]" };
    html! {
        li class="flex items-start gap-2" {
            button class="text-foreground-muted shrink-0 hover:underline"
                hx-post={ "/reading/" (item.id) "/read" }
                hx-target="closest li"
                hx-swap="outerHTML"
            { (checkbox) }
            div class={ "min-w-0 flex-1" @if read { " text-foreground-muted" } } {
                a href=(item.url)
                    target="_blank"
                    rel="noopener noreferrer external"
                    class={ "link block truncate" @if read { " link-muted line-through" } }
                    title=(item.title)
                { (item.title) }
                div class="text-foreground-muted text-xs" {
                    (item.hostname())
                    " · added " (item.created_at.format("%Y-%m-%d"))
                    @if let Some(read_at) = item.read_at {
                        " · read " (read_at.format("%Y-%m-%d"))
                    }
                }
            }
            button class="text-foreground-muted shrink-0 hover:text-red-400"
                aria-label={ "Delete " (item.title) }
                hx-delete={ "/reading/" (item.id) }
                hx-confirm="Delete this item?"
                hx-target="closest li"
                hx-swap="outerHTML"
            { "del" }
        }
    }
}

async fn create_item(
    state: SharedState,
    _auth: RequireAuth,
    headers: HeaderMap,
    Form(form): Form<ItemForm>,
) -> Result<Response, AppError> {
    let parsed =
        Url::parse(form.url.trim()).map_err(|_| AppError::BadRequest("Enter a valid URL."))?;
    if !matches!(parsed.scheme(), "http" | "https") || parsed.host_str().is_none() {
        return Err(AppError::BadRequest("Enter an http(s) URL."));
    }
    let url = parsed.as_str();
    let http = reqwest::Client::builder()
        .user_agent(concat!("omfj-no-rs/", env!("CARGO_PKG_VERSION")))
        .build()?;

    let title = title::fetch_from_url(&http, url)
        .await
        .unwrap_or_else(|| url.to_owned());

    let item = state.reading.create(&title, url).await?;
    Ok(mutation_response(&headers, item_row(&item), "/reading"))
}

/// Toggles an item between read and unread for an authenticated visitor.
async fn toggle_read(
    state: SharedState,
    _auth: RequireAuth,
    headers: HeaderMap,
    Path(id): Path<i64>,
) -> Result<Response, AppError> {
    let item = state
        .reading
        .toggle_read(id)
        .await?
        .ok_or(AppError::NotFound)?;
    Ok(mutation_response(&headers, item_row(&item), "/reading"))
}

/// Deletes an item by its database identifier for an authenticated visitor.
async fn delete_item(
    state: SharedState,
    _auth: RequireAuth,
    Path(id): Path<i64>,
) -> Result<StatusCode, AppError> {
    state.reading.delete(id).await?;
    Ok(StatusCode::OK)
}
