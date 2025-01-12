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
			'flex transition-colors duration-150 hover:bg-black-soft hover:text-white',
			className
		)}
	>
		{@render children()}
	</span>
</li>
