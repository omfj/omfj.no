import type { KnipConfig } from 'knip';

const config: KnipConfig = {
	project: ['src/**/*.{js,ts,svelte}'],
	ignore: [
		'build/**',
		'.svelte-kit/**',
		'dist/**',
		'node_modules/**',
		'migrations/**',
		'worker-configuration.d.ts'
	],
	ignoreDependencies: ['tailwindcss', '@tailwindcss/typography'],
	ignoreUnresolved: [/\$env\/dynamic\/private/]
};

export default config;
