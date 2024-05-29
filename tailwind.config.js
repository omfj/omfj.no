import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...fontFamily.sans],
				mono: ['IBM Plex Mono', ...fontFamily.mono]
			},
			colors: {
				black: {
					DEFAULT: '#000',
					soft: '#2a2a2b'
				}
			},
			width: {
				a4: '21cm'
			},
			height: {
				// Actually A4 is 29.7cm, but we need to be a bit smaller
				// so it doesn't add a second page
				a4: '29.7cm'
			},
			screens: {
				a4: '21cm'
			}
		}
	},
	plugins: []
};
