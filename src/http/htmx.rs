use axum::http::HeaderMap;
use axum::response::{IntoResponse, Redirect, Response};
use maud::Markup;

/// Returns an HTML fragment to HTMX clients and a redirect to regular form clients.
pub(crate) fn mutation_response(
    headers: &HeaderMap,
    fragment: Markup,
    fallback: &'static str,
) -> Response {
    if is_htmx(headers) {
        fragment.into_response()
    } else {
        Redirect::to(fallback).into_response()
    }
}

// Check if the request is an HTMX request by looking for the "HX-Request" header.
fn is_htmx(headers: &HeaderMap) -> bool {
    headers
        .get("HX-Request")
        .is_some_and(|value| value == "true")
}
