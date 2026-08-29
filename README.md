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
RUST_LOG=omfj_no=debug,tower_http=debug
```

## GitHub Auth

Content is public. Film and links editing is restricted to the configured GitHub account. So to edit these you need to add a GitHub OAuth app.

Create a GitHub OAuth app with callback URL `http://127.0.0.1:3000/auth/github/callback`, then set:

```sh
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GITHUB_CALLBACK_URL=http://127.0.0.1:3000/auth/github/callback
GITHUB_ALLOWED_LOGIN=omfj
SECURE_COOKIES=false
```

## Production

Use `SECURE_COOKIES=true` in HTTPS production.
