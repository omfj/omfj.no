<script lang="ts">
	export let status: number;
	export let error: Error & { message?: string };

	const isNotFound = status === 404;

	const title = isNotFound ? 'Page not found' : 'Something went wrong';
	const description = isNotFound
		? "Sorry, we can't find the page you're looking for."
		: (error?.message ?? 'Sorry, something went wrong.');
</script>

<svelte:head>
	<title>{status} – {title}</title>
</svelte:head>

<main class="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
	<p class="text-foreground-muted text-sm font-medium tracking-wide uppercase">{status}</p>
	<h1 class="mt-3 text-3xl font-semibold">{title}</h1>
	<p class="text-foreground-muted mt-2 max-w-md">{description}</p>
	<a class="text-link mt-8 hover:underline" href="/">Til forsiden</a>
</main>
