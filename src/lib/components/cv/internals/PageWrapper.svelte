<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement> & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<div class={cn('my-10 rounded bg-white shadow mx-auto border p-10 md:p-20', className)} {...props}>
	{@render children()}
</div>
