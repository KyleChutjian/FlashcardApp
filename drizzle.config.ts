import "dotenv/config";
import type { Config } from 'drizzle-kit';

export default {
    schema: './src/server/db/schema/index.ts',
    out: './src/server/db/drizzle',
    driver: 'pg',
    dbCredentials: {
        connectionString: String(process.env.DB_URL),
    },
    verbose: true,
    strict: true,
} satisfies Config;