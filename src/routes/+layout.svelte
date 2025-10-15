<script lang="ts">
	import '../app.css';
	import '../fonts.css';
	import { setUserContext } from '$lib/contexts/user';

	const { data, children } = $props();

	let user = $state({ current: data.user });
	$effect.pre(() => {
		user.current = data.user;
	});
	setUserContext(user);
</script>

<div class="flex min-h-screen flex-col">
	{@render children()}
</div>
