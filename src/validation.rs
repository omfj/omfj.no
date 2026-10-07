//! Checks for user input, and the error shown when input is rejected.
//!
//! Import [`Valitools`] to call the checks as methods on form fields.

#[derive(Debug, PartialEq, Eq, thiserror::Error)]
#[error("{0}")]
pub struct ValidationError(pub &'static str);

/// Validation methods for text fields, both plain and optional.
pub trait Valitools {
    /// Trims the field, treating a missing or whitespace-only value as absent.
    fn non_blank(&self) -> Option<&str>;

    /// Trims the field, rejecting it with `message` if nothing is left.
    fn required(&self, message: &'static str) -> Result<&str, ValidationError> {
        self.non_blank().ok_or(ValidationError(message))
    }
}

impl Valitools for str {
    fn non_blank(&self) -> Option<&str> {
        Some(self.trim()).filter(|value| !value.is_empty())
    }
}

impl<T: AsRef<str>> Valitools for Option<T> {
    fn non_blank(&self) -> Option<&str> {
        self.as_ref().and_then(|value| value.as_ref().non_blank())
    }
}
