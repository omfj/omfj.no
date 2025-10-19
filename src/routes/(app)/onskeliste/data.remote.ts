import { form, getRequestEvent } from '$app/server';
import * as t from '$lib/db/schema';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import z from 'zod';

export const createItem = form(
	z.object({
		title: z.string(),
		description: z.string().optional().or(z.literal('')),
		link: z.url().optional().or(z.literal(''))
	}),
	async (item) => {
		const { locals } = getRequestEvent();

		if (!locals.auth.user) {
			return fail(401, 'Unauthorized');
		}

		await locals.db.insert(t.wishlists).values(item);

		return true;
	}
);

export const deleteItem = form(z.object({ id: z.string() }), async ({ id }) => {
	const { locals } = getRequestEvent();

	if (!locals.auth.user) {
		return fail(401, 'Unauthorized');
	}

	await locals.db.delete(t.wishlists).where(eq(t.wishlists.id, id));

	return true;
});
