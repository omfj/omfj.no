use axum_extra::extract::CookieJar;
use maud::{Markup, html};

use crate::http::session::is_signed_in;
use crate::http::state::SharedState;
use crate::http::{AppError, Layout};

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

/// Renders the habit tracker whose checked state is managed entirely in the browser.
pub(crate) async fn habits(state: SharedState, jar: CookieJar) -> Result<Markup, AppError> {
    let signed_in = is_signed_in(&state, &jar).await?;

    Ok(Layout::new("Daily Habits", signed_in).render(html! {
        main {
            h1 class="heading-1" { "Daily Habits" }
            br;
            p { "A tracker for my daily habits." }
            br;
            ul #habits {
                @for habit in HABITS {
                    li {
                        button type="button" data-habit=(habit.id) {
                            span aria-hidden="true" { "[ ]" }
                            " "
                            (habit.title)
                        }
                    }
                }
            }
        }
        script src="/static/js/habits.js" defer {}
    }))
}
