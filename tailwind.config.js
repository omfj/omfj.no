import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				mono: ['IBM Plex Mono', ...fontFamily.mono]
			},
			colors: {
				black: {
					DEFAULT: '#000',
					soft: '#2a2a2b'
				}
			}
		}
	},
	plugins: []
};
