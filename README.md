# omfj.no

A website using Axum, Maud HTML templates, HTMX, SQLite, and SQLx.

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

`mise run dev` watches both the Rust source and Tailwind inputs. Other project commands are
available through `mise tasks`; the main ones are `mise run format`, `mise run lint`,
`mise run test`, and `mise run check`.

Optional settings:

```sh
DATABASE_URL=sqlite://omfj.db
PORT=3000
SITE_URL=http://127.0.0.1:3000
RUST_LOG=omfj_no=debug,tower_http=debug
```

## Tailnet Auth

Content is public. Editing is restricted to requests from the Tailscale tailnet. The
reverse proxy strips `X-Tailnet-User` from every request and sets it for tailnet IPs:

```caddy
omfj.no {
	request_header -X-Tailnet-User

	@tailnet remote_ip 100.64.0.0/10 fd7a:115c:a1e0::/48
	request_header @tailnet X-Tailnet-User "owner"

	reverse_proxy 127.0.0.1:3000
}
```

Then set `AUTH=tailnet`. The app port must only be reachable through the
proxy (publish it as `-p 127.0.0.1:3000:3000`), or anyone could send the header.

`AUTH` selects how visitors are signed in:

- `none` (default): everyone is signed out.
- `tailnet`: requests with the `X-Tailnet-User` header are signed in.
- `always`: everyone is signed in. Use this for local development.
