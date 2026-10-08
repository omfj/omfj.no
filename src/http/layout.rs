use std::sync::Arc;

use axum::{
    extract::{FromRef, FromRequestParts},
    http::request::Parts,
};
use maud::{DOCTYPE, Markup, html};

use super::{AppState, error::AppError, session::Session};

/// An RSS feed advertised in the page head.
struct Feed<'a> {
    title: &'a str,
    href: &'a str,
}

/// The shared page shell: head, header with theme and auth controls, and footer navigation.
///
/// Handlers extract it directly, so the sign-in state comes from the request's cached [`Session`].
pub(crate) struct Layout<'a> {
    title: &'a str,
    signed_in: bool,
    feed: Option<Feed<'a>>,
}

impl<S> FromRequestParts<S> for Layout<'static>
where
    Arc<AppState>: FromRef<S>,
    S: Send + Sync,
{
    type Rejection = AppError;

    async fn from_request_parts(parts: &mut Parts, state: &S) -> Result<Self, Self::Rejection> {
        let session = Session::from_request_parts(parts, state).await?;
        Ok(Self {
            signed_in: session.signed_in,
            ..Self::new()
        })
    }
}

impl<'a> Layout<'a> {
    pub(crate) fn new() -> Self {
        Self {
            title: "omfj.no",
            signed_in: false,
            feed: None,
        }
    }

    pub(crate) fn title(mut self, title: &'a str) -> Self {
        self.title = title;
        self
    }

    pub(crate) fn feed(mut self, title: &'a str, href: &'a str) -> Self {
        self.feed = Some(Feed { title, href });
        self
    }

    /// Wraps page content in the full HTML document.
    pub(crate) fn render(self, content: Markup) -> Markup {
        html! {
            (DOCTYPE)
            html lang="en" {
                head {
                    meta charset="utf-8";
                    meta name="viewport" content="width=device-width, initial-scale=1";
                    link rel="icon" href="/static/favicon.png";
                    link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png";
                    link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png";
                    link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png";
                    link rel="manifest" href="/static/site.webmanifest";
                    link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#5bbad5";
                    meta name="theme-color" content="#ffffff";
                    meta name="description" content="Ole Magnus' personal website.";
                    @if let Some(feed) = &self.feed {
                        link rel="alternate" type="application/rss+xml" title=(feed.title) href=(feed.href);
                    }
                    meta name="htmx-config" content=r#"{"noSwap":[204,304,"4xx","5xx"]}"#;
                    title { (self.title) }

                    // Not deferred: it must set the theme before first paint.
                    script src="/static/js/theme.js" {}

                    link rel="stylesheet" href="/static/tailwind.css";
                    script src="/static/vendor/htmx-4.0.0.min.js" defer {}

                    link rel="stylesheet" href="/static/styles.css";
                }
                body class="font-mono" {
                    div class="mx-auto flex min-h-screen max-w-xl flex-col px-6 py-6 md:py-16" {
                        header class="flex items-center justify-between gap-5 pt-4 pb-10" {
                            a class="text-xl" href="/" { "omfj" }
                            div class="flex items-center gap-5" {
                                button class="text-foreground-muted hover:underline"
                                    type="button"
                                    onclick="toggleTheme()"
                                {
                                    span class="light-label" { "Light" }
                                    span class="dark-label" { "Dark" }
                                }
                                @if self.signed_in {
                                    form action="/auth/sign-out" method="post" {
                                        button class="text-foreground-muted hover:underline" { "Sign out" }
                                    }
                                } @else {
                                    a class="text-foreground-muted hover:underline" href="/auth/github" { "Sign in" }
                                }
                            }
                        }

                        div class="flex-1" { (content) }

                        footer class="mt-auto px-4 pb-4 pt-8 text-[10px]" {
                            nav {
                                ul class="flex flex-wrap justify-center gap-x-4 gap-y-1 text-center" {
                                    li { a class="link link-muted" href="https://start.omfj.no" { "start.omfj.no" } }
                                    li { a class="link link-muted" href="/habits" { "Habit Tracker" } }
                                    li { a class="link link-muted" href="/omdb" { "OMDb" } }
                                    li { a class="link link-muted" href="/links" { "Links" } }
                                    li { a class="link link-muted" href="/thoughts" { "Thoughts" } }
                                    @if self.signed_in {
                                        li { a class="link link-muted" href="/reading" { "Reading" } }
                                        li { a class="link link-muted" href="/onskeliste" { "Wishlist" } }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
