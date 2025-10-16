<script lang="ts">
	import { getUser } from '$lib/contexts/user';
	import CreateNewItemForm from './_components/CreateNewItemForm.svelte';
	import { deleteItem } from './data.remote';

	let user = getUser();
	let { data } = $props();
</script>

<svelte:head>
	<title>Ønskeliste</title>
</svelte:head>

<div class="mx-auto w-full max-w-xl py-12 transition-all md:py-24">
	<header class="p-8">
		<h1 class="mb-3 text-3xl">Ønskeliste</h1>
		<p>Ting jeg ønsker meg til bursdag, jul og andre anledninger.</p>
	</header>

	{#if user.current}
		<CreateNewItemForm />
	{/if}

	<main class="space-y-4 px-8 py-2">
		<div class="flex flex-col gap-4">
			{#each data.whislist as item (item.id)}
				{@const href = item.link ?? undefined}
				<div class="border-divide-soft flex flex-col gap-3 border p-4">
					<h2 class="text-lg font-medium">{item.title}</h2>
					<div class="mt-auto flex items-center justify-between gap-2">
						{#if item.link}
							<a
								{href}
								target="_blank"
								rel="noopener noreferrer external"
								class="text-link hover:underline"
							>
								[Lenke]
							</a>
						{:else}
							<div></div>
						{/if}
						{#if user.current}
							<form {...deleteItem.for(item.id)} class="inline">
								<input {...deleteItem.fields.id.as('hidden', item.id)} />
								<button type="submit" class="text-red-700 transition-colors hover:text-red-400"
									>[x]</button
								>
							</form>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</main>
</div>
