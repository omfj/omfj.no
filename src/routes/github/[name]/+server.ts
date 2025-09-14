import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ params }) => {
	return new Response(null, {
		status: 302,
		headers: {
			Location: `https://github.com/omfj/${params.name}`
		}
	});
};
