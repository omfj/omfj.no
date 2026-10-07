CREATE TABLE reading_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    read_at INTEGER
);

CREATE INDEX reading_items_created_at_idx ON reading_items(created_at);
