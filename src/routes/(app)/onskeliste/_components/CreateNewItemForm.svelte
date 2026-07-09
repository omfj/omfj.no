<script>
	import { createItem } from '../data.remote';

	let isPending = $state(false);
</script>

<form
	{...createItem.enhance(async ({ form, submit }) => {
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
		<span class="shrink-0">Tittel:</span>
		<input
			{...createItem.fields.title.as('text')}
			class="border-divide-soft focus:border-link w-full border-b bg-transparent outline-0"
		/>
	</label>

	<label class="flex items-baseline gap-2">
		<span class="shrink-0">Lenke:</span>
		<input
			{...createItem.fields.link.as('url')}
			class="border-divide-soft focus:border-link w-full border-b bg-transparent outline-0"
		/>
	</label>

	<label class="flex items-baseline gap-2">
		<span class="shrink-0">Beskrivelse:</span>
		<textarea
			{...createItem.fields.description.as('text')}
			class="border-divide-soft focus:border-link w-full border-b bg-transparent outline-0"
			rows="2"
		></textarea>
	</label>

	<button
		class="text-foreground-muted mr-auto w-fit hover:cursor-pointer hover:underline"
		type="submit"
		disabled={isPending}
	>
		{#if isPending}
			Lagrer...
		{:else}
			Legg til ønske
		{/if}
	</button>
</form>
