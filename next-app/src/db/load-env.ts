import { config } from "dotenv";
import path from "node:path";

/**
 * Loads env for CLI scripts (`tsx src/db/seed.ts`, migrate, drizzle-kit).
 * Next.js loads `.env*` itself; this is only for standalone Node runs from `next-app/`.
 */
for (const rel of [".env.local", ".env", path.join("..", ".env")]) {
  config({ path: path.join(process.cwd(), rel) });
}
