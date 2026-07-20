<script lang="ts">
	import { resolve } from '$app/paths';
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

<main>
	<h1><span class="text-foreground-muted">#</span> Files</h1>

	<br />

	<p>Files I have uploaded.</p>

	<br />

	{#if data.isLoggedIn}
		<a href={resolve('/files/upload')} class="text-foreground-muted hover:underline">Upload</a>

		<br />
		<br />
	{/if}

	{#if data.files.length === 0}
		<p class="text-foreground-muted">No files yet.</p>
	{:else}
		<ul class="space-y-2">
			{#each data.files as file (file.id)}
				<li>
					-
					<a href={resolve(`/files/${file.id}`)} class="text-link underline">{file.id}</a>
					{#if !file.isPublic}
						<span class="text-foreground-muted text-xs">[private]</span>
					{/if}
					<span class="text-foreground-muted text-sm">({formatBytes(file.size)})</span>
				</li>
			{/each}
		</ul>
	{/if}
</main>
