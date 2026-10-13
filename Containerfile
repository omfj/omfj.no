FROM docker.io/library/rust:1.98-bookworm AS builder

ARG TARGETARCH
ARG TAILWIND_VERSION=4.1.17

RUN <<'EOF'
set -eu
case "$TARGETARCH" in
    amd64) tailwind_arch=x64 ;;
    arm64) tailwind_arch=arm64 ;;
    *) echo "unsupported Tailwind architecture: $TARGETARCH" >&2; exit 1 ;;
esac
curl --fail --location --proto '=https' --tlsv1.2 \
    "https://github.com/tailwindlabs/tailwindcss/releases/download/v${TAILWIND_VERSION}/tailwindcss-linux-${tailwind_arch}" \
    --output /usr/local/bin/tailwindcss
chmod +x /usr/local/bin/tailwindcss
EOF

WORKDIR /build

COPY Cargo.toml Cargo.lock build.rs ./
COPY .sqlx .sqlx
COPY migrations migrations
COPY thoughts thoughts
COPY src src
COPY static static

ENV SQLX_OFFLINE=true

ARG DATABASE_URL

RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/build/target \
    touch build.rs && \
    DATABASE_URL="$DATABASE_URL" \
    cargo build --release --locked && \
    cp /build/target/release/omfj-no-rs /tmp/omfj-no-rs

FROM docker.io/library/debian:bookworm-slim

RUN <<'EOF'
apt-get update
apt-get install --yes --no-install-recommends ca-certificates
rm -rf /var/lib/apt/lists/*
EOF

RUN groupadd --gid 10001 app && \
    useradd --uid 10001 --gid app --create-home --shell /usr/sbin/nologin app && \
    mkdir /data && \
    chown app:app /data

WORKDIR /app

COPY --from=builder /tmp/omfj-no-rs /usr/local/bin/omfj-no-rs
COPY --from=builder /build/static static

ENV PORT=3000

USER app

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/omfj-no-rs"]
