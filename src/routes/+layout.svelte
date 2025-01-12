<script lang="ts">
	import '../app.css';
	import '../fonts.css';
	import { setUserContext } from '$lib/contexts/user';
	import { writable } from 'svelte/store';

	const { data, children } = $props();

	const user = writable(data.user);
	$effect.pre(() => {
		user.set(data.user);
	});
	setUserContext(user);
</script>

<div class="flex min-h-screen flex-col">
	{@render children()}
</div>
