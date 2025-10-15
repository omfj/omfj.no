<script lang="ts">
	import { getUser } from '$lib/contexts/user';
	import CreateNewItemForm from './_components/CreateNewItemForm.svelte';
	import { deleteItem } from './data.remote';

	let user = getUser();
	let { data } = $props();

	let rowGridClasses = $derived(
		user.current ? 'grid grid-cols-[5.5rem_1fr_auto]' : 'grid grid-cols-[5.5rem_1fr]'
	);
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

	<main class="space-y-10 px-8 py-2">
		<table class="w-full">
			<thead class="border-divide-soft border-b">
				<tr class={`text-foreground-muted text-sm font-medium uppercase ${rowGridClasses}`}>
					<th class="p-1 text-left">Lenke</th>
					<th class="p-1 text-left">Tittel</th>
					{#if user.current}
						<th class="p-1 text-right">Handling</th>
					{/if}
				</tr>
			</thead>
			<tbody class="flex flex-col divide-y">
				{#each data.whislist as item (item.id)}
					{@const href = item.link ?? undefined}
					<tr class={rowGridClasses}>
						<td class="p-1 text-left">
							{#if item.link}
								<a
									{href}
									target="_blank"
									rel="noopener noreferrer external"
									class="text-link hover:underline">[Lenke]</a
								>
							{/if}
						</td>
						<td
							class="overflow-hidden p-1 text-left text-ellipsis whitespace-nowrap"
							title={item.title}
						>
							{item.title}
						</td>
						{#if user.current}
							<td class="p-1 text-right">
								<form {...deleteItem.for(item.id)} class="inline">
									<input {...deleteItem.fields.id.as('hidden', item.id)} />
									<button type="submit" class="text-red-600 hover:underline">[Slett]</button>
								</form>
							</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</main>
</div>
