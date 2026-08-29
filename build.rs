use std::{env, error::Error, fs, path::Path};

use chrono::NaiveDate;
use pulldown_cmark::{Options, Parser, html};
use quote::quote;
use serde::Deserialize;

const THOUGHTS_DIRECTORY: &str = "thoughts";

#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
struct FrontMatter {
    title: String,
    published: NaiveDate,
}

struct Thought {
    slug: String,
    title: String,
    published_iso: String,
    published_display: String,
    body_html: String,
}

fn main() -> Result<(), Box<dyn Error>> {
    println!("cargo::rerun-if-changed={THOUGHTS_DIRECTORY}");

    let mut thoughts = fs::read_dir(THOUGHTS_DIRECTORY)?
        .filter_map(|entry| match entry {
            Ok(entry) if entry.path().extension().is_some_and(|value| value == "md") => {
                Some(parse_file(&entry.path()))
            }
            Ok(_) => None,
            Err(error) => Some(Err(error.into())),
        })
        .collect::<Result<Vec<_>, Box<dyn Error>>>()?;
    thoughts.sort_by(|left, right| right.published_iso.cmp(&left.published_iso));

    let articles = thoughts.iter().map(|thought| {
        let slug = &thought.slug;
        let title = &thought.title;
        let published_iso = &thought.published_iso;
        let published_display = &thought.published_display;
        let body_html = &thought.body_html;
        quote! {
            ThoughtArticle {
                slug: #slug,
                title: #title,
                published_iso: #published_iso,
                published_display: #published_display,
                body_html: #body_html,
            }
        }
    });
    let summaries = thoughts.iter().map(|thought| {
        let slug = &thought.slug;
        let title = &thought.title;
        let published_iso = &thought.published_iso;
        let published_display = &thought.published_display;
        quote! {
            ThoughtSummary {
                slug: #slug,
                title: #title,
                published_iso: #published_iso,
                published_display: #published_display,
            }
        }
    });
    let generated = quote! {
        pub(crate) static ARTICLES: &[ThoughtArticle<'static>] = &[
            #(#articles),*
        ];

        pub(crate) static THOUGHTS: &[ThoughtSummary<'static>] = &[
            #(#summaries),*
        ];
    };

    fs::write(
        Path::new(&env::var("OUT_DIR")?).join("thoughts.rs"),
        generated.to_string(),
    )?;
    Ok(())
}

fn parse_file(path: &Path) -> Result<Thought, Box<dyn Error>> {
    println!("cargo::rerun-if-changed={}", path.display());
    let source = fs::read_to_string(path)?;
    let slug = path
        .file_stem()
        .and_then(|value| value.to_str())
        .filter(|value| is_valid_slug(value))
        .ok_or_else(|| {
            format!(
                "invalid thought file {}: the filename must be a lowercase URL slug",
                path.display()
            )
        })?;
    parse(slug, &source)
        .map_err(|message| format!("invalid thought file {}: {message}", path.display()).into())
}

fn parse(slug: &str, source: &str) -> Result<Thought, String> {
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

    Ok(Thought {
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
