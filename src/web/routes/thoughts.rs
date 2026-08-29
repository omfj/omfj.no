use std::sync::Arc;

use askama::Template;
use axum::{Router, extract::Path, response::Html, routing::get};
use axum_extra::extract::cookie::CookieJar;

use crate::web::{
    AppError, AppState, SharedState,
    models::{ThoughtArticle, ThoughtSummary},
    render_html,
    session::is_signed_in,
    thoughts as thought_files,
};

/// Registers the thought index and article routes.
pub(crate) fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/thoughts", get(thoughts))
        .route("/thoughts/{slug}", get(thought))
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
