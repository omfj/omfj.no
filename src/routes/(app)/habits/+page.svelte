<script lang="ts">
	import { cn } from '$lib/cn';
	import { List, ListItem } from '$lib/components/list';
	import { HabitsState } from '$lib/states/habits.svelte';

	let habitsState = new HabitsState();
</script>

<svelte:head>
	<title>Daily Habits</title>
</svelte:head>

<div class="mx-auto w-full max-w-xl py-12 transition-all md:py-24">
	<header class="p-8">
		<h1 class="mb-3 text-3xl">Daily Habits</h1>
		<p>A tracker for my daily habits.</p>
	</header>

	<main class="space-y-10 px-8 py-2">
		<List>
			{#each habitsState.habits as habit, i}
				{@const isChecked = !!habit.checkedAt}
				<ListItem>
					<button
						onclick={() => habitsState.toggleHabit(i)}
						class={cn('h-full w-full p-2 text-left', {
							'line-through opacity-65': isChecked
						})}
					>
						{habit.title}
					</button>
				</ListItem>
			{/each}
		</List>
	</main>
</div>
