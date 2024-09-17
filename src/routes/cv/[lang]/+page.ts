import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { cv } from '$lib/cv';

const isCVLanguage = (lang: string): lang is keyof typeof cv => Object.keys(cv).includes(lang);

export const load: PageLoad = async ({ params }) => {
	if (!isCVLanguage(params.lang)) {
		throw error(404, 'Not found');
	}

	const cvContent = cv[params.lang];

	return {
		cv: cvContent,
		lang: params.lang
	};
};
