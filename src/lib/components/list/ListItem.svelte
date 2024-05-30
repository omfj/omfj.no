<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		href: string;
		children: Snippet;
	};

	let { href, children }: Props = $props();
</script>

<li class="py-1">
	<a
		{href}
		class="flex items-center gap-2 p-2 hover:bg-black-soft hover:text-white transition-colors duration-150"
		>{@render children()}</a
	>
</li>
