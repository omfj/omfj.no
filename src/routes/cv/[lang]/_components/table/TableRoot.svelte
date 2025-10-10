<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLUListElement> & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<ul class={cn('flex flex-col gap-4 text-xs', className)} {...props}>
	{@render children()}
</ul>
