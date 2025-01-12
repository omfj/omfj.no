type GithubUser = {
	id: number;
	login: string;
};

export const getGithubUser = async (accessToken: string) => {
	const response = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	return (await response.json()) as GithubUser;
};
