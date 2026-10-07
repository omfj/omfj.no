use crate::http::{AppError, Layout, session::is_signed_in, state::SharedState};
use axum_extra::extract::cookie::CookieJar;
use maud::{Markup, html};

/// Renders the home page with the visitor's current sign-in state.
pub(crate) async fn home(state: SharedState, jar: CookieJar) -> Result<Markup, AppError> {
    let signed_in = is_signed_in(&state, &jar).await?;

    Ok(Layout::new("omfj.no", signed_in).render(html! {
        main {
            h1 class="sr-only" { "omfj.no" }
            p {
                "My name is Ole Magnus. I am 23 year old software engineer (mostly Rust 🦀) from Norway. "
                "Talk to me about Pryda and RBK."
            }
            br;
            p {
                "If you are interested, you can find "
                a href="/static/assets/cv.pdf" class="link" { "my resumè here" }
                "."
            }
            br;
            h2 class="heading-2" { "Socials" }
            br;
            ul {
                (social("https://github.com/omfj", "GitHub", "@omfj"))
                (social("https://bsky.app/profile/omfj.no", "Bluesky", "@omfj.no"))
                (social("https://www.linkedin.com/in/omfj", "LinkedIn", "in/omfj"))
                (social("mailto:me@omfj.no", "E-mail", "me@omfj.no"))
            }
            br;
            h2 class="heading-2" { "Other" }
            br;
            ul {
                li { "- " a href="/static/omfj.asc" class="link" { "GPG public key" } }
            }
        }
    }))
}

fn social(href: &str, name: &str, handle: &str) -> Markup {
    html! {
        li {
            "- "
            a href=(href) class="link" { (name) }
            " "
            span class="text-foreground-muted text-sm" { "(" (handle) ")" }
        }
    }
}
