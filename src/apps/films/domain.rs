use chrono::{DateTime, Utc};
use serde::Serialize;

use crate::validation::ValidationError;

/// An IMDb title identifier such as `tt0133093`.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ImdbId(String);

impl ImdbId {
    pub fn parse(input: &str) -> Result<Self, ValidationError> {
        let id = input.trim();
        let valid = id
            .strip_prefix("tt")
            .is_some_and(|digits| !digits.is_empty() && digits.bytes().all(|b| b.is_ascii_digit()));
        if !valid {
            return Err(ValidationError("Enter an IMDb id like tt0133093."));
        }
        Ok(Self(id.to_owned()))
    }

    pub fn as_str(&self) -> &str {
        &self.0
    }
}

/// A film rating from 1 to 100.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Rating(i64);

impl Rating {
    pub fn new(value: i64) -> Result<Self, ValidationError> {
        if !(1..=100).contains(&value) {
            return Err(ValidationError("Enter a rating from 1 to 100."));
        }
        Ok(Self(value))
    }

    pub fn get(self) -> i64 {
        self.0
    }
}

/// A film saved in the personal film list.
#[derive(Debug, Serialize, sqlx::FromRow)]
pub struct Film {
    pub id: String,
    pub title: String,
    pub rating: i64,
    pub created_at: Option<DateTime<Utc>>,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn imdb_ids_are_tt_followed_by_digits() {
        assert_eq!(ImdbId::parse(" tt0133093 ").unwrap().as_str(), "tt0133093");
        for input in ["tt", "nm0000206", "tt12x", ""] {
            assert!(ImdbId::parse(input).is_err(), "{input}");
        }
    }

    #[test]
    fn ratings_are_between_1_and_100() {
        assert!(Rating::new(1).is_ok());
        assert!(Rating::new(100).is_ok());
        assert!(Rating::new(0).is_err());
        assert!(Rating::new(101).is_err());
    }
}
