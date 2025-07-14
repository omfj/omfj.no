import { browser } from '$app/environment';

export const AVAILABLE_THEMES = ['light', 'dark'] as const;
export const THEME_LS_KEY = 'theme';
export const DEFAULT_THEME = 'light';

export type Theme = (typeof AVAILABLE_THEMES)[number];

export function isValidTheme(theme: string): theme is Theme {
	return AVAILABLE_THEMES.includes(theme as (typeof AVAILABLE_THEMES)[number]);
}

export class ThemeState {
	#theme: Theme = $state(browser ? this._getTheme() : DEFAULT_THEME);

	constructor() {
		if (browser) {
			const storedTheme = this._getTheme();
			this._setTheme(storedTheme);
		}
	}

	get current() {
		return this.#theme;
	}

	set current(value: Theme) {
		if (isValidTheme(value)) {
			this._setTheme(value);
		}
	}

	get name() {
		return this.#theme.charAt(0).toUpperCase() + this.#theme.slice(1);
	}

	next() {
		const currentIdx = AVAILABLE_THEMES.indexOf(this.#theme);
		const nextIdx = (currentIdx + 1) % AVAILABLE_THEMES.length;
		this._setTheme(AVAILABLE_THEMES[nextIdx]);
	}

	_getTheme(): Theme {
		if (!browser) {
			return DEFAULT_THEME;
		}

		const theme = localStorage.getItem(THEME_LS_KEY);
		if (!theme || !isValidTheme(theme)) {
			return DEFAULT_THEME;
		}

		return theme;
	}

	_setTheme(theme: Theme): void {
		if (isValidTheme(theme)) {
			this.#theme = theme;
			if (browser) {
				localStorage.setItem(THEME_LS_KEY, theme);
				document.documentElement.setAttribute('data-theme', theme);
			}
		} else {
			console.warn(`Invalid theme: ${theme}. Using default theme instead.`);
			if (browser) {
				localStorage.setItem(THEME_LS_KEY, DEFAULT_THEME);
				document.documentElement.setAttribute('data-theme', DEFAULT_THEME);
			}
		}
	}
}
