import { browser } from '$app/environment';
import { isToday } from 'date-fns';
import { SvelteDate } from 'svelte/reactivity';

type Habit = {
	title: string;
	checkedAt: SvelteDate | null;
};

const DEFAULT_HABITS = [
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

const HABITS_LOCAL_STORAGE_KEY = 'habits';

export class HabitsState {
	habits: Array<Habit> = $state(DEFAULT_HABITS);

	constructor() {
		if (browser) {
			const habits = localStorage.getItem(HABITS_LOCAL_STORAGE_KEY);
			if (habits) {
				this.habits = (JSON.parse(habits) as Array<Habit>).map((habit) => {
					// Restart the checkedAt date if it was checked another day

					let checkedAt = null;

					if (habit.checkedAt && isToday(new SvelteDate(habit.checkedAt))) {
						checkedAt = new SvelteDate(habit.checkedAt);
					}

					return {
						...habit,
						checkedAt
					};
				});

				return;
			}
		}
	}

	toggleHabit(index: number) {
		this.habits[index].checkedAt = this.habits[index].checkedAt ? null : new SvelteDate();
		this.save();
	}

	save() {
		localStorage.setItem(HABITS_LOCAL_STORAGE_KEY, JSON.stringify(this.habits));
	}
}
