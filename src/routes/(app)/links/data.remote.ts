import { form, getRequestEvent } from '$app/server';
import * as t from '$lib/db/schema';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import z from 'zod';

export const createLink = form(
	z.object({
		title: z.string().min(1),
		url: z.url()
	}),
	async (link) => {
		const { locals } = getRequestEvent();

		if (!locals.auth.user) {
			return fail(401, 'Unauthorized');
		}

		await locals.db.insert(t.links).values(link);

		return true;
	}
);

export const deleteLink = form(z.object({ id: z.string() }), async ({ id }) => {
	const { locals } = getRequestEvent();

	if (!locals.auth.user) {
		return fail(401, 'Unauthorized');
	}

	await locals.db.delete(t.links).where(eq(t.links.id, id));

	return true;
});
