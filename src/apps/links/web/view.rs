use axum::response::Response;
use maud::{Markup, html};

use crate::http::Layout;
use crate::http::error::AppError;
use crate::http::feed::{self, Channel, Item};

use crate::apps::links::domain::RecommendedLink;
use crate::http::session::Session;
use crate::http::state::SharedState;

/// Loads and renders the ordered collection of recommended links.
pub(crate) async fn links(
    state: SharedState,
    Session { signed_in }: Session,
    layout: Layout<'_>,
) -> Result<Markup, AppError> {
    let links = state.links.list().await?;

    Ok(layout.title("Links")
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
pub(crate) fn link_item(link: &RecommendedLink, signed_in: bool) -> Markup {
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

/// Renders the recommended links as an RSS feed.
pub(crate) async fn feed(state: SharedState) -> Result<Response, AppError> {
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
