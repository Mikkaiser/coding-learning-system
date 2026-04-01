import "./load-env";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "./client";
import { users } from "./schema";

async function seed() {
  const seeds = [
    { username: "admin", password: "admin123@", role: "admin" as const },
    { username: "student", password: "studentest123@", role: "student" as const }
  ];

  for (const s of seeds) {
    const existing = await db.select().from(users).where(eq(users.username, s.username)).limit(1);
    if (existing.length > 0) {
      continue;
    }
    await db.insert(users).values({
      username: s.username,
      passwordHash: await bcrypt.hash(s.password, 10),
      role: s.role
    });
  }
  console.log("Seeded.");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
