<script lang="ts">
	import { List, ListItem } from '$lib/components/list';
</script>

<svelte:head>
	<title>omfj.no</title>
</svelte:head>

<div class="py-12 transition-all md:py-24">
	<header class="mx-auto max-w-xl p-8">
		<h1 class="text-3xl">omfj.no</h1>
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
				You can find the <a class="underline transition-colors hover:text-blue-500" href="/cv/en"
					>web version here</a
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
					<a href="https://instagram.com/lordolem" class="h-full w-full p-2">
						<span>> Instagram</span>
						<span class="text-sm">(@lordolem)</span>
					</a>
				</ListItem>
				<ListItem class="gap-2">
					<a href="https://www.linkedin.com/in/omfj" class="h-full w-full p-2">
						<span>> LinkedIn</span>
						<span class="text-sm">(in/omfj)</span>
					</a>
				</ListItem>
				<ListItem class="gap-2">
					<a href="https://bsky.app/profile/omfj.no" class="h-full w-full p-2">
						<span>> Bluesky</span>
						<span class="text-sm">(@omfj.no)</span>
					</a>
				</ListItem>
			</List>
		</section>

		<section>
			<h2 class="mb-3 text-lg font-medium">Pages</h2>

			<ul class="flex gap-x-2 gap-y-4">
				<li>
					<a class="underline transition-colors hover:text-blue-500" href="/habits">Habits</a>
				</li>
			</ul>
		</section>
	</main>
</div>
