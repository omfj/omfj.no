PRAGMA foreign_keys = ON;

CREATE TABLE films (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 100),
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    hostname TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE wishes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT,
    notes TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE sessions (
    token TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    provider TEXT NOT NULL DEFAULT 'github',
    subject TEXT NOT NULL DEFAULT ''
);

CREATE TABLE oauth_states (
    token TEXT PRIMARY KEY,
    expires_at INTEGER NOT NULL
    provider TEXT NOT NULL DEFAULT 'github'
);


CREATE INDEX sessions_expires_at_idx ON sessions(expires_at);
CREATE INDEX oauth_states_expires_at_idx ON oauth_states(expires_at);
