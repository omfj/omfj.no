<script lang="ts">
	import { resolve, asset } from '$app/paths';
	import { enhance } from '$app/forms';
	import { List, ListItem } from '$lib/components/list';
	import { getUser } from '$lib/contexts/user';
	import { ThemeState } from '$lib/states/theme.svelte';

	let user = getUser();
	let theme = new ThemeState();
</script>

<svelte:head>
	<title>omfj.no</title>
</svelte:head>

<div class="py-12 transition-all md:py-24">
	<header class="mx-auto flex max-w-xl items-center justify-between p-8">
		<h1 class="text-3xl">omfj.no</h1>

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

	<main class="mx-auto mb-10 max-w-xl space-y-10 px-8 py-2">
		<section>
			<p>
				My name is Ole Magnus. I am 22 year old software developer from Norway. Currently residing
				in Bergen, and taking a masters in Software Development at the University of Bergen and
				Western Norway University of Applied Sciences.
			</p>
		</section>

		<div>Current interests include Rust, Signals, Deno and Cloudflare Workers.</div>

		<section>
			<h2 class="mb-3 text-lg font-medium">Want to have a look at my resumè?</h2>

			<p>
				You can download the PDF version <a
					href={asset('/assets/cv.pdf')}
					class="underline transition-colors hover:text-blue-500">here</a
				>.
			</p>
		</section>

		<section>
			<h2 class="mb-3 text-lg font-medium">Socials</h2>

			<List>
				<ListItem class="gap-2">
					<a href="https://github.com/omfj" class="h-full w-full p-2">
						<span>> GitHub</span>
						<span class="text-sm">(@omfj)</span>
					</a>
				</ListItem>
				<ListItem class="gap-2">
					<a href="https://www.linkedin.com/in/omfj" class="h-full w-full p-2">
						<span>> LinkedIn</span>
						<span class="text-sm">(in/omfj)</span>
					</a>
				</ListItem>
				<ListItem class="gap-2">
					<a href="mailto:me@omfj.no" class="h-full w-full p-2">
						<span>> E-mail</span>
						<span class="text-sm">(@omfj.no)</span>
					</a>
				</ListItem>
			</List>
		</section>
	</main>
</div>
