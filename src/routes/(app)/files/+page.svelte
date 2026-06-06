<script lang="ts">
	import { resolve } from '$app/paths';
	import { List, ListItem } from '$lib/components/list';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatBytes(bytes: number) {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
		return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
	}
</script>

<svelte:head>
	<title>Files — omfj.no</title>
</svelte:head>

<div class="py-12 md:py-24">
	<div class="mx-auto max-w-xl px-8">
		<div class="mb-6 flex items-center justify-between">
			<h1 class="text-2xl">Files</h1>
			{#if data.isLoggedIn}
				<a href={resolve('/files/upload')} class="text-foreground-muted hover:underline"
					>[ Upload ]</a
				>
			{/if}
		</div>

		{#if data.files.length === 0}
			<p class="text-foreground-muted">No files yet.</p>
		{:else}
			<List>
				{#each data.files as file (file.id)}
					<ListItem>
						<a
							href={resolve(`/files/${file.id}`)}
							class="flex h-full w-full items-center justify-between p-2"
						>
							<span class="flex items-center gap-2">
								<span>> {file.id}</span>
								{#if !file.isPublic}
									<span class="text-foreground-muted text-xs">[private]</span>
								{/if}
							</span>
							<span class="text-foreground-muted text-sm">{formatBytes(file.size)}</span>
						</a>
					</ListItem>
				{/each}
			</List>
		{/if}
	</div>
</div>
