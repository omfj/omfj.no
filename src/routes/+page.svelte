<script lang="ts">
	import List from '$lib/components/List.svelte';
	import ListTitle from '$lib/components/ListTitle.svelte';
	import ListDescription from '$lib/components/ListDescription.svelte';
	import ListItem from '$lib/components/ListItem.svelte';

	const yearsOld = (
		(Date.now() - new Date(2002, 12, 17).getTime()) /
		(1000 * 60 * 60 * 24 * 365)
	).toFixed(1);
</script>

<div class="space-y-10">
	<div>
		<p>
			My name is <b>Ole Magnus</b>. I am {yearsOld} year old
			<b>software developer</b>
			from
			<b>Norway</b>. Currently residing in Bergen, and studying Computer Technology at the
			<b>University of Bergen</b>.
		</p>
	</div>

	<div>
		<ListTitle>Socials</ListTitle>
		<ListDescription>Ways to get in touch with me.</ListDescription>
		<List>
			<ListItem href="https://github.com/omfj">
				<span>GitHub</span>
				<span class="text-sm">(@omfj)</span>
			</ListItem>
			<ListItem href="https://www.instagram.com/lordolem">
				<span>Instagram</span>
				<span class="text-sm">(@lordolem)</span>
			</ListItem>
			<ListItem href="https://www.linkedin.com/in/omfj">
				<span>LinkedIn</span>
				<span class="text-sm">(in/omfj)</span>
			</ListItem>
			<ListItem href="https://www.twitter.com/omfj_">
				<span>X</span>
				<span class="text-sm">(@omfj_)</span>
			</ListItem>
		</List>
	</div>

	<!-- <div>
		<ListTitle>Projects</ListTitle>
		<ListDescription>Some of the things I have worked on.</ListDescription>
		<List>
			<ListItem href="/">echo Webkom</ListItem>
			<ListItem href="/">echo Verv</ListItem>
			<ListItem href="/">@trondheimvaeret</ListItem>
			<ListItem href="/">appWash CLI</ListItem>
			<ListItem href="/">Team Local Tactics</ListItem>
		</List>
	</div> -->
</div>
