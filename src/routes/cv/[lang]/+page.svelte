<script lang="ts">
	import CV from './_components/CV.svelte';
	import Download from './_components/Download.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>CV</title>
</svelte:head>

<Download />
<CV cv={data.cv} lang={data.lang} />
