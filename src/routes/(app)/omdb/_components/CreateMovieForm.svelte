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
	class="mt-2 flex max-w-md flex-col gap-2"
>
	<label class="flex items-baseline gap-2">
		<span class="shrink-0">Tittel:</span>
		<input
			{...createMovie.fields.title.as('text')}
			class="border-divide-soft focus:border-link w-full border-b bg-transparent outline-0"
		/>
	</label>

	<label class="flex items-baseline gap-2">
		<span class="shrink-0">IMDb-ID:</span>
		<input
			{...createMovie.fields.id.as('text')}
			placeholder="tt1234567"
			class="border-divide-soft focus:border-link placeholder:text-foreground-muted/50 w-full border-b bg-transparent outline-0"
		/>
	</label>

	<label class="flex items-baseline gap-2">
		<span class="shrink-0">Vurdering:</span>
		<input
			{...createMovie.fields.rating.as('number')}
			min={1}
			max={100}
			placeholder="1-100"
			class="border-divide-soft focus:border-link placeholder:text-foreground-muted/50 w-full border-b bg-transparent outline-0"
		/>
	</label>

	<button
		class="text-foreground-muted mr-auto w-fit text-left hover:cursor-pointer hover:underline"
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
