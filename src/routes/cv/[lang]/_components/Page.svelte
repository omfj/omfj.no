<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement> & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<div class={cn('max-w-screen-a4 flex w-full flex-col gap-10 font-sans', className)} {...props}>
	{@render children()}
</div>
