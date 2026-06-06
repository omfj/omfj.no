import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ request, locals, platform, url }) => {
	if (!locals.auth.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const fileId = url.searchParams.get('id');
	const uploadId = url.searchParams.get('uploadId');
	const partNumber = parseInt(url.searchParams.get('partNumber') ?? '1', 10);

	if (!fileId || !uploadId) {
		throw error(400, 'Missing id or uploadId');
	}

	const mpu = platform!.env.FILES.resumeMultipartUpload(fileId, uploadId);
	const body = await request.arrayBuffer();
	const part = await mpu.uploadPart(partNumber, body);

	return json({ partNumber: part.partNumber, etag: part.etag });
};
