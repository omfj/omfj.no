<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<ul class="divide-divide-soft divide-y divide-dashed">
	{@render children()}
</ul>
