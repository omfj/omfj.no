FROM docker.io/library/rust:1.97-bookworm AS builder

WORKDIR /build

COPY Cargo.toml Cargo.lock ./
COPY .sqlx .sqlx
COPY migrations migrations
COPY templates templates
COPY src src

ENV SQLX_OFFLINE=true

RUN cargo build --release --locked

FROM docker.io/library/debian:bookworm-slim

RUN apt-get update \
    && apt-get install --yes --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /build/target/release/omfj-no-rs /usr/local/bin/omfj-no-rs
COPY static static
COPY thoughts thoughts

ENV PORT=3000

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/omfj-no-rs"]
