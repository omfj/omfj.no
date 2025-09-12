<script lang="ts">
	const { data } = $props();
	let meta = $derived(data.meta);
	let content = $derived(data.content);
</script>

<svelte:head>
	<title>{meta.title}</title>
</svelte:head>

<article class="prose-sm mx-auto my-10 max-w-2xl rounded-lg border bg-white p-5 shadow-lg">
	<h1 class="mb-5 text-3xl font-bold">{meta.title}</h1>

	{@html content}
</article>
