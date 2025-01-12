import { SESSION_COOKIE_NAME } from '$lib/constants';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, cookies }) => {
		const sessionId = locals.auth.session?.id;

		if (!sessionId) {
			return { success: true };
		}

		cookies.delete(SESSION_COOKIE_NAME, {
			path: '/'
		});

		await locals.authService.deleteSession(sessionId);

		return { success: true };
	}
};
