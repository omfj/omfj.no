mod auth;
mod films;
mod links;
mod wishes;

pub use auth::AuthRepository;
pub use films::{Film, FilmRepository};
pub use links::{LinkRepository, RecommendedLink};
pub use wishes::{Wish, WishRepository};
