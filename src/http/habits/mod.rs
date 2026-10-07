mod view;

use axum::routing::get;

use super::AppRouter;

/// Registers the browser-local habit tracker page.
pub(crate) fn router() -> AppRouter {
    AppRouter::new().route("/habits", get(view::habits))
}
