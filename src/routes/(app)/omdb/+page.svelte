<script lang="ts">
	import { getUser } from '$lib/contexts/user';
	import { enhance } from '$app/forms';

	let user = getUser();
	let { data } = $props();
	let isPending = $state(false);
	let title = $state('');
	let imdbId = $state('');
	let rating = $state('');

	function resetForm() {
		title = '';
		imdbId = '';
		rating = '';
	}
</script>

<svelte:head>
	<title>OMDb</title>
</svelte:head>

<div class="mx-auto w-full max-w-xl py-12 transition-all md:py-24">
	<header class="p-8">
		<h1 class="mb-3 text-3xl">OMDb</h1>
		<p>A list of movies and series I have watched and my ratings.</p>
	</header>

	{#if user.current}
		<form
			method="post"
			class="m-8 flex flex-col gap-4 border-2 p-4"
			use:enhance={() => {
				isPending = true;

				return async ({ update, result }) => {
					isPending = false;

					if (result.type === 'success') {
						resetForm();
					}

					await update();
				};
			}}
		>
			<label>
				<h3 class="text-base font-semibold">Tittel</h3>
				<input
					bind:value={title}
					name="title"
					placeholder="Tittel på filmen"
					class="focus:border-link w-full border-b-2 p-1 outline-0"
					type="text"
				/>
			</label>

			<label>
				<h3 class="text-base font-semibold">IMDb-ID</h3>
				<input
					bind:value={imdbId}
					name="id"
					placeholder="tt1234567"
					class="focus:border-link w-full border-b-2 p-1 outline-0"
					type="text"
				/>
			</label>

			<label>
				<h3 class="text-base font-semibold">Vurdering</h3>
				<input
					bind:value={rating}
					name="rating"
					placeholder="1-100"
					class="focus:border-link w-full border-b-2 p-1 outline-0"
					type="number"
					min="1"
					max="100"
				/>
			</label>

			<button
				class="mr-auto w-fit px-1 text-left hover:cursor-pointer hover:underline"
				type="submit"
				disabled={isPending}
			>
				{#if isPending}
					Lagrer...
				{:else}
					Legg til film
				{/if}
			</button>
		</form>
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
				{#each data.films as film (film.id)}
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
