<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLHeadingElement> & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<h2 class={cn('mb-2 text-lg font-semibold', className)} {...props}>
	{@render children()}
</h2>
