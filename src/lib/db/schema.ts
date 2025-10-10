import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text, uniqueIndex, integer } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

/**
 * Users
 */
export const users = sqliteTable(
	'user',
	{
		id: text().primaryKey().$defaultFn(nanoid),
		username: text().notNull(),
		githubId: text().notNull()
	},
	(t) => [uniqueIndex('github_id_idx').on(t.githubId)]
);

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions)
}));

export type User = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;

/**
 * Sessions
 */
export const sessions = sqliteTable('session', {
	id: text().primaryKey().$defaultFn(nanoid),
	userId: text().notNull(),
	expiresAt: integer({ mode: 'timestamp' }).notNull(),
	createdAt: integer({ mode: 'timestamp' }).notNull()
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));

export type Session = InferSelectModel<typeof sessions>;
export type SessionInsert = InferInsertModel<typeof sessions>;

/**
 * Movies and series
 */
export const films = sqliteTable('film', {
	id: text().primaryKey(),
	title: text().notNull(),
	rating: integer().notNull()
});

export type Film = InferSelectModel<typeof films>;
export type FilmInsert = InferInsertModel<typeof films>;

/**
 * Wishlist for christmas or birthdays
 */
export const wishlists = sqliteTable('wishlist', {
	id: text().primaryKey().$defaultFn(nanoid),
	title: text().notNull(),
	link: text()
});

export type Wishlist = InferSelectModel<typeof wishlists>;
export type WishlistInsert = InferInsertModel<typeof wishlists>;
