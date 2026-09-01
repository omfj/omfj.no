FROM docker.io/library/debian:bookworm-slim AS assets

ARG TARGETARCH
ARG TAILWIND_VERSION=4.1.17

RUN <<'EOF'
set -eu
apt-get update
apt-get install --yes --no-install-recommends ca-certificates curl
case "$TARGETARCH" in
    amd64) tailwind_arch=x64 ;;
    arm64) tailwind_arch=arm64 ;;
    *) echo "unsupported Tailwind architecture: $TARGETARCH" >&2; exit 1 ;;
esac
curl --fail --location --proto '=https' --tlsv1.2 \
    "https://github.com/tailwindlabs/tailwindcss/releases/download/v${TAILWIND_VERSION}/tailwindcss-linux-${tailwind_arch}" \
    --output /usr/local/bin/tailwindcss
chmod +x /usr/local/bin/tailwindcss
rm -rf /var/lib/apt/lists/*
EOF

WORKDIR /build

COPY static/tailwind.input.css static/tailwind.input.css
COPY templates templates
COPY src src

RUN tailwindcss --input static/tailwind.input.css --output static/tailwind.css --minify

FROM docker.io/library/rust:1.97-bookworm AS builder

WORKDIR /build

COPY Cargo.toml Cargo.lock build.rs ./
COPY .sqlx .sqlx
COPY migrations migrations
COPY templates templates
COPY thoughts thoughts
COPY src src

ENV SQLX_OFFLINE=true

ARG DATABASE_URL

RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/build/target \
    DATABASE_URL="$DATABASE_URL" \
    cargo build --release --locked && \
    cp /build/target/release/omfj-no-rs /tmp/omfj-no-rs

FROM docker.io/library/debian:bookworm-slim

RUN <<'EOF'
apt-get update
apt-get install --yes --no-install-recommends ca-certificates
rm -rf /var/lib/apt/lists/*
EOF

WORKDIR /app

COPY --from=builder /tmp/omfj-no-rs /usr/local/bin/omfj-no-rs
COPY static static
COPY --from=assets /build/static/tailwind.css static/tailwind.css

ENV PORT=3000

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/omfj-no-rs"]
