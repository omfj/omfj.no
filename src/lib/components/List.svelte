<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<ul class="divide-y divide-dashed divide-black-soft">
	{@render children()}
</ul>
