import { desc, eq } from "drizzle-orm";
import { db } from "@/src/db/client";
import { loginHistory } from "@/src/db/schema";

export async function recordLogin(userId: string) {
  await db.insert(loginHistory).values({ userId });
}

export async function getLastLoginAt(userId: string): Promise<Date | null> {
  const rows = await db
    .select({ createdAt: loginHistory.createdAt })
    .from(loginHistory)
    .where(eq(loginHistory.userId, userId))
    .orderBy(desc(loginHistory.createdAt))
    .limit(1);
  const t = rows[0]?.createdAt;
  return t ?? null;
}
