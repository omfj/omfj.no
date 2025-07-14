<script lang="ts">
	import { getUser } from '$lib/contexts/user';
	import { enhance } from '$app/forms';

	let user = getUser();
	let { data } = $props();
</script>

<svelte:head>
	<title>OMDb</title>
</svelte:head>

<div class="mx-auto w-full max-w-xl py-12 transition-all md:py-24">
	<header class="p-8">
		<h1 class="mb-3 text-3xl">OMDb</h1>
		<p>A list of moveis and series I have watched and my ratings.</p>
	</header>

	{#if $user}
		<div class="p-8">
			<form method="post" use:enhance class="flex flex-col gap-2">
				<div>
					<label>
						<span class="mb-1 block text-sm">Title</span>
						<input
							name="title"
							placeholder="The film title..."
							class="bg-input w-full rounded border px-2 py-1 placeholder:text-sm"
							type="text"
						/>
					</label>
				</div>
				<div class="flex items-center gap-2">
					<label class="w-full">
						<span class="mb-1 block text-sm">IMDb ID</span>
						<input
							name="id"
							placeholder="IMDb ID"
							class="bg-input w-full rounded border p-1 px-2 py-1 placeholder:text-sm"
							type="text"
						/>
					</label>
					<label class="w-full max-w-[100px]">
						<span class="mb-1 block text-sm">Rating</span>
						<input
							name="rating"
							placeholder="1-100"
							class="bg-input w-full rounded border p-1 px-2 py-1 placeholder:text-sm"
							type="number"
							min="1"
							max="100"
						/>
					</label>
				</div>
				<button
					type="submit"
					class="bg-primary hover:bg-primary-hover flex h-8 w-full items-center justify-center rounded px-4 py-2 text-sm text-white transition"
				>
					Add film
				</button>
			</form>
		</div>
	{/if}

	<main class="space-y-10 px-8 py-2">
		<table class="w-full">
			<thead class="border-divide-soft border-b">
				<tr class="text-foreground-muted grid grid-cols-8 text-sm font-medium uppercase">
					<th class="col-span-6 p-1 text-left">Title</th>
					<th class="col-span-2 p-1 text-left">Rating</th>
				</tr>
			</thead>
			<tbody class="flex flex-col divide-y">
				{#each data.films as film}
					<tr class="grid grid-cols-8">
						<td class="col-span-6 p-1 text-left">
							<a class="hover:underline" href="https://www.imdb.com/title/{film.id}/"
								>{film.title}</a
							>
						</td>
						<td class="col-span-2 p-1 text-left">{film.rating}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</main>
</div>
