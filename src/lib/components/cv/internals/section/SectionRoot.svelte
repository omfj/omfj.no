<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement> & {
		children: Snippet;
	};

	let { children, ...props }: Props = $props();
</script>

<div {...props}>
	{@render children()}
</div>
