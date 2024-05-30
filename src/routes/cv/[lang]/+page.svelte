<script lang="ts">
	import CV from '$lib/components/cv/CV.svelte';
	import Download from '$lib/components/cv/internals/Download.svelte';
	import Gradients from '$lib/components/Gradients.svelte';
	import { cvEn } from '$lib/data';
</script>

<Gradients />
<Download />
<CV cv={cvEn} />
