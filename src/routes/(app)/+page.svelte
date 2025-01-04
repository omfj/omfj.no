<script lang="ts">
	import { List, ListDescription, ListItem, ListTitle } from '$lib/components/list';
</script>

<div class="gradient-1"></div>

<div class="py-12 md:py-24 transition-all">
	<header class="max-w-xl mx-auto p-8">
		<h1 class="text-3xl">omfj.no</h1>
	</header>

	<main class="max-w-xl mx-auto p-8 mb-10">
		<div class="space-y-10 z-50">
			<div>
				<p>
					My name is Ole Magnus. I am 22 year old software developer from Norway. Currently residing
					in Bergen, and taking a masters in Software Development at the University of Bergen and
					Western Norway University of Applied Sciences.
				</p>
			</div>

			<div>Current interests include Rust, Signals, Deno and Cloudflare Workers.</div>

			<div>
				<h2 class="font-medium">Want to have a look at my resumè?</h2>

				<p>
					You can find the <a class="underline hover:text-blue-500 transition-colors" href="/cv/en"
						>web version here</a
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
					<ListItem href="https://bsky.app/profile/omfj.no">
						<span>Bluesky</span>
						<span class="text-sm">(@omfj.no)</span>
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
