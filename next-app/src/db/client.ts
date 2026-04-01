import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const url = process.env.APP_DATABASE_URL;
if (!url) {
  throw new Error("APP_DATABASE_URL is not set");
}

const sql = postgres(url, { max: 10 });
export const db = drizzle(sql, { schema });
