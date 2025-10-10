<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLParagraphElement> & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<p class={cn('text-xs', className)} {...props}>
	{@render children()}
</p>
