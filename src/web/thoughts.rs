use std::{fs, path::Path};

use chrono::NaiveDate;
use pulldown_cmark::{Options, Parser, html};
use serde::Deserialize;

use super::models::{ThoughtArticle, ThoughtSummary};

const THOUGHTS_DIRECTORY: &str = "thoughts";

#[derive(Debug, thiserror::Error)]
pub(crate) enum ThoughtError {
    #[error("could not read thought content: {0}")]
    Io(#[from] std::io::Error),
    #[error("invalid thought file {path}: {message}")]
    Invalid { path: String, message: String },
}

#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
struct FrontMatter {
    title: String,
    published: NaiveDate,
}

/// Loads all Markdown thoughts in reverse publication order.
pub(crate) fn load_all() -> Result<Vec<ThoughtSummary>, ThoughtError> {
    let mut thoughts = fs::read_dir(THOUGHTS_DIRECTORY)?
        .filter_map(|entry| match entry {
            Ok(entry) if entry.path().extension().is_some_and(|value| value == "md") => {
                Some(parse_file(&entry.path()))
            }
            Ok(_) => None,
            Err(error) => Some(Err(error.into())),
        })
        .collect::<Result<Vec<_>, _>>()?;

    thoughts.sort_by(|left, right| right.published_iso.cmp(&left.published_iso));
    Ok(thoughts
        .into_iter()
        .map(|thought| ThoughtSummary {
            slug: thought.slug,
            title: thought.title,
            published_iso: thought.published_iso,
            published_display: thought.published_display,
        })
        .collect())
}

/// Loads a thought by its filename-derived slug.
pub(crate) fn load(slug: &str) -> Result<Option<ThoughtArticle>, ThoughtError> {
    if !is_valid_slug(slug) {
        return Ok(None);
    }

    let path = Path::new(THOUGHTS_DIRECTORY).join(format!("{slug}.md"));
    match parse_file(&path) {
        Ok(thought) => Ok(Some(thought)),
        Err(ThoughtError::Io(error)) if error.kind() == std::io::ErrorKind::NotFound => Ok(None),
        Err(error) => Err(error),
    }
}

fn parse_file(path: &Path) -> Result<ThoughtArticle, ThoughtError> {
    let source = fs::read_to_string(path)?;
    let slug = path
        .file_stem()
        .and_then(|value| value.to_str())
        .filter(|value| is_valid_slug(value))
        .ok_or_else(|| invalid(path, "the filename must be a lowercase URL slug"))?;
    parse(slug, &source).map_err(|message| invalid(path, message))
}

fn parse(slug: &str, source: &str) -> Result<ThoughtArticle, String> {
    let source = source
        .strip_prefix("---\n")
        .ok_or_else(|| "front matter must begin with ---".to_owned())?;
    let (front_matter, markdown) = source
        .split_once("\n---\n")
        .ok_or_else(|| "front matter must end with ---".to_owned())?;
    let front_matter: FrontMatter =
        serde_yaml::from_str(front_matter).map_err(|error| error.to_string())?;
    if front_matter.title.trim().is_empty() {
        return Err("title cannot be empty".to_owned());
    }

    let mut body_html = String::new();
    let options = Options::ENABLE_TABLES
        | Options::ENABLE_FOOTNOTES
        | Options::ENABLE_STRIKETHROUGH
        | Options::ENABLE_TASKLISTS;
    html::push_html(&mut body_html, Parser::new_ext(markdown.trim(), options));

    Ok(ThoughtArticle {
        slug: slug.to_owned(),
        title: front_matter.title,
        published_iso: front_matter.published.format("%Y-%m-%d").to_string(),
        published_display: front_matter.published.format("%-d %B %Y").to_string(),
        body_html,
    })
}

fn is_valid_slug(slug: &str) -> bool {
    !slug.is_empty()
        && slug
            .bytes()
            .all(|byte| byte.is_ascii_lowercase() || byte.is_ascii_digit() || byte == b'-')
}

fn invalid(path: &Path, message: impl Into<String>) -> ThoughtError {
    ThoughtError::Invalid {
        path: path.display().to_string(),
        message: message.into(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_front_matter_and_markdown() {
        let thought = parse(
            "hello-world",
            "---\ntitle: Hello, world\npublished: 2026-08-18\n---\n\nThis is **Markdown**.",
        )
        .unwrap();

        assert_eq!(thought.slug, "hello-world");
        assert_eq!(thought.title, "Hello, world");
        assert_eq!(thought.published_iso, "2026-08-18");
        assert_eq!(thought.published_display, "18 August 2026");
        assert_eq!(
            thought.body_html,
            "<p>This is <strong>Markdown</strong>.</p>\n"
        );
    }

    #[test]
    fn rejects_missing_front_matter() {
        assert!(parse("hello-world", "Just Markdown").is_err());
    }

    #[test]
    fn rejects_path_like_slugs() {
        assert!(!is_valid_slug("../secret"));
        assert!(!is_valid_slug("Uppercase"));
    }
}
