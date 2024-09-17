<script lang="ts">
	import CV from '$lib/components/cv/CV.svelte';
	import Download from '$lib/components/cv/internals/Download.svelte';
	import Gradients from '$lib/components/Gradients.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>CV</title>
</svelte:head>

<Gradients />
<Download />
<CV cv={data.cv} lang={data.lang} />
