<script lang="ts">
	import { resolve } from '$app/paths';
	import { List, ListItem } from '$lib/components/list';

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

<div class="pt-12 pb-12 transition-all md:pt-24">
	<main class="mx-auto mb-10 max-w-xl space-y-10 px-8 py-2">
		<a href={resolve('/')} class="text-foreground-muted inline-block text-sm hover:underline">
			&lt;- Back to home
		</a>

		<section>
			<h1 class="mb-5 text-2xl">Thoughts</h1>

			{#if thoughts.length === 0}
				<p class="text-foreground-muted">No thoughts yet.</p>
			{:else}
				<List>
					{#each thoughts as thought (thought.slug)}
						<ListItem class="gap-2">
							<a
								href={resolve('/thoughts/[slug]', {
									slug: thought.slug
								})}
								class="flex h-full w-full items-center justify-between gap-2 p-2"
							>
								<span>> {thought.meta.title}</span>
								<span class="text-foreground-muted text-sm">{formatDate(thought.meta.date)}</span>
							</a>
						</ListItem>
					{/each}
				</List>
			{/if}
		</section>
	</main>
</div>
