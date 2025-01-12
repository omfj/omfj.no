import { env } from '$env/dynamic/private';
import { SESSION_COOKIE_NAME } from '$lib/constants';
import { createDatabase } from '$lib/db/drizzle';
import { AuthService } from '$lib/services/auth';
import type { Handle } from '@sveltejs/kit';
import { GitHub } from 'arctic';

export const handle: Handle = async ({ event, resolve }) => {
	const github = new GitHub(env.GITHUB_CLIENT_ID, env.GITHUB_CLIENT_SECRET, null);
	event.locals.github = github;

	const db = createDatabase(event.platform!.env.DB);
	event.locals.db = db;

	const authService = new AuthService({ db });
	event.locals.authService = authService;

	const sessionId = event.cookies.get(SESSION_COOKIE_NAME);

	if (sessionId) {
		const auth = await authService.validateSession(sessionId);
		if (!auth.user) {
			event.cookies.delete(SESSION_COOKIE_NAME, {
				path: '/'
			});
		} else {
			event.locals.auth = auth;
		}
	} else {
		event.locals.auth = {
			user: null,
			session: null
		};
	}

	return await resolve(event);
};
