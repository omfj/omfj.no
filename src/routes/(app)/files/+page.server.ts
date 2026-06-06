import { uploadedFiles } from '$lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const isLoggedIn = !!locals.auth.user;

	const files = isLoggedIn
		? await locals.db.query.uploadedFiles.findMany({ orderBy: desc(uploadedFiles.uploadedAt) })
		: await locals.db.query.uploadedFiles.findMany({
				where: eq(uploadedFiles.isPublic, true),
				orderBy: desc(uploadedFiles.uploadedAt)
			});

	return { files, isLoggedIn };
};
