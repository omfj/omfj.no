mod auth;
mod error;
mod feed;
mod films;
mod habits;
mod home;
mod htmx;
mod layout;
mod links;
mod reading;
mod session;
mod state;
mod thoughts;
mod wishlist;

use std::sync::Arc;

use axum::Router;
use tower_http::{services::ServeDir, trace::TraceLayer};

pub(crate) use error::AppError;
pub(crate) use layout::Layout;

pub(crate) use self::state::AppState;

pub(crate) type AppRouter = Router<Arc<AppState>>;

/// Builds the application router and attaches its shared state and middleware.
pub fn router(state: AppState) -> Router {
    Router::new()
        .merge(home::router())
        .merge(habits::router())
        .merge(films::router())
        .merge(links::router())
        .merge(reading::router())
        .merge(wishlist::router())
        .merge(thoughts::router())
        .merge(auth::router())
        .nest_service("/static", ServeDir::new("static"))
        .fallback(error::not_found)
        .method_not_allowed_fallback(error::method_not_allowed)
        .layer(TraceLayer::new_for_http())
        .with_state(Arc::new(state))
}
