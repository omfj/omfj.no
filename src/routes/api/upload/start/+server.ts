import { uploadedFiles } from '$lib/db/schema';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const POST: RequestHandler = async ({ request, locals, platform }) => {
	if (!locals.auth.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { id, contentType } = await request.json();

	if (!id || !SLUG_RE.test(id)) {
		return json(
			{ error: 'ID must be a valid slug (lowercase letters, numbers, hyphens)' },
			{ status: 400 }
		);
	}

	const existing = await locals.db.query.uploadedFiles.findFirst({
		where: eq(uploadedFiles.id, id)
	});

	if (existing) {
		return json({ error: 'That ID is already taken' }, { status: 409 });
	}

	const mpu = await platform!.env.FILES.createMultipartUpload(id, {
		httpMetadata: { contentType }
	});

	return json({ uploadId: mpu.uploadId });
};
