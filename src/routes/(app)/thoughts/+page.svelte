<script lang="ts">
	import { resolve } from '$app/paths';

	const { data } = $props();
	let thoughts = $derived(data.thoughts);

	function formatDate(date: string) {
		return new Date(date).toLocaleDateString('en-GB', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Thoughts</title>
</svelte:head>

<main>
	<h1><span class="text-foreground-muted">#</span> Thoughts</h1>

	<br />

	<p>Things I have been thinking about.</p>

	<br />

	{#if thoughts.length === 0}
		<p class="text-foreground-muted">No thoughts yet.</p>
	{:else}
		<ul>
			{#each thoughts as thought (thought.slug)}
				<li>
					-
					<a
						href={resolve('/(app)/thoughts/[slug]', {
							slug: thought.slug
						})}
						class="link"
					>
						{thought.meta.title}
					</a>
					<time datetime={thought.meta.date} class="text-foreground-muted text-sm"
						>({formatDate(thought.meta.date)})</time
					>
				</li>
			{/each}
		</ul>
	{/if}
</main>
