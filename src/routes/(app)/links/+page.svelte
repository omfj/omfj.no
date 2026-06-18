<script lang="ts">
	import { resolve } from '$app/paths';
	import { getUser } from '$lib/contexts/user';
	import CreateLinkForm from './_components/CreateLinkForm.svelte';
	import { deleteLink } from './data.remote';

	let user = getUser();
	let { data } = $props();
	let isFormOpen = $state(false);
	let links = $derived(data.links);
	let page = $derived(data.page);
	let hasMore = $derived(data.hasMore);
</script>

<svelte:head>
	<title>Links</title>
</svelte:head>

<div class="mx-auto w-full max-w-xl py-12 transition-all md:py-24">
	<header class="p-8">
		<h1 class="mb-3 text-3xl">Links</h1>
		<p>
			Articles and reads I recommend. Most of them are related to software development and
			programming, and come from Hacker News.
		</p>
	</header>

	{#if user.current}
		<div class="px-8">
			<button onclick={() => (isFormOpen = !isFormOpen)} class="text-link mb-2 hover:underline">
				{isFormOpen ? 'Hide form' : 'Add a link'}
			</button>
		</div>
		{#if isFormOpen}
			<CreateLinkForm />
		{/if}
	{/if}

	<main class="px-8 py-2">
		<ul class="space-y-3">
			{#each links as link (link.id)}
				<li class="flex items-center gap-2">
					<div class="min-w-0 flex-1 truncate">
						->
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer external"
							class="text-link visited:text-foreground-muted hover:underline"
							title={link.title}
						>
							{link.title} <span class="text-foreground-muted">({new URL(link.url).hostname})</span>
						</a>
					</div>

					{#if user.current}
						<form
							{...deleteLink.for(link.id).enhance(async ({ submit }) => {
								links = links.filter((l) => l.id !== link.id);
								await submit();
							})}
							class="ml-auto inline shrink-0"
						>
							<input {...deleteLink.fields.id.as('hidden', link.id)} />
							<button
								type="submit"
								class="text-red-700 transition-colors hover:text-red-400"
								aria-label="Delete {link.title}">[x]</button
							>
						</form>
					{/if}
				</li>
			{/each}
		</ul>

		<nav class="mt-6 flex gap-4">
			{#if page > 1}
				<a href="{resolve('/links')}?page={page - 1}" class="hover:underline">← Newer</a>
			{/if}
			{#if hasMore}
				<a href="{resolve('/links')}?page={page + 1}" class="hover:underline">Older →</a>
			{/if}
		</nav>
	</main>
</div>
