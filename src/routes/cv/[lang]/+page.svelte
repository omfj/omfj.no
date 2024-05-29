<script lang="ts">
	import Avatar from './avatar.png?url';
	import Page from './_components/Page.svelte';

	const metadata = [
		{
			label: 'Address',
			value: 'Blusuvollsbakken 6A, 7052 Trondheim'
		},
		{
			label: 'Mobile',
			value: '+47 479 04 470'
		},
		{
			label: 'E-mail',
			value: 'me@omfj.no'
		},
		{
			label: 'Date of birth',
			value: '17th December 2002'
		},
		{
			label: 'Nationality',
			value: 'Norwegian'
		},
		{
			label: 'Languages',
			value: 'Norwegian, English'
		},
		{
			label: 'Website',
			value: 'https://omfj.no',
			link: 'https://omfj.no'
		},
		{
			label: 'GitHub',
			value: 'https://github.com/omfj',
			link: 'https://github.com/omfj'
		},
		{
			label: 'LinkedIn',
			value: 'https://www.linkedin.com/in/omfj',
			link: 'https://www.linkedin.com/in/omfj'
		}
	];

	const education = [
		{
			year: '08.2021 - 06.2024',
			title: 'Bachelor in Computer Technology',
			institution: 'University of Bergen'
		},
		{
			year: '2018 - 2021',
			title: 'Upper Secondary School',
			institution: 'Trondheim Cathedral School'
		}
	];

	const skills = [
		{
			title: 'Programming languages',
			description: 'Java, Kotlin, TypeScript, JavaScript, Python, SQL'
		},
		{
			title: 'Frameworks',
			description: 'React, Next.js, Quarkus, Ktor, Hono'
		},
		{
			title: 'Tools',
			description: 'Git, Docker'
		},
		{
			title: 'Other',
			description: 'TailwindCSS, Cloudflare, Vercel, GitHub Actions'
		}
	];

	const workExperience = [
		{
			year: '09.2023 - Present',
			title: 'Software Developer',
			company: 'Sportradar AS',
			description: 'Worked part-time with the same project from my summer internship'
		},
		{
			year: '06.2023 - 08.2023',
			title: 'Engineering Intern',
			company: 'Sportradar AS',
			description:
				'Worked as a full-stack developer for Sportradar. I was involved in developing an internal tool using Quarkus and Kotlin for the backend, as well as React and TypeScript for the frontend.'
		}
	];

	const volunteerExperience = [
		{
			year: '09.2021 - Present',
			title: 'Board member',
			company: 'echo Webkom',
			description:
				"I have been involved in managing echo's web solutions. Through my role, I have held positions as a board member, deputy chairman, and now I am the chief technology officer. I also spearheaded the development of the new website. Here, we have used many modern technologies such as TailwindCSS, Next.js, Vercel, Kotlin, Ktor to name a few."
		}
	];
</script>

<!-- Gradient indigto to white -->
<div class="gradient-1"></div>
<div class="gradient-2"></div>

<button
	onclick={() => window.print()}
	class="text-center bg-white hover:bg-gray-100 z-50 w-fit mx-auto text-gray-700 text-sm h-8 flex items-center justify-center mt-6 hover:text-blue-500 shadow-inner rounded-xl px-4 transition-all"
	>Download as PDF</button
>

<div class="my-10 rounded bg-white shadow mx-auto border p-20">
	<Page class="z-30" id="cv">
		<div class="flex gap-10">
			<div class="block">
				<img src={Avatar} alt="Ole Magnus" class="h-36 max-w-36 flex rounded-full border shadow" />
			</div>

			<div>
				<h1 class="text-3xl font-semibold mb-6">Ole Magnus Fon Johnsen</h1>
				<ul class="text-xs flex flex-wrap gap-2">
					{#each metadata as { label, value, link }}
						<li>
							<p>
								<span class="font-semibold">{label}:</span>{' '}
								{#if link}
									<a
										href={link}
										target="_blank"
										class="underline hover:text-blue-500 transition-colors"
										rel="noopener">{value}</a
									>
								{:else}
									{value}
								{/if}
							</p>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div>
			<h2 class="text-lg font-medium mb-2">About me</h2>

			<p class="text-xs">
				I am an outgoing and curious person who loves to learn. Ever since I was young, I have had a
				great interest in everything related to computers and technology. When I am not studying, I
				enjoy playing video games, or tennis with friends if the weather is nice.
			</p>
		</div>

		<div>
			<h2 class="text-lg font-medium mb-2">Education</h2>

			<ul class="flex flex-col gap-4 text-xs">
				{#each education as { year, title, institution }}
					<li class="flex gap-4">
						<p class="max-w-[150px] w-full">{year}</p>
						<p>
							{title} at {institution}
						</p>
					</li>
				{/each}
			</ul>
		</div>

		<div>
			<h2 class="text-lg font-medium mb-2">Work experience</h2>

			<ul class="flex flex-col gap-4 text-xs">
				{#each workExperience as { year, title, company, description }}
					<li class="flex gap-4">
						<p class="max-w-[150px] w-full">{year}</p>
						<div class="flex flex-col gap-1">
							<p class="font-semibold">
								{title} at {company}
							</p>
							<p>{description}</p>
						</div>
					</li>
				{/each}
			</ul>
		</div>

		<div>
			<h2 class="text-lg font-medium mb-2">Volunteer experience</h2>

			<ul class="flex flex-col gap-4 text-xs">
				{#each volunteerExperience as { year, title, company, description }}
					<li class="flex gap-4">
						<p class="max-w-[150px] w-full">{year}</p>
						<div class="flex flex-col gap-1">
							<p class="font-semibold">
								{title} at {company}
							</p>
							<p>{description}</p>
						</div>
					</li>
				{/each}
			</ul>
		</div>

		<div>
			<h2 class="text-lg font-medium mb-2">Skills</h2>

			<ul class="flex flex-col gap-1 text-xs">
				{#each skills as { title, description }}
					<li class="flex gap-4">
						<p class="font-semibold max-w-[150px] w-full">{title}</p>
						<p>{description}</p>
					</li>
				{/each}
			</ul>
		</div>

		<div>
			<h2 class="text-lg font-medium mb-2">Other</h2>

			<p class="text-xs">
				See some of my other projects on my GitHub, @omfj. (https://www.github.com/omfj)
			</p>
			<p class="text-xs">
				I also have some certificates on Codecademy. (https://www.codecademy.com/profiles/omfj)
			</p>
		</div>
	</Page>
</div>

<style>
	.gradient-1 {
		z-index: -1;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: linear-gradient(160deg, #a2cffe 0%, rgba(255, 255, 255, 0) 25%);
	}

	.gradient-2 {
		z-index: -1;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: linear-gradient(200deg, #a2cffe 0%, rgba(255, 255, 255, 0) 55%);
	}

	@media print {
		:global(body *) {
			visibility: hidden;
		}
		:global(#cv, #cv *) {
			visibility: visible;
		}
		:global(#cv) {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
		}
	}
</style>
