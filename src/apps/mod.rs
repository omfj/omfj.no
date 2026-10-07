pub(crate) mod films;
pub(crate) mod links;
pub(crate) mod pages;
pub(crate) mod reading;
pub(crate) mod thoughts;
pub(crate) mod wishlist;

use crate::http::AppRouter;

/// Registers the routes of every app.
pub(crate) fn router() -> AppRouter {
    AppRouter::new()
        .merge(pages::router())
        .merge(films::web::router())
        .merge(links::web::router())
        .merge(reading::web::router())
        .merge(wishlist::web::router())
        .merge(thoughts::web::router())
}
