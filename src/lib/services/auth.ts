import type { Database } from '$lib/db/drizzle';
import { sessions, users } from '$lib/db/schema';
import { addDays, isPast } from 'date-fns';
import { eq } from 'drizzle-orm';

const internal_validateSession = async (db: Database, id: string) => {
	const result = await db.query.sessions.findFirst({
		where: (row, { eq }) => eq(row.id, id),
		with: {
			user: true
		}
	});

	if (!result) {
		return {
			user: null,
			session: null
		};
	}

	const { user, ...session } = result;

	if (!user || !session) {
		return {
			user: null,
			session: null
		};
	}

	if (isPast(session.expiresAt)) {
		await db.delete(sessions).where(eq(sessions.id, id)).run();

		return {
			user: null,
			session: null
		};
	}

	return {
		user,
		session
	};
};

export type ValidatedSession = Awaited<ReturnType<typeof internal_validateSession>>;

type AuthServiceOptions = {
	db: Database;
};

export class AuthService {
	#db: Database;

	constructor(options: AuthServiceOptions) {
		this.#db = options.db;
	}

	async getUserByGithubId(githubId: string) {
		const user = await this.#db.query.users.findFirst({
			where: (row, { eq }) => eq(row.githubId, githubId)
		});

		return user ?? null;
	}

	async createUser(id: string, username: string, githubId: string) {
		return await this.#db
			.insert(users)
			.values({
				id,
				username,
				githubId
			})
			.returning()
			.get();
	}

	async validateSession(id: string) {
		return await internal_validateSession(this.#db, id);
	}

	async createSession(id: string, userId: string) {
		const createdAt = new Date();
		const expiresAt = addDays(new Date(), 15);

		return await this.#db
			.insert(sessions)
			.values({
				id,
				userId,
				createdAt,
				expiresAt
			})
			.returning()
			.get();
	}

	async deleteSession(id: string) {
		await this.#db.delete(sessions).where(eq(sessions.id, id)).run();
	}
}
