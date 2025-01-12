// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			github: import('arctic').GitHub;
			db: import('$lib/db/drizzle').Database;
			authService: import('$lib/services/auth').AuthService;
			auth: import('$lib/services/auth').ValidatedSession;
		}
		// interface PageData {}
		interface Platform {
			env: Env;
			cf: CfProperties;
			ctx: ExecutionContext;
		}
	}
}

export {};
