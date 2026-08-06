<script lang="ts">
	import { getUser } from '$lib/contexts/user';
	import CreateMovieForm from './_components/CreateMovieForm.svelte';

	let user = getUser();
	let { data } = $props();
	let isFormOpen = $state(false);
</script>

<svelte:head>
	<title>OMDb</title>
</svelte:head>

<main>
	<h1><span class="text-foreground-muted">#</span> OMDb</h1>

	<br />

	<p class="max-w-lg">A list of movies and series I have watched and my ratings.</p>

	<br />

	{#if user()}
		<button
			onclick={() => (isFormOpen = !isFormOpen)}
			aria-expanded={isFormOpen}
			class="text-foreground-muted hover:underline"
		>
			{isFormOpen ? 'Hide form' : 'Add a movie'}
		</button>

		{#if isFormOpen}
			<CreateMovieForm />
		{/if}

		<br />
		<br />
	{/if}

	<table class="w-full max-w-md">
		<thead>
			<tr class="border-divide-soft text-foreground-muted border-b text-left">
				<th scope="col" class="py-1 pr-4 font-normal">Title</th>
				<th scope="col" class="w-24 py-1 font-normal">Rating</th>
			</tr>
		</thead>
		<tbody>
			{#each data.films as film (film.id)}
				<tr class="align-top">
					<td class="py-1 pr-4">
						<a class="link" href="https://www.imdb.com/title/{film.id}/">{film.title}</a>
					</td>
					<td class="py-1">{film.rating}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
