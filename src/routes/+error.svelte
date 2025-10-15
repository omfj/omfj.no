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

<main class="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
	<p class="text-foreground-muted text-sm font-medium tracking-wide uppercase">{page.status}</p>
	<h1 class="mt-3 text-3xl font-semibold">{title}</h1>
	<p class="text-foreground-muted mt-2 max-w-md">{description}</p>
	<a class="text-link mt-8 hover:underline" href={resolve('/')}>Til forsiden</a>
</main>
