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
pub(crate) struct ThoughtSummary {
    pub slug: String,
    pub title: String,
    pub published_iso: String,
    pub published_display: String,
}

#[derive(Debug)]
pub(crate) struct ThoughtArticle {
    pub slug: String,
    pub title: String,
    pub published_iso: String,
    pub published_display: String,
    pub body_html: String,
}
