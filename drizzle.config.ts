import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

const { parsed: env } = dotenv.config();

export default defineConfig({
	dialect: 'sqlite',
	driver: 'd1-http',
	casing: 'snake_case',
	out: 'migrations',
	schema: './src/lib/db/schema.ts',

	dbCredentials: {
		accountId: env!['CLOUDFLARE_ACCOUNT_ID'],
		databaseId: env!['CLOUDFLARE_DATABASE_ID'],
		token: env!['CLOUDFLARE_TOKEN']
	}
});
