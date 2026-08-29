use serde::Serialize;

#[derive(Debug, Serialize)]
pub(crate) struct Film {
    pub id: String,
    pub title: String,
    pub rating: i64,
}

#[derive(Debug, Serialize)]
pub(crate) struct RecommendedLink {
    pub id: i64,
    pub title: String,
    pub url: String,
    pub hostname: String,
}

#[derive(Debug, Serialize)]
pub(crate) struct Wish {
    pub id: i64,
    pub title: String,
    pub url: Option<String>,
    pub notes: Option<String>,
}

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
