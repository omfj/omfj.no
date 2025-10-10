<script>
	import { enhance } from '$app/forms';

	let isPending = $state(false);
	let title = $state('');
	let link = $state('');

	function reset() {
		title = '';
		link = '';
	}
</script>

<form
	method="post"
	action="/onskeliste?/create"
	class="m-8 flex flex-col gap-4 border-2 p-4"
	use:enhance={() => {
		isPending = true;

		return async ({ update, result }) => {
			isPending = false;
			if (result.type === 'success') {
				reset();
			}
			await update();
		};
	}}
>
	<label>
		<h3>Tittel</h3>
		<input
			bind:value={title}
			name="title"
			class="focus:border-link w-full border-b-2 p-1 outline-0"
			placeholder="Tittel på ønsket vare"
		/>
	</label>

	<label>
		<h3>Lenke</h3>
		<input
			bind:value={link}
			name="link"
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
