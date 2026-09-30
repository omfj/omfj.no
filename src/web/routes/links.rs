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
use url::Url;

use crate::repository::RecommendedLink;
use crate::web::{
    AppError, AppState, Layout, SharedState,
    feed::{self, Channel, Item},
    mutation_response,
    session::{RequireAuth, is_signed_in},
};

/// Registers the recommended-links page and its protected mutation routes.
pub(crate) fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/links", get(links).post(create_link))
        .route("/links/feed", get(feed))
        .route("/links/{id}", delete(delete_link))
}

#[derive(Deserialize)]
struct LinkForm {
    title: String,
    url: String,
}

/// Loads and renders the ordered collection of recommended links.
async fn links(state: SharedState, jar: CookieJar) -> Result<Markup, AppError> {
    let links = state.links.list().await?;
    let signed_in = is_signed_in(&state, &jar).await?;

    Ok(Layout::new("Links", signed_in)
        .feed("omfj.no links", "/links/feed")
        .render(html! {
            main {
                h1 class="heading-1" { "Links" }
                br;
                p class="max-w-lg" {
                    "Articles and reads I recommend. Most of them are related to software development and "
                    "programming, and come from Hacker News."
                }
                br;
                @if signed_in {
                    details class="mb-4" {
                        summary class="text-foreground-muted cursor-pointer hover:underline" { "Add a link" }
                        form class="mt-2 flex max-w-md flex-col gap-2"
                            hx-post="/links"
                            hx-target="#link-list"
                            hx-swap="afterbegin"
                            "hx-on:htmx:after:request"="this.reset()"
                            method="post"
                        {
                            label class="flex items-baseline gap-2" {
                                span class="shrink-0" { "Title:" }
                                input class=(INPUT_CLASS) name="title" required;
                            }
                            label class="flex items-baseline gap-2" {
                                span class="shrink-0" { "URL:" }
                                input class=(INPUT_CLASS) name="url" type="url" required;
                            }
                            button class="text-foreground-muted mr-auto hover:underline" type="submit" {
                                span class="idle-label" { "Add link" }
                                span class="loading-label" { "Saving..." }
                            }
                        }
                    }
                }
                ul #link-list class="space-y-2" {
                    @for link in &links {
                        (link_item(link, signed_in))
                    }
                }
                p class="pt-4 text-center text-[10px]" {
                    a class="link link-muted" href="/links/feed" { "RSS" }
                }
            }
        }))
}

const INPUT_CLASS: &str =
    "border-divide-soft w-full border-b bg-transparent outline-none focus:border-link";

/// Renders one link row, shared by the page and the HTMX create response.
fn link_item(link: &RecommendedLink, signed_in: bool) -> Markup {
    html! {
        li class="flex items-center gap-2" {
            div class="min-w-0 flex-1 truncate" {
                "- "
                a href=(link.url)
                    target="_blank"
                    rel="noopener noreferrer external"
                    class="link"
                    title=(link.title)
                { (link.title) }
                " "
                span class="text-foreground-muted text-sm" { "(" (link.hostname) ")" }
            }
            @if signed_in {
                button class="ml-auto shrink-0 text-foreground-muted hover:text-red-400"
                    aria-label={ "Delete " (link.title) }
                    hx-delete={ "/links/" (link.id) }
                    hx-target="closest li"
                    hx-swap="outerHTML"
                { "[x]" }
            }
        }
    }
}

async fn feed(state: SharedState) -> Result<Response, AppError> {
    let items = state
        .links
        .list()
        .await?
        .into_iter()
        .map(|link| Item {
            title: link.title,
            link: link.url,
            ..Default::default()
        })
        .collect();

    Ok(feed::response(Channel {
        title: "omfj.no links",
        link: format!("{}/links", state.site_url),
        description: "Some recommended links from me",
        items,
    }))
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
    Ok(mutation_response(
        &headers,
        link_item(&link, true),
        "/links",
    ))
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
