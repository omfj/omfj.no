<script lang="ts">
	let { children } = $props();
</script>

<div>
	<div class="flex-1">
		{@render children()}
	</div>
</div>
