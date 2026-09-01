# omfj.no

A website using Axum, Askama HTML templates, HTMX, SQLite, and SQLx.

## Prerequisites

- A current [Rust toolchain](https://rustup.rs/)
- [just](https://github.com/casey/just) (to run project tasks)
- Tailwind CSS v4.1.17 as a [standalone executable](https://tailwindcss.com/docs/installation/tailwind-cli)

Install the Tailwind executable and make it available as `tailwindcss`. Then build the stylesheet:

```sh
just css-build
```

## Run locally

Copy `.env.example` to `.env` to configure local development. Environment variables already set by the shell take precedence over values in `.env`.

```sh
cargo run
```

Open <http://127.0.0.1:3000>.

After changing Tailwind classes or [`static/tailwind.input.css`](static/tailwind.input.css),
rebuild the locally generated stylesheet with:

```sh
just css-build
```

For automatic rebuilds while working on styles, run `just css-watch` in a separate terminal.

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

The Containerfile rebuilds the Tailwind stylesheet from its pinned dependencies during every image
build, so container deployments do not rely on a locally generated asset.
