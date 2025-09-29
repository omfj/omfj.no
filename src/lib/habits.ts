import type { SvelteDate } from 'svelte/reactivity';

export interface Habit {
	title: string;
	checkedAt: SvelteDate | null;
}

export const DEFAULT_HABITS = [
	{
		title: 'Plan the day',
		checkedAt: null
	},
	{
		title: 'Take vitamins',
		checkedAt: null
	},
	{
		title: 'Take creatine',
		checkedAt: null
	},
	{
		title: 'Read the news',
		checkedAt: null
	},
	{
		title: 'Read for 20 minutes',
		checkedAt: null
	},
	{
		title: 'Go for a walk',
		checkedAt: null
	},
	{
		title: 'Drink glass of water (1)',
		checkedAt: null
	},
	{
		title: 'Drink glass of water (2)',
		checkedAt: null
	},
	{
		title: 'Drink glass of water (3)',
		checkedAt: null
	},
	{
		title: 'Drink glass of water (4)',
		checkedAt: null
	},
	{
		title: 'Take magnesium',
		checkedAt: null
	}
] satisfies Array<Habit>;
