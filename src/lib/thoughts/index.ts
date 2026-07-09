import { read } from '$app/server';
import { marked } from 'marked';
import matter from 'gray-matter';
import { parse, isValid } from 'date-fns';
import z from 'zod';

const thoughtFiles = import.meta.glob('$lib/thoughts/*.md', { query: '?url', import: 'default' });

const DATE_FORMAT = 'dd-MM-yyyy';

const ThoughtMetaSchema = z.object({
	title: z.string(),
	date: z
		.string()
		.refine((date) => isValid(parse(date, DATE_FORMAT, new Date())), {
			message: `Invalid date, expected format ${DATE_FORMAT}`
		})
		// Normalize to an ISO string so the client can format it directly.
		.transform((date) => parse(date, DATE_FORMAT, new Date()).toISOString())
});

export type ThoughtMeta = z.infer<typeof ThoughtMetaSchema>;

function slugFromPath(path: string): string {
	return path.split('/').pop()?.replace('.md', '') ?? '';
}

export async function getAllThoughts(): Promise<Array<{ slug: string; meta: ThoughtMeta }>> {
	const thoughts = await Promise.all(
		Object.entries(thoughtFiles).map(async ([path, resolver]) => {
			const fileUrl = await resolver();
			const file = await read(fileUrl as string).text();
			const { data } = matter(file);

			const meta = ThoughtMetaSchema.safeParse(data);
			if (!meta.success) {
				console.error('Thought meta validation failed:', path, meta.error);
				return null;
			}

			return { slug: slugFromPath(path), meta: meta.data };
		})
	);

	return thoughts
		.filter((thought) => thought !== null)
		.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

export async function getThought(
	slug: string
): Promise<{ meta: ThoughtMeta; content: string } | null> {
	const matchingFile = Object.keys(thoughtFiles).find((path) => slugFromPath(path) === slug);

	if (!matchingFile) {
		console.error('No matching file found for slug:', slug);
		return null;
	}

	const fileUrl = await thoughtFiles[matchingFile]();
	const file = await read(fileUrl as string).text();
	const { data, content } = matter(file);

	const meta = ThoughtMetaSchema.safeParse(data);
	if (!meta.success) {
		console.error('Thought meta validation failed:', matchingFile, meta.error);
		return null;
	}

	const html = await marked(content);

	return { meta: meta.data, content: html };
}
