import { films } from '$lib/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const films = await locals.db.query.films.findMany();

	return {
		films
	};
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		if (!locals.auth.session) {
			return {
				success: false
			};
		}

		const formData = await request.formData();

		const id = formData.get('id') as string;
		const title = formData.get('title') as string;
		const rating = parseInt(formData.get('rating') as string, 10);

		if (!id || !title || !rating || rating < 1 || rating > 100) {
			return {
				success: false
			};
		}

		await locals.db.insert(films).values({
			id,
			title,
			rating
		});

		return {
			success: true
		};
	}
};
