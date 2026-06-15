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
	class="m-8 flex flex-col gap-4 border-2 p-4"
>
	<label>
		<h3>Title</h3>
		<input
			{...createLink.fields.title.as('text')}
			class="focus:border-link w-full border-b-2 p-1 outline-0"
			placeholder="Article title"
		/>
	</label>

	<label>
		<h3>URL</h3>
		<input
			{...createLink.fields.url.as('url')}
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
			Saving...
		{:else}
			Add link
		{/if}
	</button>
</form>
