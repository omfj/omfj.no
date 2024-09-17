<script lang="ts">
	import type { CV } from '$lib/cv';
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
					{#each metadata.data as { label, value, link }}
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
			<Section.Title>{cv.about.title}</Section.Title>

			{#each cv.about.data as { paragraph }}
				<Text>{paragraph}</Text>
			{/each}
		</Section.Root>

		<Section.Root>
			<Section.Title>{education.title}</Section.Title>

			<Table.Root>
				{#each education.data as { year, title, institution }}
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
			<Section.Title>{workExperience.title}</Section.Title>

			<Table.Root>
				{#each workExperience.data as { year, title, company, description }}
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
			<Section.Title>{volunteerExperience.title}</Section.Title>

			<Table.Root>
				{#each volunteerExperience.data as { year, title, company, description }}
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
			<Section.Title>{skills.title}</Section.Title>

			<Table.Root>
				{#each skills.data as { title, description }}
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
			<Section.Title>{cv.other.title}</Section.Title>

			{#each cv.other.data as { paragraph }}
				<Text>{paragraph}</Text>
			{/each}
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
