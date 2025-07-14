<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		children: Snippet;
	};

	let { class: className, children }: Props = $props();
</script>

<li class="py-1">
	<span
		class={cn(
			'hover:bg-list-hover-background hover:text-list-hover-foreground flex transition-colors duration-150',
			className
		)}
	>
		{@render children()}
	</span>
</li>
