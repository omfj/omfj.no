export type CVSection<T> = {
	title?: string;
	data: Array<T>;
};

export type CVText = CVSection<{
	paragraph: string;
}>;

export type CVMetadata = CVSection<{
	label: string;
	value: string;
	link?: string;
}>;

export type CVEducation = CVSection<{
	year: string;
	title: string;
	institution: string;
}>;

export type CVSkills = CVSection<{
	title: string;
	description: string;
}>;

export type CVWorkExperience = CVSection<{
	year: string;
	title: string;
	company: string;
	description: string;
}>;

export type CVVolunteerExperience = CVSection<{
	year: string;
	title: string;
	company: string;
	description: string;
}>;

export type CV = {
	about: CVText;
	metadata: CVMetadata;
	education: CVEducation;
	skills: CVSkills;
	workExperience: CVWorkExperience;
	volunteerExperience: CVVolunteerExperience;
	other: CVText;
};

const en = {
	about: {
		title: 'About me',
		data: [
			{
				paragraph:
					'I am an outgoing and curious person who loves to learn. Ever since I was young, I have had a great interest in everything related to computers and technology. When I am not studying, I enjoy playing video games, or tennis with friends if the weather is nice.'
			}
		]
	},
	metadata: {
		data: [
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
		]
	},
	education: {
		title: 'Education',
		data: [
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
				year: '08.2018 - 06.2021',
				title: 'High school',
				institution: 'Trondheim Cathedral School'
			}
		]
	},
	skills: {
		title: 'Skills',
		data: [
			{
				title: 'Programming languages',
				description: 'TypeScript, JavaScript, SQL, Go, Kotlin, Java, Python'
			},
			{
				title: 'Frameworks',
				description: 'React, React Router, Next.js, Svelte, Quarkus, Ktor, Hono'
			},
			{
				title: 'Tools',
				description: 'Git, Docker'
			},
			{
				title: 'Other',
				description: 'SQLite, PostgreSQL, Redis, TailwindCSS, Cloudflare, Vercel, GitHub Actions'
			}
		]
	},
	workExperience: {
		title: 'Work experience',
		data: [
			{
				year: '06.2025 - 08.2025',
				title: 'Software Developer Intern',
				company: 'Bekk',
				description:
					'Worked as a full-stack developer intern at Bekk. Worked on a ordering system for a genetic laboratory, using Django, React and PostgreSQL.'
			},
			{
				year: '09.2023 - 06.2025',
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
		]
	},
	volunteerExperience: {
		title: 'Volunteer experience',
		data: [
			{
				year: '04.2025 - 04.2026',
				title: 'Board member',
				company: 'echo – Linjeforeningen for informatikk',
				description: "Was a board member of echo's main board."
			},
			{
				year: '09.2021 - Present',
				title: 'Board member',
				company: 'echo Webkom',
				description:
					"I have been involved in managing echo's web solutions. Through my role, I have held positions as a board member, deputy chairman, and now I am the chief technology officer. I also spearheaded the development of the new website. Here, we have used many modern technologies such as TailwindCSS, Next.js, Vercel, Kotlin, Ktor to name a few."
			}
		]
	},
	other: {
		title: 'Other',
		data: [
			{
				paragraph:
					'See some of my other projects on my GitHub, @omfj. (https://www.github.com/omfj)'
			},
			{
				paragraph:
					'I also have some certificates on Codecademy. (https://www.codecademy.com/profiles/omfj)'
			}
		]
	}
} as const satisfies CV;

const no: CV = {
	about: {
		title: 'Om meg',
		data: [
			{
				paragraph:
					'Jeg er en utvikler som er opptatt av å lære. Jeg har hatt en fantastisk opplevelse i å lære noe nytt. Jeg har vært i det hele tatt, og jeg har vært interessert i alt som er relatert til datamaskiner og teknologi. Når jeg ikke er i utdanning, er det jeg som spiller videospill, eller tennis med venner hvis det er fint.'
			}
		]
	},
	metadata: {
		data: [
			{
				label: 'E-post',
				value: 'me@omfj.no'
			},
			{
				label: 'Fødselsdato',
				value: '17. desember 2002'
			},
			{
				label: 'Nasjonalitet',
				value: 'norsk'
			},
			{
				label: 'Språk',
				value: 'norsk, engelsk'
			},
			{
				label: 'Nettside',
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
		]
	},
	education: {
		title: 'Utdanning',
		data: [
			{
				year: '08.2024 - 2026',
				title: 'Felles master i programvareutvikling',
				institution: 'Universitetet i Bergen / Høgskulen på Vestlandet'
			},
			{
				year: '08.2021 - 06.2024',
				title: 'Bachelor i datateknologi',
				institution: 'Universitetet i Bergen'
			},
			{
				year: '2018 - 2021',
				title: 'Videregående skole',
				institution: 'Trondheim Katedralskole'
			}
		]
	},
	skills: {
		title: 'Ferdigheter',
		data: [
			{
				title: 'Programmeringsspråk',
				description: 'TypeScript, JavaScript, SQL, Go, Kotlin, Java, Python'
			},
			{
				title: 'Rammeverk',
				description: 'React, React Router, Next.js, Svelte, Quarkus, Ktor, Hono'
			},
			{
				title: 'Verktøy',
				description: 'Git, Docker'
			},
			{
				title: 'Andre',
				description: 'SQLite, PostgreSQL, Redis, TailwindCSS, Cloudflare, Vercel, GitHub Actions'
			}
		]
	},
	workExperience: {
		title: 'Arbeidserfaring',
		data: [
			{
				year: '06.2025 - 08.2025',
				title: 'Software Developer Intern',
				company: 'Bekk',
				description:
					'Jobbet som full-stack utvikler intern hos Bekk. Jobbet med et bestillingssystem for et genetisk laboratorium, ved bruk av Django, React og PostgreSQL.'
			},
			{
				year: '09.2023 - 06.2025',
				title: 'Software Developer',
				company: 'Sportradar AS',
				description: 'Jobber deltid på samme prosjektet jeg hadde som summer-intern.'
			},
			{
				year: '06.2023 - 08.2023',
				title: 'Engineering Intern',
				company: 'Sportradar AS',
				description:
					'Jobbet som full-stack developer for Sportradar. Jeg var involvert i å utvikle et internt verktøy med Quarkus og Kotlin for backenden, samt React og TypeScript for frontenden.'
			}
		]
	},
	volunteerExperience: {
		title: 'Verv',
		data: [
			{
				year: '04.2025 - 04.2026',
				title: 'Styremedlem',
				company: 'echo – Linjeforeningen for informatikk',
				description: 'Var styremedlem i hovedstyret til echo.'
			},
			{
				year: '09.2021 - Nå',
				title: 'Teknologisjef',
				company: 'echo Webkom',
				description:
					'Jeg har vært involvert i å styre echo sine webløsninger. Her har vi brukt mange moderne teknologier som TailwindCSS, Next.js, Vercel, Kotlin, Ktor.'
			}
		]
	},
	other: {
		title: 'Annet',
		data: [
			{
				paragraph:
					'Se noen av mine andre prosjekter på GitHub, @omfj. (https://www.github.com/omfj)'
			},
			{
				paragraph:
					'Jeg har også noen sertifikater på Codecademy. (https://www.codecademy.com/profiles/omfj)'
			}
		]
	}
} as const satisfies CV;

export const cv = {
	en,
	no
} as const;
