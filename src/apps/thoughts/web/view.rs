use axum::extract::Path;
use axum::response::Response;
use chrono::NaiveDate;
use maud::{Markup, PreEscaped, html};

use crate::http::Layout;
use crate::http::error::AppError;
use crate::http::feed::{self, Channel, Item};
use crate::http::state::SharedState;

use crate::apps::thoughts as data;

/// Renders all thoughts as an RSS feed.
pub(crate) async fn feed(state: SharedState) -> Response {
    let items = data::all()
        .iter()
        .map(|thought| {
            let article =
                data::get(thought.slug).expect("every thought summary has a corresponding article");
            let published = date(thought.published_iso);

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

fn date(value: &str) -> String {
    NaiveDate::parse_from_str(value, "%Y-%m-%d")
        .expect("validated at build time")
        .and_hms_opt(0, 0, 0)
        .expect("midnight is a valid time")
        .and_utc()
        .to_rfc2822()
}

/// Loads and renders thoughts in reverse publication order.
pub(crate) async fn thoughts(layout: Layout<'_>) -> Result<Markup, AppError> {
    let thoughts = data::all();

    Ok(layout
        .title("Thoughts")
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
pub(crate) async fn thought(
    layout: Layout<'_>,
    Path(slug): Path<String>,
) -> Result<Markup, AppError> {
    let thought = data::get(&slug).ok_or(AppError::NotFound)?;

    Ok(layout.title(thought.title).render(html! {
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
