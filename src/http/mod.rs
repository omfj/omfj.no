pub(crate) mod error;
pub(crate) mod feed;
pub(crate) mod htmx;
mod layout;
pub(crate) mod session;
pub(crate) mod state;

use std::sync::Arc;

use axum::Router;
use tower_http::{services::ServeDir, trace::TraceLayer};

pub(crate) use self::state::AppState;
pub(crate) use layout::Layout;
pub(crate) type AppRouter = Router<Arc<AppState>>;

/// Builds the application router and attaches its shared state and middleware.
pub fn router(state: AppState) -> Router {
    Router::new()
        .merge(crate::apps::router())
        .merge(crate::auth::web::router())
        .nest_service("/static", ServeDir::new("static"))
        .fallback(error::not_found)
        .method_not_allowed_fallback(error::method_not_allowed)
        .layer(TraceLayer::new_for_http())
        .with_state(Arc::new(state))
}
