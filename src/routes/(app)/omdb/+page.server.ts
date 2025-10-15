import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const films = await locals.db.query.films.findMany();

	return {
		films
	};
};
