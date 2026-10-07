//! Reading list: links saved to read later.

mod domain;
mod repo;
mod title;
pub(crate) mod web;

pub use repo::ReadingRepository;
pub use title::{HttpTitleFetcher, TitleFetcher};
