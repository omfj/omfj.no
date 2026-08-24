FROM docker.io/library/rust:1.97-bookworm AS builder

WORKDIR /build

COPY Cargo.toml Cargo.lock ./
COPY .sqlx .sqlx
COPY migrations migrations
COPY templates templates
COPY src src

ENV SQLX_OFFLINE=true

ARG DATABASE_URL

RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/build/target \
    DATABASE_URL="$DATABASE_URL" \
    cargo build --release --locked && \
    cp /build/target/release/omfj-no-rs /tmp/omfj-no-rs

FROM docker.io/library/debian:bookworm-slim

RUN apt-get update \
    && apt-get install --yes --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /tmp/omfj-no-rs /usr/local/bin/omfj-no-rs
COPY static static
COPY thoughts thoughts

ENV PORT=3000

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/omfj-no-rs"]
