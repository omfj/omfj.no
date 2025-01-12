import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export const createDatabase = (d1: D1Database) => {
	return drizzle(d1, { schema, casing: 'snake_case' });
};

export type Database = ReturnType<typeof createDatabase>;
