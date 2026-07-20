<script lang="ts">
	import { cn } from '$lib/cn';
	import { HabitsState } from '$lib/states/habits.svelte';

	let habitsState = new HabitsState();
</script>

<svelte:head>
	<title>Daily Habits</title>
</svelte:head>

<main>
	<h1><span class="text-foreground-muted">#</span> Daily Habits</h1>

	<br />

	<p>A tracker for my daily habits.</p>

	<br />

	<ul>
		{#each habitsState.habits as habit, i (habit.title)}
			{@const isChecked = !!habit.checkedAt}
			{@const checkbox = isChecked ? 'x' : ' '}
			<li>
				<button
					onclick={() => habitsState.toggleHabit(i)}
					aria-pressed={isChecked}
					class={cn({
						'line-through opacity-65': isChecked
					})}
				>
					[{checkbox}] {habit.title}
				</button>
			</li>
		{/each}
	</ul>
</main>
