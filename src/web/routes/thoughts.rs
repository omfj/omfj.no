use std::sync::Arc;

use askama::Template;
use axum::{
    Router,
    extract::Path,
    response::{Html, Response},
    routing::get,
};
use axum_extra::extract::cookie::CookieJar;
use chrono::NaiveDate;

use crate::web::{
    AppError, AppState, SharedState,
    feed::{self, Channel, Item},
    render_html,
    session::is_signed_in,
    thoughts::{self as thought_files, ThoughtArticle, ThoughtSummary},
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

#[derive(Template)]
#[template(path = "thoughts.html")]
struct ThoughtsTemplate {
    signed_in: bool,
    thoughts: &'static [ThoughtSummary<'static>],
}

#[derive(Template)]
#[template(path = "thought.html")]
struct ThoughtTemplate {
    signed_in: bool,
    thought: &'static ThoughtArticle<'static>,
}

/// Loads and renders thoughts in reverse publication order.
async fn thoughts(state: SharedState, jar: CookieJar) -> Result<Html<String>, AppError> {
    render_html(ThoughtsTemplate {
        signed_in: is_signed_in(&state, &jar).await?,
        thoughts: thought_files::all(),
    })
}

/// Loads and renders one thought or returns a not-found error for an unknown slug.
async fn thought(
    state: SharedState,
    jar: CookieJar,
    Path(slug): Path<String>,
) -> Result<Html<String>, AppError> {
    let thought = thought_files::get(&slug).ok_or(AppError::NotFound)?;
    render_html(ThoughtTemplate {
        signed_in: is_signed_in(&state, &jar).await?,
        thought,
    })
}
