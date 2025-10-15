import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const whislist = await locals.db.query.wishlists.findMany();

	return {
		whislist
	};
};
