import { browser } from '$app/environment';
import { type Habit, DEFAULT_HABITS } from '$lib/habits';
import { isToday } from 'date-fns';

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

					if (habit.checkedAt && isToday(new Date(habit.checkedAt))) {
						checkedAt = new Date(habit.checkedAt);
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
		this.habits[index].checkedAt = this.habits[index].checkedAt ? null : new Date();
		this.save();
	}

	save() {
		localStorage.setItem(HABITS_LOCAL_STORAGE_KEY, JSON.stringify(this.habits));
	}
}
