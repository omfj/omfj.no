import { uploadedFiles } from '$lib/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals, platform, url }) => {
	const file = await locals.db.query.uploadedFiles.findFirst({
		where: eq(uploadedFiles.id, params.id)
	});

	if (!file) {
		throw error(404, 'File not found');
	}

	if (!file.isPublic && !locals.auth.user) {
		throw error(403, 'Access denied');
	}

	const object = await platform!.env.FILES.get(params.id);

	if (!object) {
		throw error(404, 'File not found in storage');
	}

	const download = url.searchParams.get('download') === '1';

	const headers = new Headers();
	headers.set('Content-Type', file.contentType);
	headers.set('Content-Length', file.size.toString());
	if (download) {
		headers.set(
			'Content-Disposition',
			`attachment; filename*=UTF-8''${encodeURIComponent(file.originalName)}`
		);
	}

	return new Response(object.body, { headers });
};
