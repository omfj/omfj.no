use serde::Serialize;

#[derive(Debug, Serialize)]
pub(crate) struct ThoughtSummary<'a> {
    pub slug: &'a str,
    pub title: &'a str,
    pub published_iso: &'a str,
    pub published_display: &'a str,
}

#[derive(Debug)]
pub(crate) struct ThoughtArticle<'a> {
    pub slug: &'a str,
    pub title: &'a str,
    pub published_iso: &'a str,
    pub published_display: &'a str,
    pub body_html: &'a str,
}

include!(concat!(env!("OUT_DIR"), "/thoughts.rs"));

/// Returns all build-time rendered thoughts in reverse publication order.
pub(crate) fn all() -> &'static [ThoughtSummary<'static>] {
    THOUGHTS
}

/// Finds a build-time rendered thought by its filename-derived slug.
pub(crate) fn get(slug: &str) -> Option<&'static ThoughtArticle<'static>> {
    ARTICLES.iter().find(|thought| thought.slug == slug)
}
