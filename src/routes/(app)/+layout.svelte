<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<div class="gradient-1"></div>

	<div class="flex-1">
		{@render children()}
	</div>

	<Footer />
</div>

<style>
	.gradient-1 {
		z-index: -1;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: linear-gradient(140deg, #a2cffe 0%, rgba(255, 255, 255, 0) 35%);
	}
</style>
