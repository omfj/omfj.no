<script lang="ts">
	import type { CV } from '$lib/data';
	import Avatar from '$lib/assets/avatar.png?url';
	import { Page, PageWrapper, Text, Metadata, Section, Table } from './internals';

	type Props = {
		cv: CV;
	};

	let { cv }: Props = $props();
	let { metadata, education, workExperience, volunteerExperience, skills } = cv;
</script>

<PageWrapper>
	<Page class="z-30" id="cv">
		<div class="flex flex-col md:flex-row gap-10">
			<div class="block">
				<img src={Avatar} alt="Ole Magnus" class="h-36 max-w-36 flex rounded-full border shadow" />
			</div>

			<div>
				<h1 class="text-3xl font-semibold mb-6">Ole Magnus Fon Johnsen</h1>

				<Metadata.Root>
					{#each metadata as { label, value, link }}
						<Metadata.Item>
							<Metadata.Label>{label}:</Metadata.Label>{' '}
							{#if link}
								<Metadata.Link href={link}>{value}</Metadata.Link>
							{:else}
								{value}
							{/if}
						</Metadata.Item>
					{/each}
				</Metadata.Root>
			</div>
		</div>

		<Section.Root>
			<Section.Title>About me</Section.Title>

			<Text>
				I am an outgoing and curious person who loves to learn. Ever since I was young, I have had a
				great interest in everything related to computers and technology. When I am not studying, I
				enjoy playing video games, or tennis with friends if the weather is nice.
			</Text>
		</Section.Root>

		<Section.Root>
			<Section.Title>Education</Section.Title>

			<Table.Root>
				{#each education as { year, title, institution }}
					<Table.Item>
						<Table.Label>{year}</Table.Label>
						<Table.Content>
							<Table.Description>
								{title} at {institution}
							</Table.Description>
						</Table.Content>
					</Table.Item>
				{/each}
			</Table.Root>
		</Section.Root>

		<Section.Root>
			<Section.Title>Work experience</Section.Title>

			<Table.Root>
				{#each workExperience as { year, title, company, description }}
					<Table.Item>
						<Table.Label>{year}</Table.Label>
						<Table.Content>
							<Table.Title>
								{title} at {company}
							</Table.Title>
							<Table.Description>{description}</Table.Description>
						</Table.Content>
					</Table.Item>
				{/each}
			</Table.Root>
		</Section.Root>

		<Section.Root>
			<Section.Title>Volunteer experience</Section.Title>

			<Table.Root>
				{#each volunteerExperience as { year, title, company, description }}
					<Table.Item>
						<Table.Label>{year}</Table.Label>
						<Table.Content>
							<Table.Title>
								{title} at {company}
							</Table.Title>
							<Table.Description>{description}</Table.Description>
						</Table.Content>
					</Table.Item>
				{/each}
			</Table.Root>
		</Section.Root>

		<Section.Root>
			<Section.Title>Skills</Section.Title>

			<Table.Root>
				{#each skills as { title, description }}
					<Table.Item>
						<Table.Label>{title}</Table.Label>
						<Table.Content>
							<Table.Description>{description}</Table.Description>
						</Table.Content>
					</Table.Item>
				{/each}
			</Table.Root>
		</Section.Root>

		<Section.Root>
			<Section.Title>Other</Section.Title>

			<Text>See some of my other projects on my GitHub, @omfj. (https://www.github.com/omfj)</Text>
			<Text>
				I also have some certificates on Codecademy. (https://www.codecademy.com/profiles/omfj)
			</Text>
		</Section.Root>
	</Page>
</PageWrapper>

<style>
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
