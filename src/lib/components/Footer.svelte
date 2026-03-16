<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<footer class="scrollbar-hide w-full overflow-x-auto p-4 font-mono" style="font-size: 10px;">
	<!-- Retro divider -->
	<div class="text-foreground-muted mb-3 text-center">~ * ~ * ~</div>

	<ul class="flex justify-center gap-3 text-center whitespace-nowrap">
		<li>
			<a class="hover:text-primary" href="https://start.omfj.no">[* start.omfj.no]</a>
		</li>
		<li>
			<a class="hover:text-primary" href={resolve('/habits')}>[# Habit Tracker]</a>
		</li>
		<li>
			<a class="hover:text-primary" href={resolve('/omdb')}>[@ OMDb]</a>
		</li>
	</ul>

	<div class="text-foreground-muted mt-3 text-center">You are visitor #1,337</div>
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
