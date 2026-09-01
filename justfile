set shell := ["bash", "-euo", "pipefail", "-c"]

djlint := "uvx --from djlint==1.44.2 djlint"

# Show available recipes.
default:
    @just --list

# Generate the locally served Tailwind CSS asset.
css-build:
    tailwindcss --input static/tailwind.input.css --output static/tailwind.css --minify

# Rebuild Tailwind CSS whenever its source or templates change.
css-watch:
    tailwindcss --input static/tailwind.input.css --output static/tailwind.css --watch

# Format Rust source files.
rust-fmt:
    cargo fmt

# Check Rust formatting without changing files.
rust-fmt-check:
    cargo fmt --check

# Format Askama HTML templates.
html-fmt:
    {{ djlint }} templates --reformat || {{ djlint }} templates --check

# Check Askama HTML template formatting.
html-fmt-check:
    {{ djlint }} templates --check

# Lint Askama HTML templates.
html-lint:
    {{ djlint }} templates --lint

# Format Rust and HTML files.
fmt: rust-fmt html-fmt

# Check Rust and HTML formatting without changing files.
fmt-check: rust-fmt-check html-fmt-check

# Run Clippy for every target and fail on warnings.
rust-lint:
    cargo clippy --all-targets --all-features -- -D warnings

# Lint Rust and Askama HTML templates.
lint: rust-lint html-lint

# Check that the project compiles.
compile-check:
    cargo check --all-targets --all-features

# Run all tests.
test:
    cargo test --all-features

# Run all formatting, static-analysis, compilation, and test checks.
check: fmt-check lint compile-check test

# Alias retained for CI-style usage.
verify: check

# Start the development server.
dev:
    cargo watch -x run
