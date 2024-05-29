<script lang="ts">
	import '../app.css';
	import '../fonts.css';

	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen">
	{@render children()}
</div>
