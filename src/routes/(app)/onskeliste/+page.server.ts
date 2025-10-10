import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import z from 'zod';
import { wishlists } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const whislist = await locals.db.query.wishlists.findMany();

	return {
		whislist
	};
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.auth.user) {
			return fail(401, { message: 'Du er ikke logget inn' });
		}

		const formData = await request.formData();
		const body = Object.fromEntries(formData);

		const { data, success } = z
			.object({
				title: z.string().min(1, 'Tittel er påkrevd'),
				link: z
					.url()
					.optional()
					.or(z.literal(''))
					.transform((val) => (val === '' ? undefined : val))
			})
			.safeParse(body);

		if (!success) {
			return fail(400, { message: 'Ugyldig data' });
		}

		await locals.db.insert(wishlists).values(data);

		return { success: true };
	},

	delete: async ({ request, locals }) => {
		if (!locals.auth.user) {
			return fail(401, { message: 'Du er ikke logget inn' });
		}

		const formData = await request.formData();
		const body = Object.fromEntries(formData);

		const { data, success } = z
			.object({
				id: z.string().min(1, 'ID er påkrevd')
			})
			.safeParse(body);

		if (!success) {
			return fail(400, { message: 'Ugyldig data' });
		}

		await locals.db.delete(wishlists).where(eq(wishlists.id, data.id));

		return { success: true };
	}
};
