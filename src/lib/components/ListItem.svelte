<script lang="ts">
	export const { href } = $props<{ href: string }>();
</script>

<li class="py-1">
	<a {href} class="flex items-center gap-2 py-2 px-1 hover:bg-black-soft hover:text-white"
		><slot /></a
	>
</li>
