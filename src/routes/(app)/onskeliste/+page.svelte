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

	<main class="px-8 py-2">
		<ul class="space-y-3">
			{#each data.whislist as item (item.id)}
				<li class="flex items-center gap-2">
					<div class="min-w-0 flex-1">
						<div class="truncate">
							->
							{#if item.link}
								<a
									href={item.link}
									target="_blank"
									rel="noopener noreferrer external"
									class="text-link hover:underline"
								>
									{item.title}
								</a>
							{:else}
								{item.title}
							{/if}
						</div>

						{#if item.description}
							<div class="text-muted-foreground text-sm">
								{#each item.description.split('\n\n') as paragraph, i (i)}
									<p>{paragraph}</p>
								{/each}
							</div>
						{/if}
					</div>

					{#if user.current}
						<form {...deleteItem.for(item.id)} class="ml-auto inline shrink-0">
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
</div>
