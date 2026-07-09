<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const rawUrl = $derived(`/files/${data.file.id}/raw`);

	const isImage = $derived(data.file.contentType.startsWith('image/'));
	const isVideo = $derived(data.file.contentType.startsWith('video/'));
	const isAudio = $derived(data.file.contentType.startsWith('audio/'));
	const isPdf = $derived(data.file.contentType === 'application/pdf');
	const isText = $derived(
		data.file.contentType.startsWith('text/') || data.file.contentType === 'application/json'
	);

	function formatBytes(bytes: number) {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
		return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
	}
</script>

<svelte:head>
	<title>{data.file.id} — omfj.no</title>
</svelte:head>

<main>
	<a href={resolve('/files')} class="text-foreground-muted hover:underline">&lt;- Back</a>

	<br />
	<br />

	<h1 class="truncate"># {data.file.id}</h1>

	<br />

	<dl class="text-foreground-muted text-sm">
		<div class="flex gap-1">
			<dt>- Name:</dt>
			<dd>{data.file.originalName}</dd>
		</div>
		<div class="flex gap-1">
			<dt>- Type:</dt>
			<dd>{data.file.contentType}</dd>
		</div>
		<div class="flex gap-1">
			<dt>- Size:</dt>
			<dd>{formatBytes(data.file.size)}</dd>
		</div>
		<div class="flex gap-1">
			<dt>- Visibility:</dt>
			<dd>{data.file.isPublic ? 'Public' : 'Private'}</dd>
		</div>
		<div class="flex gap-1">
			<dt>- Uploaded:</dt>
			<dd>
				<time datetime={new Date(data.file.uploadedAt).toISOString()}>
					{new Date(data.file.uploadedAt).toLocaleDateString()}
				</time>
			</dd>
		</div>
	</dl>

	<br />

	<div class="flex gap-4">
		<a href={resolve(`/files/${data.file.id}/raw?download=1`)} class="text-link underline">
			Download
		</a>

		{#if data.isLoggedIn}
			<form method="post" action="?/delete" use:enhance>
				<button
					type="submit"
					onclick={(e) => {
						if (!confirm('Delete this file?')) e.preventDefault();
					}}
					class="text-red-700 transition-colors hover:text-red-400 hover:underline"
				>
					Delete
				</button>
			</form>
		{/if}
	</div>

	{#if isImage}
		<br />
		<img src={rawUrl} alt={data.file.originalName} class="max-w-full" />
	{:else if isVideo}
		<br />
		<!-- svelte-ignore a11y_media_has_caption -->
		<video src={rawUrl} controls class="max-w-full"></video>
	{:else if isAudio}
		<br />
		<audio src={rawUrl} controls class="w-full max-w-md"></audio>
	{:else if isPdf}
		<br />
		<iframe src={rawUrl} title={data.file.originalName} class="h-150 w-full border-0"></iframe>
	{:else if isText}
		<br />
		{#await fetch(rawUrl).then((r) => r.text())}
			<p class="text-foreground-muted text-sm">Loading preview…</p>
		{:then content}
			<pre class="bg-background-muted overflow-auto p-4 text-sm">{content}</pre>
		{:catch}
			<p class="text-foreground-muted text-sm">Could not load preview.</p>
		{/await}
	{/if}
</main>
