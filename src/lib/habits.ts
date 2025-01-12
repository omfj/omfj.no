export type Habit = {
    title: string;
    checkedAt: Date | null;
};


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
        title: 'Meditate for 10 minutes',
        checkedAt: null
    },
    {
        title: 'Read for 30 minutes',
        checkedAt: null
    },
    {
        title: 'Drink 2 liters of water',
        checkedAt: null
    },
    {
        title: 'Do daily Leetcode question',
        checkedAt: null
    },
    {
        title: 'Journal the day',
        checkedAt: null
    }
] satisfies Array<Habit>;