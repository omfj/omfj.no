<script lang="ts">
	import { cn } from '$lib/cn';
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
