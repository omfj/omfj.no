<script lang="ts">
	import '../app.css';
	import '../fonts.css';
	import { setUserContext } from '$lib/contexts/user';
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';
	import { ThemeState } from '$lib/states/theme.svelte';

	let theme = new ThemeState();

	const { data, children } = $props();

	setUserContext(() => data.user);
</script>

<div class="mx-auto flex min-h-screen max-w-xl flex-col p-1">
	<header class="flex items-center justify-between gap-5 pt-4 pb-10">
		<a class="text-xl" href={resolve('/')}>omfj</a>

		<div class="flex items-center gap-5">
			<button onclick={() => theme.next()} class="text-foreground-muted hover:underline">
				<span class="dark:hidden">Light</span>
				<span class="hidden dark:block">Dark</span>
			</button>

			{#if data.user}
				<form class="contents" method="post" action={resolve('/auth/sign-out')} use:enhance>
					<button class="text-foreground-muted hover:underline">Sign out</button>
				</form>
			{:else}
				<a class="text-foreground-muted hover:underline" href={resolve('/auth/github')}>Sign in</a>
			{/if}
		</div>
	</header>

	{@render children()}

	<footer class="mt-auto p-4 font-mono text-[10px]">
		<nav aria-label="Pages">
			<ul class="flex flex-wrap justify-center gap-x-4 gap-y-1 text-center">
				<li>
					<a class="link link-muted" href="https://start.omfj.no">start.omfj.no</a>
				</li>
				<li>
					<a class="link link-muted" href={resolve('/habits')}>Habit Tracker</a>
				</li>
				<li>
					<a class="link link-muted" href={resolve('/omdb')}>OMDb</a>
				</li>
				<li>
					<a class="link link-muted" href={resolve('/links')}>Links</a>
				</li>
				<li>
					<a class="link link-muted" href={resolve('/thoughts')}>Thoughts</a>
				</li>
			</ul>
		</nav>
	</footer>
</div>
