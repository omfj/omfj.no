<script lang="ts">
	import { getUser } from '$lib/contexts/user';
	import CreateNewItemForm from './_components/CreateNewItemForm.svelte';
	import { deleteItem } from './data.remote';

	let user = getUser();
	let { data } = $props();
	let isFormOpen = $state(false);
	let wishlist = $derived(data.whislist);
</script>

<svelte:head>
	<title>Ønskeliste</title>
</svelte:head>

<main>
	<h1><span class="text-foreground-muted">#</span> Ønskeliste</h1>

	<br />

	<p>Ting jeg ønsker meg til bursdag, jul og andre anledninger.</p>

	<br />

	{#if user()}
		<button
			onclick={() => (isFormOpen = !isFormOpen)}
			aria-expanded={isFormOpen}
			class="text-foreground-muted hover:underline"
		>
			{isFormOpen ? 'Skjul skjema' : 'Legg til nytt ønske'}
		</button>

		{#if isFormOpen}
			<CreateNewItemForm />
		{/if}

		<br />
		<br />
	{/if}

	<ul class="space-y-2">
		{#each wishlist as item (item.id)}
			<li class="flex items-start gap-2">
				<div class="min-w-0 flex-1">
					<div class="truncate">
						-
						{#if item.link}
							<a
								href={item.link}
								target="_blank"
								rel="noopener noreferrer external"
								class="text-link underline"
							>
								{item.title}
							</a>
						{:else}
							{item.title}
						{/if}
					</div>

					{#if item.description}
						<div class="text-foreground-muted pl-4 text-sm">
							{#each item.description.split('\n\n') as paragraph, i (i)}
								<p>{paragraph}</p>
							{/each}
						</div>
					{/if}
				</div>

				{#if user()}
					<form
						{...deleteItem.for(item.id).enhance(async ({ submit }) => {
							wishlist = wishlist.filter((i) => i.id !== item.id);
							await submit();
						})}
						class="ml-auto inline shrink-0"
					>
						<input {...deleteItem.fields.id.as('hidden', item.id)} />
						<button
							type="submit"
							class="text-red-700 transition-colors hover:text-red-400"
							aria-label="Delete {item.title}">[x]</button
						>
					</form>
				{/if}
			</li>
		{/each}
	</ul>
</main>
