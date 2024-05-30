<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLLiAttributes } from 'svelte/elements';

	type Props = HTMLLiAttributes & {
		children: Snippet;
	};

	let { children, ...props }: Props = $props();
</script>

<li {...props}>
	{@render children()}
</li>
