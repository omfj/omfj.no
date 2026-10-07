use maud::{Markup, html};

use crate::apps::wishlist::domain::Wish;
use crate::http::Layout;
use crate::http::error::AppError;
use crate::http::session::Session;
use crate::http::state::SharedState;

/// Loads and renders the wishlist.
pub(crate) async fn wishlist(
    state: SharedState,
    Session { signed_in }: Session,
    layout: Layout<'_>,
) -> Result<Markup, AppError> {
    let wishes = state.wishes.list().await?;

    Ok(layout.title("Ønskeliste").render(html! {
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
pub(crate) fn wish_item(wish: &Wish, signed_in: bool) -> Markup {
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
