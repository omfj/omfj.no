<script lang="ts">
	import { getUser } from '$lib/contexts/user';

	let user = getUser();
</script>

<svelte:head>
	<title>OMDb</title>
</svelte:head>

<div class="mx-auto w-full max-w-xl py-12 transition-all md:py-24">
	<header class="p-8">
		<h1 class="mb-3 text-3xl">OMDb</h1>
		<p>A list of moveis and series I have watched and my ratings.</p>
	</header>

	{#if $user}
		<div class="p-8">
			<form class="flex flex-col gap-2">
				<div>
					<label>
						<span class="mb-1 block text-sm">Title</span>
						<input class="w-full rounded border bg-white p-1" type="text" />
					</label>
				</div>
				<div class="flex items-center gap-2">
					<label class="w-full">
						<span class="mb-1 block text-sm">IMDb ID</span>
						<input class="w-full rounded border bg-white p-1" type="text" />
					</label>
					<label class="w-full max-w-[100px]">
						<span class="mb-1 block text-sm">Rating</span>
						<input class="w-full rounded border bg-white p-1" type="number" min="1" max="100" />
					</label>
				</div>
			</form>
		</div>
	{/if}

	<main class="space-y-10 px-8 py-2">
		<table class="w-full">
			<thead class="border-b border-black-soft">
				<tr class="grid grid-cols-8 text-sm font-medium uppercase text-gray-800">
					<th class="col-span-6 p-1 text-left">Title</th>
					<th class="col-span-2 p-1 text-left">Rating</th>
				</tr>
			</thead>
			<tbody class="flex flex-col divide-y">
				<tr class="grid grid-cols-8">
					<td class="col-span-6 p-1 text-left">
						<a class="hover:underline" href="https://www.imdb.com/title/tt0773262/">Dexter</a>
					</td>
					<td class="col-span-2 p-1 text-left">87</td>
				</tr>
			</tbody>
		</table>
	</main>
</div>
