use serde::Serialize;

use crate::domain::entity_id;

entity_id!(
    /// Identifies a wish.
    WishId
);

/// An item in the wishlist.
#[derive(Debug, Serialize, sqlx::FromRow)]
pub struct Wish {
    pub id: WishId,
    pub title: String,
    pub url: Option<String>,
    pub notes: Option<String>,
}
