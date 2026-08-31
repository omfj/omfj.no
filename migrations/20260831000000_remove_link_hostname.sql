CREATE TABLE films_new (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 100)
);

INSERT INTO films_new (id, title, rating)
SELECT id, title, rating FROM films;

DROP TABLE films;
ALTER TABLE films_new RENAME TO films;

CREATE TABLE links_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL
);

INSERT INTO links_new (id, title, url)
SELECT id, title, url FROM links;

DROP TABLE links;
ALTER TABLE links_new RENAME TO links;

CREATE TABLE wishes_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT,
    notes TEXT
);

INSERT INTO wishes_new (id, title, url, notes)
SELECT id, title, url, notes FROM wishes;

DROP TABLE wishes;
ALTER TABLE wishes_new RENAME TO wishes;
