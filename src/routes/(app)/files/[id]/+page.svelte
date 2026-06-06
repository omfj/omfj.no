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

<div class="py-12 md:py-24">
	<div class="mx-auto max-w-xl px-8">
		<div class="mb-6 flex items-center justify-between">
			<h1 class="truncate text-2xl">{data.file.id}</h1>
			<a href={resolve('/files')} class="text-foreground-muted ml-4 shrink-0 hover:underline"
				>[ Back ]</a
			>
		</div>

		<div class="text-foreground-muted mb-6 space-y-1 text-sm">
			<p>Name: {data.file.originalName}</p>
			<p>Type: {data.file.contentType}</p>
			<p>Size: {formatBytes(data.file.size)}</p>
			<p>Visibility: {data.file.isPublic ? 'Public' : 'Private'}</p>
			<p>Uploaded: {new Date(data.file.uploadedAt).toLocaleDateString()}</p>
		</div>

		<div class="mb-8 flex gap-3">
			<a
				href={resolve(`/files/${data.file.id}/raw?download=1`)}
				class="border-foreground-muted inline-block border px-4 py-2 text-sm hover:underline"
			>
				Download
			</a>

			{#if data.isLoggedIn}
				<form method="post" action="?/delete" use:enhance>
					<button
						type="submit"
						onclick={(e) => {
							if (!confirm('Delete this file?')) e.preventDefault();
						}}
						class="border-foreground-muted border px-4 py-2 text-sm hover:underline"
					>
						Delete
					</button>
				</form>
			{/if}
		</div>

		{#if isImage}
			<div class="mt-6">
				<img src={rawUrl} alt={data.file.originalName} class="max-w-full" />
			</div>
		{:else if isVideo}
			<div class="mt-6">
				<!-- svelte-ignore a11y_media_has_caption -->
				<video src={rawUrl} controls class="max-w-full"></video>
			</div>
		{:else if isAudio}
			<div class="mt-6">
				<audio src={rawUrl} controls class="w-full"></audio>
			</div>
		{:else if isPdf}
			<div class="mt-6">
				<iframe src={rawUrl} title={data.file.originalName} class="h-150 w-full border-0"></iframe>
			</div>
		{:else if isText}
			<div class="mt-6">
				{#await fetch(rawUrl).then((r) => r.text())}
					<p class="text-foreground-muted text-sm">Loading preview…</p>
				{:then content}
					<pre class="border-foreground-muted overflow-auto border p-4 text-sm">{content}</pre>
				{:catch}
					<p class="text-foreground-muted text-sm">Could not load preview.</p>
				{/await}
			</div>
		{/if}
	</div>
</div>
