import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getThought } from '$lib/thoughts';

export const load: PageServerLoad = async ({ params }) => {
	const thought = await getThought(params.slug);

	if (!thought) {
		error(404, 'Thought not found');
	}

	return {
		meta: thought.meta,
		content: thought.content,
		slug: params.slug
	};
};
