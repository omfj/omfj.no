<script lang="ts">
	import { resolve } from '$app/paths';

	const { data } = $props();
	let meta = $derived(data.meta);
	let content = $derived(data.content);

	let formattedDate = $derived(
		new Date(meta.date).toLocaleDateString('en-GB', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);
</script>

<svelte:head>
	<title>{meta.title}</title>
</svelte:head>

<article class="prose prose-sm dark:prose-invert mx-auto my-10 max-w-3xl p-5">
	<a href={resolve('/')} class="text-foreground-muted mb-5 inline-block text-sm hover:underline">
		← Back to home
	</a>
	<h1 class="mb-2 text-3xl font-bold">{meta.title}</h1>
	<p class="text-foreground-muted mb-5 text-sm">{formattedDate}</p>

	{@html content}
</article>
