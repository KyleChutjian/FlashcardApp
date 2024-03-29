import { Pool} from 'pg';
import { migrate} from 'drizzle-orm/node-postgres/migrator';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';

async function main() {
    const pool = new Pool({connectionString: process.env.DB_URL});
    const db: NodePgDatabase = drizzle(pool);
    
    console.log("[migrate] Running migrations ...");

    await migrate(db, { migrationsFolder: 'src/server/db/drizzle'});

    console.log("[migrate] Migrations have ran, exiting ...")

    await pool.end();
}

main();