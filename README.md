# omfj.no (Rust)

A server-rendered recreation of `omfj.no` using Axum, Askama HTML templates, HTMX, SQLite, and SQLx. Tailwind and HTMX load from CDNs, so there is no frontend package manager or asset build step.

## Run locally

```sh
cargo run
```

Open <http://127.0.0.1:3000>. The SQLite database is created and seeded automatically as `omfj.db`.

Copy `.env.example` to `.env` to configure local development. Environment variables already set by the shell take precedence over values in `.env`.

Optional settings:

```sh
DATABASE_URL=sqlite://omfj.db
PORT=3000
RUST_LOG=omfj_no_rs=debug,tower_http=debug
```

## GitHub sign-in

Content is public. Film, link, and wishlist editing is restricted to the configured GitHub account. Habit checks stay in the visitor's browser and reset each day; they are never sent to the server.

Create a GitHub OAuth app with callback URL `http://127.0.0.1:3000/auth/github/callback`, then set:

```sh
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GITHUB_CALLBACK_URL=http://127.0.0.1:3000/auth/github/callback
GITHUB_ALLOWED_LOGIN=omfj
SECURE_COOKIES=false
cargo run
```

Use `SECURE_COOKIES=true` in HTTPS production.

## Project layout

- `templates/` — ordinary Askama HTML templates and HTMX fragments
- `thoughts/` — one Markdown file per article, with title and publication date front matter
- `migrations/` — SQLx schema and initial database-backed content
- `static/` — favicons, manifest, and résumé
- `src/web/routes/` — one Rust module per page/route group
- `src/web/` — shared application state, models, sessions, and errors

## Verify

```sh
just check
```

This checks Rust and Askama HTML formatting, runs Clippy and djLint, checks compilation, and runs the tests. The HTML checks use a pinned djLint release through `uvx`, so [uv](https://docs.astral.sh/uv/) must be installed.

Run `just fmt` to format both Rust and HTML, or `just` to list every available development recipe.

`just dev` runs the server through `cargo-watch`, rebuilding and restarting it when source files change. Install it with `cargo install cargo-watch` if needed.
