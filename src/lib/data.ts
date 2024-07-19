export type CV = typeof cvEn;

export const cvEn = {
	metadata: [
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
	],
	education: [
		{
			year: '08.2024 - 2026',
			title: "Master's degree in Software Engineering",
			institution: 'University of Bergen'
		},
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
	],
	skills: [
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
	],

	workExperience: [
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
	],
	volunteerExperience: [
		{
			year: '09.2021 - Present',
			title: 'Board member',
			company: 'echo Webkom',
			description:
				"I have been involved in managing echo's web solutions. Through my role, I have held positions as a board member, deputy chairman, and now I am the chief technology officer. I also spearheaded the development of the new website. Here, we have used many modern technologies such as TailwindCSS, Next.js, Vercel, Kotlin, Ktor to name a few."
		}
	]
};
