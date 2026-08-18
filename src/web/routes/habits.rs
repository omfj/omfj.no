use std::sync::Arc;

use askama::Template;
use axum::{Router, response::Html, routing::get};
use axum_extra::extract::cookie::CookieJar;

use crate::web::{AppError, AppState, SharedState, render_html, session::is_signed_in};

struct Habit {
    id: &'static str,
    title: &'static str,
}

static HABITS: &[Habit] = &[
    Habit {
        id: "plan-the-day",
        title: "Plan the day",
    },
    Habit {
        id: "take-vitamins",
        title: "Take vitamins",
    },
    Habit {
        id: "take-creatine",
        title: "Take creatine",
    },
    Habit {
        id: "read-the-news",
        title: "Read the news",
    },
    Habit {
        id: "read",
        title: "Read for 20 minutes",
    },
    Habit {
        id: "walk",
        title: "Go for a walk",
    },
    Habit {
        id: "water-1",
        title: "Drink glass of water (1)",
    },
    Habit {
        id: "water-2",
        title: "Drink glass of water (2)",
    },
    Habit {
        id: "water-3",
        title: "Drink glass of water (3)",
    },
    Habit {
        id: "water-4",
        title: "Drink glass of water (4)",
    },
    Habit {
        id: "take-magnesium",
        title: "Take magnesium",
    },
];

/// Registers the browser-local habit tracker page.
pub(crate) fn router() -> Router<Arc<AppState>> {
    Router::new().route("/habits", get(habits))
}

#[derive(Template)]
#[template(path = "habits.html")]
struct HabitsTemplate {
    signed_in: bool,
    habits: &'static [Habit],
}

/// Renders the habit tracker whose checked state is managed entirely in the browser.
async fn habits(state: SharedState, jar: CookieJar) -> Result<Html<String>, AppError> {
    render_html(HabitsTemplate {
        signed_in: is_signed_in(&state, &jar).await?,
        habits: HABITS,
    })
}
