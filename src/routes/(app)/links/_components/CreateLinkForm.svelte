<script>
	import { createLink } from '../data.remote';

	let isPending = $state(false);
</script>

<form
	{...createLink.enhance(async ({ form, submit }) => {
		isPending = true;
		try {
			await submit();
			form.reset();
		} finally {
			isPending = false;
		}
	})}
	class="mt-2 flex max-w-md flex-col gap-2"
>
	<label class="flex items-baseline gap-2">
		<span class="shrink-0">Title:</span>
		<input
			{...createLink.fields.title.as('text')}
			class="border-divide-soft focus:border-link w-full border-b bg-transparent outline-0"
			autocomplete="off"
		/>
	</label>

	<label class="flex items-baseline gap-2">
		<span class="shrink-0">URL:</span>
		<input
			{...createLink.fields.url.as('url')}
			class="border-divide-soft focus:border-link w-full border-b bg-transparent outline-0"
			autocomplete="off"
		/>
	</label>

	<button
		class="text-foreground-muted mr-auto w-fit hover:cursor-pointer hover:underline"
		type="submit"
		disabled={isPending}
	>
		{#if isPending}
			Saving...
		{:else}
			Add link
		{/if}
	</button>
</form>
