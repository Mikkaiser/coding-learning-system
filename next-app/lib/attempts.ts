import { count, eq } from "drizzle-orm";
import { db } from "@/src/db/client";
import { challengeAttempts } from "@/src/db/schema";

export async function recordAttempt(
  userId: string,
  challengeId: string,
  success: boolean
) {
  await db.insert(challengeAttempts).values({ userId, challengeId, success });
}

export async function getAttemptsPerChallenge(userId: string) {
  const rows = await db
    .select({
      challengeId: challengeAttempts.challengeId,
      attempts: count().as("attempts")
    })
    .from(challengeAttempts)
    .where(eq(challengeAttempts.userId, userId))
    .groupBy(challengeAttempts.challengeId);

  return rows.map((r) => ({
    challengeId: r.challengeId,
    attempts: Number(r.attempts)
  }));
}

export async function getTotalAttempts(userId: string): Promise<number> {
  const rows = await db
    .select({ n: count().as("n") })
    .from(challengeAttempts)
    .where(eq(challengeAttempts.userId, userId));
  return Number(rows[0]?.n ?? 0);
}
