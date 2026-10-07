use axum::{
    http::header::{CONTENT_DISPOSITION, CONTENT_TYPE},
    response::{IntoResponse, Response},
};
use maud::{Markup, PreEscaped, Render, html};

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

impl Render for Channel {
    fn render(&self) -> Markup {
        html! {
            (PreEscaped(r#"<?xml version="1.0" encoding="UTF-8"?>"#))
            rss version="2.0" {
                channel {
                    title { (self.title) }
                    link { (self.link) }
                    description { (self.description) }
                    @for item in &self.items {
                        item {
                            title { (item.title) }
                            link { (item.link) }
                            guid { (item.link) }
                            @if let Some(published) = &item.published {
                                pubDate { (published) }
                            }
                            @if let Some(description) = &item.description {
                                description { (description) }
                            }
                        }
                    }
                }
            }
        }
    }
}

pub(crate) fn response(channel: Channel) -> Response {
    (
        [
            (CONTENT_TYPE, "application/rss+xml; charset=utf-8"),
            (CONTENT_DISPOSITION, "inline"),
        ],
        channel.render().into_string(),
    )
        .into_response()
}

#[cfg(test)]
mod tests {
    use maud::Render;

    use super::{Channel, Item};

    #[test]
    fn renders() {
        let feed = Channel {
            title: "Thoughts & notes",
            link: "https://example.com/thoughts".into(),
            description: "A <small> \"feed\"",
            items: vec![Item {
                title: "An entry".into(),
                link: "https://example.com/thoughts/an-entry".into(),
                published: Some("Mon, 07 Sep 2026 00:00:00 +0000".into()),
                description: None,
            }],
        }
        .render()
        .into_string();

        assert!(
            feed.starts_with(
                r#"<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel>"#
            )
        );
        assert!(feed.contains("<title>Thoughts &amp; notes</title>"));
        assert!(feed.contains("<description>A &lt;small&gt; &quot;feed&quot;</description>"));
        assert!(feed.contains("<link>https://example.com/thoughts/an-entry</link>"));
        assert!(feed.contains("<pubDate>Mon, 07 Sep 2026 00:00:00 +0000</pubDate>"));
        assert!(!feed.contains("<description></description>"));
        assert!(feed.ends_with("</item></channel></rss>"));
    }
}
