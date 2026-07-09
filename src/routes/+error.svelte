<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	const isNotFound = $derived(page.status === 404);
	const title = $derived(isNotFound ? 'Page not found' : 'Something went wrong');
	const description = $derived(
		isNotFound
			? "Sorry, we can't find the page you're looking for."
			: (page.error?.message ?? 'Sorry, something went wrong.')
	);
</script>

<svelte:head>
	<title>{page.status} – {title}</title>
</svelte:head>

<main>
	<h1># {page.status} – {title}</h1>

	<br />

	<p class="text-foreground-muted max-w-lg">{description}</p>

	<br />

	<a class="text-link underline" href={resolve('/')}>&lt;- Back to home</a>
</main>
