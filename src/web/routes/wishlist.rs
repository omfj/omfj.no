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

use crate::repository::Wish;
use crate::web::{
    AppError, AppState, Layout, SharedState, mutation_response,
    session::{RequireAuth, is_signed_in},
};

/// Registers the wishlist page and its protected mutation routes.
pub(crate) fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/onskeliste", get(wishlist).post(create_wish))
        .route("/onskeliste/{id}", delete(delete_wish))
}

#[derive(Deserialize)]
struct WishForm {
    title: String,
    url: Option<String>,
    notes: Option<String>,
}

/// Loads and renders the wishlist.
async fn wishlist(state: SharedState, jar: CookieJar) -> Result<Markup, AppError> {
    let wishes = state.wishes.list().await?;
    let signed_in = is_signed_in(&state, &jar).await?;

    Ok(Layout::new("Ønskeliste", signed_in).render(html! {
        main {
            h1 class="heading-1" { "Ønskeliste" }
            br;
            p { "Ting jeg ønsker meg til bursdag, jul og andre anledninger." }
            br;
            @if signed_in {
                details class="mb-4" {
                    summary class="text-foreground-muted cursor-pointer hover:underline" { "Legg til ønske" }
                    form class="mt-2 flex max-w-md flex-col gap-2"
                        hx-post="/onskeliste"
                        hx-target="#wish-list"
                        hx-swap="afterbegin"
                        "hx-on:htmx:after:request"="this.reset()"
                        method="post"
                    {
                        label class="flex items-baseline gap-2" {
                            span class="w-24 shrink-0" { "Tittel:" }
                            input class=(INPUT_CLASS) name="title" required;
                        }
                        label class="flex items-baseline gap-2" {
                            span class="w-24 shrink-0" { "URL:" }
                            input class=(INPUT_CLASS) name="url" type="url";
                        }
                        label class="flex items-baseline gap-2" {
                            span class="w-24 shrink-0" { "Notat:" }
                            input class=(INPUT_CLASS) name="notes";
                        }
                        button class="text-foreground-muted mr-auto hover:underline" type="submit" { "Legg til" }
                    }
                }
            }
            ul #wish-list class="space-y-2" {
                @for wish in &wishes {
                    (wish_item(wish, signed_in))
                }
            }
        }
    }))
}

const INPUT_CLASS: &str = "border-divide-soft w-full border-b bg-transparent outline-none";

/// Renders one wish, shared by the page and the HTMX create response.
fn wish_item(wish: &Wish, signed_in: bool) -> Markup {
    html! {
        li class="flex items-start gap-2" {
            div class="min-w-0 flex-1" {
                div class="truncate" {
                    "- "
                    @if let Some(url) = &wish.url {
                        a href=(url)
                            target="_blank"
                            rel="noopener noreferrer external"
                            class="text-link underline"
                        { (wish.title) }
                    } @else {
                        (wish.title)
                    }
                }
                @if let Some(notes) = &wish.notes {
                    div class="text-foreground-muted pl-4 text-sm" {
                        p { (notes) }
                    }
                }
            }
            @if signed_in {
                button class="shrink-0 text-foreground-muted hover:text-red-400"
                    aria-label={ "Slett " (wish.title) }
                    hx-delete={ "/onskeliste/" (wish.id) }
                    hx-target="closest li"
                    hx-swap="outerHTML"
                { "[x]" }
            }
        }
    }
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
    Ok(mutation_response(
        &headers,
        wish_item(&wish, true),
        "/onskeliste",
    ))
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
