mod auth;
mod config;
mod db;
mod http;
mod repository;
mod title;

use std::net::{Ipv4Addr, SocketAddr};

use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

use crate::{config::Config, http::AppState};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    setup_tracing();

    let config = Config::load();
    let state = AppState::from_config(&config).await?;
    let router = http::router(state);
    let address = SocketAddr::from((Ipv4Addr::UNSPECIFIED, config.port));

    tracing::info!(%address, "listening");
    tracing::info!("Press Ctrl+C to stop the server");
    tracing::info!("Open in your browser: http://localhost:{}", config.port);

    let listener = tokio::net::TcpListener::bind(address).await?;
    axum::serve(listener, router)
        .with_graceful_shutdown(shutdown_signal())
        .await?;

    Ok(())
}

/// Sets up the tracing subscriber for logging.
fn setup_tracing() {
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "omfj_no_rs=debug,tower_http=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();
}

/// Waits for the platform's termination signal so the server can shut down gracefully.
async fn shutdown_signal() {
    let ctrl_c = async {
        tokio::signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    let terminate = async {
        tokio::signal::unix::signal(tokio::signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }
}
