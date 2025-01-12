import { generateState } from 'arctic';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, cookies }) => {
	const state = generateState();
	const location = locals.github.createAuthorizationURL(state, ['email']).toString();

	cookies.set('oauth_state', state, {
		path: '/',
		maxAge: 60 * 10
	});

	return new Response(null, {
		status: 302,
		headers: {
			location
		}
	});
};
