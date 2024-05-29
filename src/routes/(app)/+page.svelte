<script lang="ts">
	import List from '$lib/components/List.svelte';
	import ListTitle from '$lib/components/ListTitle.svelte';
	import ListDescription from '$lib/components/ListDescription.svelte';
	import ListItem from '$lib/components/ListItem.svelte';

	const yearsOld = (
		(Date.now() - new Date(2002, 12, 17).getTime()) /
		(1000 * 60 * 60 * 24 * 365)
	).toFixed(1);
</script>

<div class="gradient-1"></div>

<div class="py-12 md:py-24 transition-all">
	<header class="max-w-xl mx-auto p-8">
		<h1 class="text-3xl">omfj</h1>
	</header>

	<main class="max-w-xl mx-auto p-8 mb-10">
		<div class="space-y-10 z-50">
			<div>
				<p>
					My name is Ole Magnus. I am {yearsOld} year old software developer from Norway. Currently residing
					in Bergen, and studying Computer Technology at the University of Bergen.
				</p>
			</div>

			<div>Current interests include web development, SQLite and Hono.</div>

			<div>
				<h2 class="font-medium">Want to have a look at my resumè?</h2>

				<p>
					You can find it <a class="underline hover:text-blue-500 transition-colors" href="/cv/en"
						>here</a
					>.
				</p>
			</div>

			<div>
				<ListTitle>Socials</ListTitle>
				<ListDescription>Ways to get in touch with me.</ListDescription>
				<List>
					<ListItem href="https://github.com/omfj">
						<span>GitHub</span>
						<span class="text-sm">(@omfj)</span>
					</ListItem>
					<ListItem href="https://www.instagram.com/lordolem">
						<span>Instagram</span>
						<span class="text-sm">(@lordolem)</span>
					</ListItem>
					<ListItem href="https://www.linkedin.com/in/omfj">
						<span>LinkedIn</span>
						<span class="text-sm">(in/omfj)</span>
					</ListItem>
					<ListItem href="https://www.twitter.com/omfj_">
						<span>X</span>
						<span class="text-sm">(@omfj_)</span>
					</ListItem>
				</List>
			</div>
		</div>
	</main>
</div>

<style>
	.gradient-1 {
		z-index: -1;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: linear-gradient(140deg, #a2cffe 0%, rgba(255, 255, 255, 0) 35%);
	}
</style>
