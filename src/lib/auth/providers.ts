type GithubUser = {
	id: number;
	login: string;
};

export const getGithubUser = async (accessToken: string) => {
	const response = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'User-Agent': 'omfj.no'
		}
	});

	return (await response.json()) as GithubUser;
};
