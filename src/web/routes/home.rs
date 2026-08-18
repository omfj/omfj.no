use std::sync::Arc;

use askama::Template;
use axum::{Router, routing::get};
use axum_extra::extract::cookie::CookieJar;

use crate::web::{AppError, AppState, SharedState, render_html, session::is_signed_in};

/// Registers the home page route.
pub(crate) fn router() -> Router<Arc<AppState>> {
    Router::new().route("/", get(home))
}

#[derive(Template)]
#[template(path = "home.html")]
struct HomeTemplate {
    signed_in: bool,
}

/// Renders the home page with the visitor's current sign-in state.
async fn home(
    state: SharedState,
    jar: CookieJar,
) -> Result<axum::response::Html<String>, AppError> {
    render_html(HomeTemplate {
        signed_in: is_signed_in(&state, &jar).await?,
    })
}
