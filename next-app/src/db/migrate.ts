import "./load-env";
import path from "node:path";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

async function main() {
  const url = process.env.APP_DATABASE_URL;
  if (!url) {
    throw new Error("APP_DATABASE_URL is not set");
  }
  const sql = postgres(url, { max: 1 });
  const db = drizzle(sql);
  await migrate(db, {
    migrationsFolder: path.join(process.cwd(), "src", "db", "migrations")
  });
  await sql.end();
  console.log("Migrations applied.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
