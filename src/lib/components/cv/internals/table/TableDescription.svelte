<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLParagraphElement> & {
		children: Snippet;
	};

	let { children, ...props }: Props = $props();
</script>

<p {...props}>
	{@render children()}
</p>
