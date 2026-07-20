<script lang="ts">
	import { asset } from '$app/paths';

	const birthday = new Date('2002-12-17');

	function calculateAge() {
		const now = new Date();
		const ageInMilliseconds = now.getTime() - birthday.getTime();
		const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
		const age = ageInMilliseconds / millisecondsInYear;
		return Math.floor(age);
	}

	const age = calculateAge();
</script>

<svelte:head>
	<title>omfj.no</title>
</svelte:head>

<main>
	<h1 class="sr-only">omfj.no</h1>

	<h2><span class="text-foreground-muted">##</span> About me</h2>

	<br />

	<p>
		My name is Ole Magnus. I am {age} year old software engineer from Norway. Loves Pyrda and Rosenborg.
	</p>

	<br />

	<p>
		If you are interested, you can find <a
			href={asset('/assets/cv.pdf')}
			class="text-link underline transition-colors">my resumè here</a
		>.
	</p>

	<br />

	<h2><span class="text-foreground-muted">##</span> Socials</h2>

	<br />

	<ul>
		<li>
			-
			<a href="https://github.com/omfj" class="text-link underline">GitHub</a>
			<span class="text-foreground-muted text-sm">(@omfj)</span>
		</li>
		<li>
			-
			<a href="https://www.linkedin.com/in/omfj" class="text-link underline">LinkedIn</a>
			<span class="text-foreground-muted text-sm">(in/omfj)</span>
		</li>
		<li>
			-
			<a href="mailto:me@omfj.no" class="text-link underline">E-mail</a>
			<span class="text-foreground-muted text-sm">(me@omfj.no)</span>
		</li>
	</ul>
</main>
