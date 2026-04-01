import type { Config } from "drizzle-kit";
import "./src/db/load-env";

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.APP_DATABASE_URL!
  }
} satisfies Config;
