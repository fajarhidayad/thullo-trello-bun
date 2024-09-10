import pg from 'pg';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import env from '../env';

export const connection = new pg.Pool({
  connectionString: env.DB_URL,
  max: env.DB_MIGRATE ? 1 : undefined,
});
export const db = drizzle(connection, { logger: true, schema });
