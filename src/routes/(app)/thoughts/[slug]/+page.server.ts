import { error } from '@sveltejs/kit';
import { read } from '$app/server';
import type { PageServerLoad } from './$types';
import { marked } from 'marked';
import matter from 'gray-matter';
import z from 'zod';

const thoughtFiles = import.meta.glob('$lib/thoughts/*.md', { query: '?url', import: 'default' });

const ThoughtMetaSchema = z.object({
	title: z.string(),
	date: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: 'Invalid date format'
	})
});

async function readThought(slug: string): Promise<
	| {
			success: true;
			meta: z.infer<typeof ThoughtMetaSchema>;
			content: string;
	  }
	| {
			success: false;
			meta?: undefined;
			content?: undefined;
	  }
> {
	const matchingFile = Object.keys(thoughtFiles).find((path) => {
		const fileName = path.split('/').pop()?.replace('.md', '') || '';
		return fileName === slug;
	});

	if (!matchingFile) {
		console.error('No matching file found for slug:', slug);
		return { success: false };
	}

	const fileUrl = await thoughtFiles[matchingFile]();
	const file = await read(fileUrl as string).text();
	const { data, content } = matter(file);

	const meta = ThoughtMetaSchema.safeParse(data);

	if (!meta.success) {
		console.error('Thought meta validation failed:', meta.error);
		return { success: false };
	}

	const html = await marked(content);

	return { success: true, meta: meta.data, content: html };
}

export const load: PageServerLoad = async ({ params }) => {
	const { success, meta, content } = await readThought(params.slug);

	if (!success) {
		error(404, 'Thought not found');
	}

	return {
		meta,
		content,
		slug: params.slug
	};
};
