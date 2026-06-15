import type { PageServerLoad } from './$types';
import { desc } from 'drizzle-orm';
import * as t from '$lib/db/schema';

const PAGE_SIZE = 15;

export const load: PageServerLoad = async ({ locals, url }) => {
	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));

	const links = await locals.db.query.links.findMany({
		orderBy: desc(t.links.createdAt),
		limit: PAGE_SIZE + 1,
		offset: (page - 1) * PAGE_SIZE
	});

	const hasMore = links.length > PAGE_SIZE;

	return {
		links: hasMore ? links.slice(0, PAGE_SIZE) : links,
		page,
		hasMore
	};
};
