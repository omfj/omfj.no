import { form, getRequestEvent } from '$app/server';
import { z } from 'zod';
import * as t from '$lib/db/schema';
import { fail } from '@sveltejs/kit';

export const createMovie = form(
	z.object({
		id: z.string(),
		title: z.string(),
		rating: z.number().min(1).max(100)
	}),
	async (film) => {
		const { locals } = getRequestEvent();

		if (!locals.auth.session) {
			return fail(401, 'Unauthorized');
		}

		await locals.db.insert(t.films).values(film);

		return true;
	}
);
