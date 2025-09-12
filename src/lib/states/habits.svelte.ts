import { browser } from '$app/environment';
import { DEFAULT_HABITS, type Habit } from '$lib/habits';
import { isToday } from 'date-fns';
import { SvelteDate } from 'svelte/reactivity';

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
