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
	class="m-8 flex flex-col gap-4 border-2 p-4"
>
	<label>
		<h3>Tittel</h3>
		<input
			{...createItem.fields.title.as('text')}
			class="focus:border-link w-full border-b-2 p-1 outline-0"
			placeholder="Tittel på ønsket vare"
		/>
	</label>

	<label>
		<h3>Lenke</h3>
		<input
			{...createItem.fields.link.as('url')}
			class="focus:border-link w-full border-b-2 p-1 outline-0"
			placeholder="https://..."
		/>
	</label>

	<button
		class="mr-auto w-fit px-1 hover:cursor-pointer hover:underline"
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
