mod data;
mod view;

use axum::routing::get;

use super::AppRouter;

/// Registers the thought index and article routes.
pub(crate) fn router() -> AppRouter {
    AppRouter::new()
        .route("/thoughts", get(view::thoughts))
        .route("/thoughts/feed", get(view::feed))
        .route("/thoughts/{slug}", get(view::thought))
}
