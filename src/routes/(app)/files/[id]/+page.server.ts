import { uploadedFiles } from '$lib/db/schema';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const file = await locals.db.query.uploadedFiles.findFirst({
		where: eq(uploadedFiles.id, params.id)
	});

	if (!file) {
		throw error(404, 'File not found');
	}

	if (!file.isPublic && !locals.auth.user) {
		throw error(403, 'Access denied');
	}

	return { file, isLoggedIn: !!locals.auth.user };
};

export const actions: Actions = {
	delete: async ({ params, locals, platform }) => {
		if (!locals.auth.user) {
			throw error(403, 'Access denied');
		}

		await platform!.env.FILES.delete(params.id);
		await locals.db.delete(uploadedFiles).where(eq(uploadedFiles.id, params.id));

		throw redirect(303, '/files');
	}
};
