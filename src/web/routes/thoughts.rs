use std::sync::Arc;

use axum::{Router, extract::Path, response::Response, routing::get};
use axum_extra::extract::cookie::CookieJar;
use chrono::NaiveDate;
use maud::{Markup, PreEscaped, html};

use crate::web::{
    AppError, AppState, Layout, SharedState,
    feed::{self, Channel, Item},
    session::is_signed_in,
    thoughts as thought_files,
};

/// Registers the thought index and article routes.
pub(crate) fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/thoughts", get(thoughts))
        .route("/thoughts/feed", get(feed))
        .route("/thoughts/{slug}", get(thought))
}

async fn feed(state: SharedState) -> Response {
    let items = thought_files::all()
        .iter()
        .map(|thought| {
            let article = thought_files::get(thought.slug)
                .expect("every thought summary has a corresponding article");
            let published = NaiveDate::parse_from_str(thought.published_iso, "%Y-%m-%d")
                .expect("validated at build time")
                .and_hms_opt(0, 0, 0)
                .expect("midnight is a valid time")
                .and_utc()
                .to_rfc2822();

            Item {
                title: thought.title.into(),
                link: format!("{}/thoughts/{}", state.site_url, thought.slug),
                published: Some(published),
                description: Some(article.body_html.into()),
            }
        })
        .collect();

    feed::response(Channel {
        title: "omfj.no thoughts",
        link: format!("{}/thoughts", state.site_url),
        description: "Things I have been thinking about",
        items,
    })
}

/// Loads and renders thoughts in reverse publication order.
async fn thoughts(state: SharedState, jar: CookieJar) -> Result<Markup, AppError> {
    let signed_in = is_signed_in(&state, &jar).await?;
    let thoughts = thought_files::all();

    Ok(Layout::new("Thoughts", signed_in)
        .feed("omfj.no thoughts", "/thoughts/feed")
        .render(html! {
            main {
                h1 class="heading-1" { "Thoughts" }
                br;
                p { "Things I have been thinking about." }
                br;
                @if thoughts.is_empty() {
                    p class="text-foreground-muted" { "No thoughts yet." }
                } @else {
                    ul {
                        @for thought in thoughts {
                            li {
                                "- "
                                a href={ "/thoughts/" (thought.slug) } class="link" { (thought.title) }
                                " "
                                time datetime=(thought.published_iso) class="text-foreground-muted text-sm" {
                                    "(" (thought.published_display) ")"
                                }
                            }
                        }
                    }
                }
                p class="pt-4 text-center text-[10px]" {
                    a class="link link-muted" href="/thoughts/feed" { "RSS" }
                }
            }
        }))
}

/// Loads and renders one thought or returns a not-found error for an unknown slug.
async fn thought(
    state: SharedState,
    jar: CookieJar,
    Path(slug): Path<String>,
) -> Result<Markup, AppError> {
    let thought = thought_files::get(&slug).ok_or(AppError::NotFound)?;
    let signed_in = is_signed_in(&state, &jar).await?;

    Ok(Layout::new(thought.title, signed_in).render(html! {
        main class="max-w-2xl" {
            a href="/thoughts" class="link-muted" { "<- Back" }
            br;
            br;
            article {
                h1 class="heading-1" { (thought.title) }
                p class="text-foreground-muted text-sm" {
                    time datetime=(thought.published_iso) { (thought.published_display) }
                }
                br;
                // Rendered from trusted Markdown at build time.
                div class="markdown" { (PreEscaped(thought.body_html)) }
            }
        }
    }))
}
