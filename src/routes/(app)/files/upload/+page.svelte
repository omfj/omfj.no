<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	const CHUNK_SIZE = 5 * 1024 * 1024; // 5 MB

	let fileId = $state('');
	let file: File | null = $state(null);
	let isPublic = $state(true);
	let uploading = $state(false);
	let progress = $state(0);
	let errorMsg = $state('');
	let fileInput: HTMLInputElement;
	let dragging = $state(false);

	function onFileChange(e: Event) {
		const input = e.target as HTMLInputElement;
		file = input.files?.[0] ?? null;
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();
		dragging = false;
		const dropped = e.dataTransfer?.files[0];
		if (dropped) {
			file = dropped;
			fileInput.files = e.dataTransfer!.files;
		}
	}

	function formatBytes(bytes: number) {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
		return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
	}

	async function upload(e: Event) {
		e.preventDefault();
		if (!file || !fileId) return;

		uploading = true;
		errorMsg = '';
		progress = 0;

		try {
			// Start multipart upload
			const startRes = await fetch('/api/upload/start', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: fileId,
					name: file.name,
					contentType: file.type || 'application/octet-stream',
					isPublic
				})
			});

			const startData = await startRes.json();
			if (!startRes.ok) {
				errorMsg = startData.error ?? 'Failed to start upload';
				uploading = false;
				return;
			}

			const { uploadId } = startData;
			const totalChunks = Math.max(1, Math.ceil(file.size / CHUNK_SIZE));
			const parts: { partNumber: number; etag: string }[] = [];

			for (let i = 0; i < totalChunks; i++) {
				const start = i * CHUNK_SIZE;
				const end = Math.min(start + CHUNK_SIZE, file.size);
				const chunk = file.slice(start, end);

				const partRes = await fetch(
					`/api/upload/part?id=${encodeURIComponent(fileId)}&uploadId=${encodeURIComponent(uploadId)}&partNumber=${i + 1}`,
					{ method: 'PUT', body: chunk }
				);

				if (!partRes.ok) {
					const d = await partRes.json().catch(() => ({}));
					errorMsg = (d as { error?: string }).error ?? 'Failed to upload part';
					uploading = false;
					return;
				}

				const partData = await partRes.json();
				parts.push({ partNumber: partData.partNumber, etag: partData.etag });
				progress = Math.round(((i + 1) / totalChunks) * 100);
			}

			// Complete upload
			const completeRes = await fetch('/api/upload/complete', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: fileId,
					uploadId,
					parts,
					size: file.size,
					name: file.name,
					contentType: file.type || 'application/octet-stream',
					isPublic
				})
			});

			if (!completeRes.ok) {
				const d = await completeRes.json().catch(() => ({}));
				errorMsg = (d as { error?: string }).error ?? 'Failed to complete upload';
				uploading = false;
				return;
			}

			goto(resolve(`/files/${fileId}`));
		} catch {
			errorMsg = 'An unexpected error occurred';
			uploading = false;
		}
	}
</script>

<svelte:head>
	<title>Upload — omfj.no</title>
</svelte:head>

<div class="py-12 md:py-24">
	<div class="mx-auto max-w-xl px-8">
		<div class="mb-6 flex items-center justify-between">
			<h1 class="text-2xl">Upload file</h1>
			<a href={resolve('/files')} class="text-foreground-muted hover:underline">[ Back ]</a>
		</div>

		<form onsubmit={upload} class="space-y-5">
			<div class="space-y-1">
				<label for="file-id" class="block text-sm">ID (slug)</label>
				<input
					id="file-id"
					type="text"
					bind:value={fileId}
					placeholder="my-file-name"
					pattern="[a-z0-9]+(-[a-z0-9]+)*"
					required
					disabled={uploading}
					class="border-foreground-muted w-full border bg-transparent px-3 py-2 text-sm focus:outline-none disabled:opacity-50"
				/>
				<p class="text-foreground-muted text-xs">Lowercase letters, numbers, and hyphens only.</p>
			</div>

			<div class="space-y-1">
				<label for="file-input" class="block text-sm">File</label>
				<button
					type="button"
					onclick={() => fileInput.click()}
					ondragover={(e) => {
						e.preventDefault();
						dragging = true;
					}}
					ondragleave={() => (dragging = false)}
					ondrop={onDrop}
					disabled={uploading}
					class="border-foreground-muted flex w-full cursor-pointer flex-col items-center gap-2 border px-4 py-8 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 {dragging
						? 'bg-foreground/5'
						: 'hover:bg-foreground/5'}"
				>
					{#if file}
						<span class="font-medium">{file.name}</span>
						<span class="text-foreground-muted text-xs">{formatBytes(file.size)}</span>
						<span class="text-foreground-muted text-xs">Click or drop to replace</span>
					{:else}
						<span>Click to choose a file</span>
						<span class="text-foreground-muted text-xs">or drag and drop here</span>
					{/if}
				</button>
				<input
					bind:this={fileInput}
					id="file-input"
					type="file"
					onchange={onFileChange}
					required
					disabled={uploading}
					class="sr-only"
				/>
			</div>

			<div class="flex items-center gap-2">
				<input
					id="is-public"
					type="checkbox"
					bind:checked={isPublic}
					disabled={uploading}
					class="disabled:opacity-50"
				/>
				<label for="is-public" class="text-sm">Public (visible to everyone)</label>
			</div>

			{#if errorMsg}
				<p class="text-sm text-red-500">{errorMsg}</p>
			{/if}

			{#if uploading}
				<div class="space-y-1">
					<div class="bg-foreground-muted/20 h-2 w-full">
						<div class="bg-foreground h-2 transition-all" style="width: {progress}%"></div>
					</div>
					<p class="text-foreground-muted text-xs">{progress}%</p>
				</div>
			{/if}

			<button
				type="submit"
				disabled={uploading || !file || !fileId}
				class="border-foreground-muted border px-4 py-2 text-sm hover:underline disabled:cursor-not-allowed disabled:opacity-50"
			>
				{uploading ? 'Uploading…' : 'Upload'}
			</button>
		</form>
	</div>
</div>
