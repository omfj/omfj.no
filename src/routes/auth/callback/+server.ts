import { getGithubUser } from '$lib/auth/providers';
import { nanoid } from 'nanoid';
import type { RequestHandler } from './$types';
import { SESSION_COOKIE_NAME } from '$lib/constants';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ cookies, locals, url }) => {
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	const storedState = cookies.get('oauth_state');

	if (code === null || state === null || storedState === null || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	const tokens = await locals.github.validateAuthorizationCode(code);
	const githubUser = await getGithubUser(tokens.accessToken());
	const existingUser = await locals.authService.getUserByGithubId(githubUser.id.toString());

	let session;

	if (existingUser === null) {
		if (githubUser.id.toString() !== env.GITHUB_USER_ID) {
			return new Response(null, {
				status: 403
			});
		}

		const userId = nanoid();

		const user = await locals.authService.createUser(
			userId,
			githubUser.login,
			githubUser.id.toString()
		);

		session = await locals.authService.createSession(tokens.accessToken(), user.id);
	} else {
		session = await locals.authService.createSession(tokens.accessToken(), existingUser.id);
	}

	cookies.set(SESSION_COOKIE_NAME, session.id, {
		path: '/',
		expires: new Date(session.expiresAt)
	});

	return new Response(null, {
		status: 302,
		headers: {
			location: '/'
		}
	});
};
