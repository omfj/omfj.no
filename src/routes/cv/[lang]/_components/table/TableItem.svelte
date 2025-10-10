<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLLiAttributes } from 'svelte/elements';

	type Props = HTMLLiAttributes & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<li class={cn('flex flex-col gap-1 md:flex-row md:gap-4', className)} {...props}>
	{@render children()}
</li>
