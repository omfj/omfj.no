import type { PageServerLoad } from './$types';
import { getAllThoughts } from '$lib/thoughts';

export const load: PageServerLoad = async () => {
	return {
		thoughts: await getAllThoughts()
	};
};
