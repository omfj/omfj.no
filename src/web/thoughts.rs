use super::models::{ThoughtArticle, ThoughtSummary};

include!(concat!(env!("OUT_DIR"), "/thoughts.rs"));

/// Returns all build-time rendered thoughts in reverse publication order.
pub(crate) fn all() -> &'static [ThoughtSummary<'static>] {
    THOUGHTS
}

/// Finds a build-time rendered thought by its filename-derived slug.
pub(crate) fn get(slug: &str) -> Option<&'static ThoughtArticle<'static>> {
    ARTICLES.iter().find(|thought| thought.slug == slug)
}
