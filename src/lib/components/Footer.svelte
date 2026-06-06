<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<footer class="scrollbar-hide w-full overflow-x-auto p-4 font-mono" style="font-size: 10px;">
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
		<li>
			<a class="hover:text-primary" href={resolve('/files')}>[^ Files]</a>
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
