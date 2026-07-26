<script lang="ts">
	import '../app.css';
	import '../fonts.css';
	import { setUserContext } from '$lib/contexts/user';
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';
	import { ThemeState } from '$lib/states/theme.svelte';

	let theme = new ThemeState();

	const { data, children } = $props();

	let user = $state({ current: data.user });
	$effect.pre(() => {
		user.current = data.user;
	});
	setUserContext(user);
</script>

<header class="fixed w-full items-center justify-between p-8">
	<a href={resolve('/')} class="text-2xl">omfj</a>

	<div class="flex items-center gap-5">
		<button onclick={() => theme.next()} class="text-foreground-muted hover:underline">
			<span class="dark:hidden">Light</span>
			<span class="hidden dark:block">Dark</span>
		</button>

		{#if user.current}
			<form class="contents" method="post" action={resolve('/auth/sign-out')} use:enhance>
				<button class="text-foreground-muted hover:underline">Sign out</button>
			</form>
		{:else}
			<a class="text-foreground-muted hover:underline" href={resolve('/auth/github')}>Sign in</a>
		{/if}
	</div>
</header>

<div class="flex min-h-screen max-w-xl flex-col px-8 pt-32 pb-8">
	{@render children()}
</div>

<footer class="fixed bottom-0 w-full p-4 font-mono text-[10px]">
	<nav aria-label="Pages">
		<ul class="flex flex-wrap justify-center gap-x-4 gap-y-1 text-center">
			<li>
				<a class="hover:text-primary" href="https://start.omfj.no">start.omfj.no</a>
			</li>
			<li>
				<a class="hover:text-primary" href={resolve('/habits')}>Habit Tracker</a>
			</li>
			<li>
				<a class="hover:text-primary" href={resolve('/omdb')}>OMDb</a>
			</li>
			<li>
				<a class="hover:text-primary" href={resolve('/files')}>Files</a>
			</li>
			<li>
				<a class="hover:text-primary" href={resolve('/links')}>Links</a>
			</li>
			<li>
				<a class="hover:text-primary" href={resolve('/thoughts')}>Thoughts</a>
			</li>
		</ul>
	</nav>
</footer>
