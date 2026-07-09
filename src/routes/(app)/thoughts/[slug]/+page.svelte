<script lang="ts">
	import { resolve } from '$app/paths';

	const { data } = $props();
	let meta = $derived(data.meta);
	let content = $derived(data.content);

	let formattedDate = $derived(
		new Date(meta.date).toLocaleDateString('en-GB', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);
</script>

<svelte:head>
	<title>{meta.title}</title>
</svelte:head>

<main class="max-w-2xl">
	<a href={resolve('/thoughts')} class="text-foreground-muted hover:underline">&lt;- Back</a>

	<br />
	<br />

	<article>
		<h1># {meta.title}</h1>

		<p class="text-foreground-muted text-sm">
			<time datetime={meta.date}>{formattedDate}</time>
		</p>

		<br />

		<div class="markdown">
			{@html content}
		</div>
	</article>
</main>

<style>
	.markdown :global(> * + *) {
		margin-top: 1rem;
	}

	.markdown :global(h1)::before {
		content: '# ';
	}

	.markdown :global(h2)::before {
		content: '## ';
	}

	.markdown :global(h3)::before {
		content: '### ';
	}

	.markdown :global(a) {
		color: var(--link);
		text-decoration: underline;
	}

	.markdown :global(ul li)::before {
		content: '- ';
	}

	.markdown :global(ol) {
		list-style: decimal inside;
	}

	.markdown :global(blockquote) {
		color: var(--foreground-muted);
	}

	.markdown :global(blockquote p)::before {
		content: '> ';
	}

	.markdown :global(pre) {
		background-color: var(--background-muted);
		padding: 1rem;
		overflow-x: auto;
	}

	.markdown :global(code)::before,
	.markdown :global(code)::after {
		content: '`';
	}

	.markdown :global(pre code)::before,
	.markdown :global(pre code)::after {
		content: none;
	}

	.markdown :global(strong) {
		font-weight: 700;
	}

	.markdown :global(hr) {
		border: none;
	}

	.markdown :global(hr)::before {
		content: '---';
	}
</style>
