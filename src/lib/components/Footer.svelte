<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<footer class="mx-auto p-4">
	<ul class="flex gap-4 text-center text-xs">
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
