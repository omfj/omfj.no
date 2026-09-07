use std::fmt;

use axum::{
    http::header::{CONTENT_DISPOSITION, CONTENT_TYPE},
    response::{IntoResponse, Response},
};

#[derive(Debug, Default)]
pub(crate) struct Channel {
    pub title: &'static str,
    pub link: String,
    pub description: &'static str,
    pub items: Vec<Item>,
}

#[derive(Debug, Default)]
pub(crate) struct Item {
    pub title: String,
    pub link: String,
    pub published: Option<String>,
    pub description: Option<String>,
}

impl fmt::Display for Channel {
    fn fmt(&self, output: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            output,
            r#"<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>{}</title><link>{}</link><description>{}</description>"#,
            escape(self.title),
            escape(&self.link),
            escape(self.description),
        )?;
        for item in &self.items {
            write!(
                output,
                "<item><title>{}</title><link>{}</link><guid>{}</guid>",
                escape(&item.title),
                escape(&item.link),
                escape(&item.link),
            )?;
            if let Some(published) = &item.published {
                write!(output, "<pubDate>{}</pubDate>", escape(published))?;
            }
            if let Some(description) = &item.description {
                write!(output, "<description>{}</description>", escape(description))?;
            }
            output.write_str("</item>")?;
        }
        output.write_str("</channel></rss>")
    }
}

pub(crate) fn response(channel: Channel) -> Response {
    (
        [
            (CONTENT_TYPE, "application/rss+xml; charset=utf-8"),
            (CONTENT_DISPOSITION, "inline"),
        ],
        channel.to_string(),
    )
        .into_response()
}

fn escape(value: &str) -> String {
    value
        .replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
        .replace('\'', "&apos;")
}

#[cfg(test)]
mod tests {
    use super::{Channel, Item, escape};

    #[test]
    fn escapes_xml_special_characters() {
        assert_eq!(
            escape("& <hello> \"world\" 'foobar'"),
            "&amp; &lt;hello&gt; &quot;world&quot; &apos;foobar&apos;"
        );
    }

    #[test]
    fn renders() {
        let feed = Channel {
            title: "Thoughts & notes",
            link: "https://example.com/thoughts".into(),
            description: "A <small> feed",
            items: vec![Item {
                title: "An entry".into(),
                link: "https://example.com/thoughts/an-entry".into(),
                published: Some("Mon, 07 Sep 2026 00:00:00 +0000".into()),
                description: None,
            }],
        }
        .to_string();

        assert!(feed.contains("<title>Thoughts &amp; notes</title>"));
        assert!(feed.contains("<description>A &lt;small&gt; feed</description>"));
        assert!(feed.contains("<pubDate>Mon, 07 Sep 2026 00:00:00 +0000</pubDate>"));
        assert!(!feed.contains("<description></description>"));
    }
}
