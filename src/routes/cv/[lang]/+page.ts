import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	if (params.lang !== 'en') {
		error(404, 'Not found');
	}

	return null;
};
