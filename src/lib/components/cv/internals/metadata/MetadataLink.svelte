<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = HTMLAnchorAttributes & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<a
	target="_blank"
	class={cn('underline transition-colors hover:text-blue-500', className)}
	{...props}
>
	{@render children()}
</a>
