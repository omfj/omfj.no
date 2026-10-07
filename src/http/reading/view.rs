use maud::{Markup, html};

use crate::http::Layout;
use crate::http::error::AppError;
use crate::http::session::RequireAuth;
use crate::http::state::SharedState;
use crate::repository::ReadingItem;

/// Loads and renders the reading list.
pub(crate) async fn reading(
    state: SharedState,
    _auth: RequireAuth,
    layout: Layout<'_>,
) -> Result<Markup, AppError> {
    let items = state.reading.list().await?;
    let unread = items.iter().filter(|item| item.read_at.is_none()).count();

    Ok(layout.title("Reading list").render(html! {
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

/// Renders one reading list item, shared by the page and the HTMX mutation responses.
pub(crate) fn item_row(item: &ReadingItem) -> Markup {
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
