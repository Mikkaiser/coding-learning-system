import { eq } from "drizzle-orm";
import { db } from "@/src/db/client";
import { challengeCompletions } from "@/src/db/schema";

export async function getCompletedChallengeIds(userId: string): Promise<string[]> {
  const rows = await db
    .select({ challengeId: challengeCompletions.challengeId })
    .from(challengeCompletions)
    .where(eq(challengeCompletions.userId, userId));
  return rows.map((r) => r.challengeId);
}

export async function markComplete(userId: string, challengeId: string) {
  await db
    .insert(challengeCompletions)
    .values({ userId, challengeId })
    .onConflictDoNothing({
      target: [challengeCompletions.userId, challengeCompletions.challengeId]
    });
  return getCompletedChallengeIds(userId);
}
