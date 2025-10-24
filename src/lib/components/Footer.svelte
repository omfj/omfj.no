<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<footer class="scrollbar-hide w-full overflow-x-auto p-4">
	<ul class="flex justify-center gap-4 text-center text-xs whitespace-nowrap">
		<li>
			<a class="text-foreground-muted hover:text-link" href="https://start.omfj.no"
				>[start.omfj.no]</a
			>
		</li>
		<li>
			<a class="text-foreground-muted hover:text-link" href={resolve('/habits')}>[Habit Tracker]</a>
		</li>
		<li>
			<a class="text-foreground-muted hover:text-link" href={resolve('/omdb')}>[OMDb]</a>
		</li>
	</ul>
</footer>

<style>
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
