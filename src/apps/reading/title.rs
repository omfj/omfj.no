use std::time::Duration;

use async_trait::async_trait;

use crate::domain::WebUrl;

const MAX_BYTES: usize = 512 * 1024;

/// Looks up the human-readable title of a web page.
#[async_trait]
pub trait TitleFetcher: Send + Sync {
    /// Returns the page's `<title>`, or `None` if it cannot be fetched or has none.
    async fn fetch(&self, url: &WebUrl) -> Option<String>;
}

/// Fetches titles over HTTP, reading at most the first [`MAX_BYTES`] of the page.
pub struct HttpTitleFetcher {
    client: reqwest::Client,
}

impl HttpTitleFetcher {
    pub fn new(client: reqwest::Client) -> Self {
        Self { client }
    }
}

#[async_trait]
impl TitleFetcher for HttpTitleFetcher {
    async fn fetch(&self, url: &WebUrl) -> Option<String> {
        fetch_from_url(&self.client, url.as_str()).await
    }
}

async fn fetch_from_url(client: &reqwest::Client, url: &str) -> Option<String> {
    let mut response = client
        .get(url)
        .timeout(Duration::from_secs(10))
        .send()
        .await
        .inspect_err(|error| tracing::warn!(%url, %error, "failed to fetch page"))
        .ok()?
        .error_for_status()
        .ok()?;

    let mut body = Vec::new();
    while let Ok(Some(chunk)) = response.chunk().await {
        body.extend_from_slice(&chunk);
        if body.len() >= MAX_BYTES || find_title(&String::from_utf8_lossy(&body)).is_some() {
            break;
        }
    }

    find_title(&String::from_utf8_lossy(&body))
}

fn find_title(html: &str) -> Option<String> {
    let lower = html.to_ascii_lowercase();
    let open = lower.find("<title")?;
    let start = open + lower[open..].find('>')? + 1;
    let end = start + lower[start..].find("</title")?;

    let title = html_escape::decode_html_entities(&html[start..end]);
    let title = title.split_whitespace().collect::<Vec<_>>().join(" ");
    (!title.is_empty()).then_some(title)
}

#[cfg(test)]
mod tests {
    use super::find_title;

    #[test]
    fn finds_title() {
        let html =
            "<html><head><TITLE data-x=\"1\">\n  Hello &amp; welcome\n</TITLE></head></html>";
        assert_eq!(find_title(html).as_deref(), Some("Hello & welcome"));
    }

    #[test]
    fn missing_or_empty_title() {
        assert_eq!(find_title("<html><head></head></html>"), None);
        assert_eq!(find_title("<title> </title>"), None);
        assert_eq!(find_title("<title>unterminated"), None);
    }
}
