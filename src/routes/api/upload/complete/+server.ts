import { uploadedFiles } from '$lib/db/schema';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals, platform }) => {
	if (!locals.auth.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { id, uploadId, parts, size, name, contentType, isPublic } = await request.json();

	if (!id || !uploadId || !parts) {
		throw error(400, 'Missing required fields');
	}

	const mpu = platform!.env.FILES.resumeMultipartUpload(id, uploadId);

	try {
		await mpu.complete(parts);
	} catch {
		throw error(500, 'Failed to complete upload');
	}

	await locals.db.insert(uploadedFiles).values({
		id,
		originalName: name,
		contentType,
		size,
		isPublic,
		uploadedAt: new Date()
	});

	return json({ success: true });
};
