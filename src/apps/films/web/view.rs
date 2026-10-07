use maud::{Markup, html};

use crate::apps::films::domain::Film;
use crate::http::Layout;
use crate::http::error::AppError;
use crate::http::session::Session;
use crate::http::state::SharedState;

/// Loads and renders the film list.
pub(crate) async fn films(
    state: SharedState,
    Session { signed_in }: Session,
    layout: Layout<'_>,
) -> Result<Markup, AppError> {
    let films = state.films.list().await?;

    Ok(layout.title("OMDb").render(html! {
        main {
            h1 class="heading-1" { "OMDb" }
            br;
            p class="max-w-lg" { "A list of movies and series I have watched and my ratings." }
            br;
            @if signed_in {
                details class="mb-4" {
                    summary class="text-foreground-muted cursor-pointer hover:underline" { "Add a film" }
                    form class="mt-2 flex w-full flex-col gap-2"
                        hx-post="/omdb"
                        hx-target="#film-list"
                        hx-swap="afterbegin"
                        "hx-on:htmx:after:request"="this.reset()"
                        method="post"
                    {
                        label class="flex items-baseline gap-2" {
                            span class="w-20 shrink-0" { "Title:" }
                            input class=(INPUT_CLASS) name="title" required;
                        }
                        label class="flex items-baseline gap-2" {
                            span class="w-20 shrink-0" { "IMDb ID:" }
                            input class=(INPUT_CLASS)
                                name="id"
                                placeholder="tt1234567"
                                required
                                pattern="tt[0-9]+";
                        }
                        label class="flex items-baseline gap-2" {
                            span class="w-20 shrink-0" { "Rating:" }
                            input class=(INPUT_CLASS)
                                name="rating"
                                type="number"
                                min="1"
                                max="100"
                                placeholder="1-100"
                                required;
                        }
                        button class="text-foreground-muted mr-auto hover:underline" type="submit" {
                            span class="idle-label" { "Add film" }
                            span class="loading-label" { "Saving..." }
                        }
                    }
                }
            }
            table class="w-full" {
                thead {
                    tr class="border-divide-soft text-foreground-muted border-b text-left" {
                        th class="py-1 pr-4 font-normal" { "Title" }
                        th class="w-24 py-1 font-normal" { "Rating" }
                        @if signed_in {
                            th { span class="sr-only" { "Actions" } }
                        }
                    }
                }
                tbody #film-list {
                    @for film in &films {
                        (film_row(film, signed_in))
                    }
                }
            }
        }
    }))
}

const INPUT_CLASS: &str =
    "border-divide-soft w-full border-b bg-transparent outline-none focus:border-link";

/// Renders one film row, shared by the page and the HTMX create response.
pub(crate) fn film_row(film: &Film, signed_in: bool) -> Markup {
    html! {
        tr class="align-top" {
            td class="py-1 pr-4" {
                a class="link" href={ "https://www.imdb.com/title/" (film.id) "/" } { (film.title) }
            }
            td class="py-1" { (film.rating) }
            @if signed_in {
                td class="py-1" {
                    button class="text-foreground-muted hover:text-red-400"
                        aria-label={ "Delete " (film.title) }
                        hx-delete={ "/omdb/" (film.id) }
                        hx-target="closest tr"
                        hx-swap="outerHTML"
                    { "[x]" }
                }
            }
        }
    }
}
