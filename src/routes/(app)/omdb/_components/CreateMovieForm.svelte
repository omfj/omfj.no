<script lang="ts">
	import { createMovie } from '../data.remote';

	let isPending = $state(false);
</script>

<form
	{...createMovie.enhance(async ({ form, submit }) => {
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
		<h3 class="text-base font-semibold">Tittel</h3>
		<input
			{...createMovie.fields.title.as('text')}
			placeholder="Tittel på filmen"
			class="focus:border-link w-full border-b-2 p-1 outline-0"
		/>
	</label>

	<label>
		<h3 class="text-base font-semibold">IMDb-ID</h3>
		<input
			{...createMovie.fields.id.as('text')}
			placeholder="tt1234567"
			class="focus:border-link w-full border-b-2 p-1 outline-0"
		/>
	</label>

	<label>
		<h3 class="text-base font-semibold">Vurdering</h3>
		<input
			{...createMovie.fields.rating.as('number')}
			min={1}
			max={100}
			placeholder="1-100"
			class="focus:border-link w-full border-b-2 p-1 outline-0"
		/>
	</label>

	<button
		class="mr-auto w-fit px-1 text-left hover:cursor-pointer hover:underline"
		type="submit"
		disabled={isPending}
	>
		{#if isPending}
			Lagrer...
		{:else}
			Legg til film
		{/if}
	</button>
</form>
