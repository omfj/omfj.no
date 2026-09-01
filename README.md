# omfj.no

A website using Axum, Askama HTML templates, HTMX, SQLite, and SQLx.

## Prerequisites

- [mise](https://mise.jdx.dev/) to install the project's pinned development tools
- [Podman](https://podman.io/) to build the production container image (optional)

Install the tools declared in [`mise.toml`](mise.toml):

```sh
mise install
```

## Run locally

Copy `.env.example` to `.env` to configure local development. Environment variables already set by the shell take precedence over values in `.env`.

```sh
mise run dev
```

Open <http://127.0.0.1:3000>.

After changing Tailwind classes or [`static/tailwind.input.css`](static/tailwind.input.css),
rebuild the locally generated stylesheet with:

```sh
mise run css
```

`mise run dev` watches both the Rust source and Tailwind inputs. Other project commands are
available through `mise tasks`; the main ones are `mise run format`, `mise run lint`,
`mise run test`, and `mise run check`. mise installs djLint directly, so no separate Python or uv
setup is needed.

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
