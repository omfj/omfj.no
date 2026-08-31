use serde::Serialize;
use url::Url;

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

impl RecommendedLink {
    pub(crate) fn new(id: i64, title: String, url: String) -> Self {
        let hostname = Url::parse(&url)
            .ok()
            .and_then(|parsed| parsed.host_str().map(str::to_owned))
            .unwrap_or_default();

        Self {
            id,
            title,
            url,
            hostname,
        }
    }
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
