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

<main>
	<h1><span class="text-foreground-muted">#</span> Links</h1>

	<br />

	<p class="max-w-lg">
		Articles and reads I recommend. Most of them are related to software development and
		programming, and come from Hacker News.
	</p>

	<br />

	{#if user()}
		<button
			onclick={() => (isFormOpen = !isFormOpen)}
			aria-expanded={isFormOpen}
			class="text-foreground-muted hover:underline"
		>
			{isFormOpen ? 'Hide form' : 'Add a link'}
		</button>

		{#if isFormOpen}
			<CreateLinkForm />
		{/if}

		<br />
		<br />
	{/if}

	<ul class="space-y-2">
		{#each links as link (link.id)}
			<li class="flex items-center gap-2">
				<div class="min-w-0 flex-1 truncate">
					-
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer external"
						class="link"
						title={link.title}
					>
						{link.title}
					</a>
					<span class="text-foreground-muted text-sm">({new URL(link.url).hostname})</span>
				</div>

				{#if user()}
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

	{#if page > 1 || hasMore}
		<br />

		<nav aria-label="Pagination" class="flex gap-4">
			{#if page > 1}
				<a href="{resolve('/links')}?page={page - 1}" class="link-muted">&lt;- Newer</a>
			{/if}
			{#if hasMore}
				<a href="{resolve('/links')}?page={page + 1}" class="link-muted">Older -&gt;</a>
			{/if}
		</nav>
	{/if}
</main>
