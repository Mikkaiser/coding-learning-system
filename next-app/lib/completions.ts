import { eq } from "drizzle-orm";
import { db } from "@/src/db/client";
import { challengeCompletions } from "@/src/db/schema";

export type ChallengeProgress = {
  challengeIds: string[];
  solutions: Record<string, string>;
};

export async function getChallengeProgress(userId: string): Promise<ChallengeProgress> {
  const rows = await db
    .select({
      challengeId: challengeCompletions.challengeId,
      submittedCode: challengeCompletions.submittedCode
    })
    .from(challengeCompletions)
    .where(eq(challengeCompletions.userId, userId));

  const solutions: Record<string, string> = {};
  for (const r of rows) {
    if (r.submittedCode != null && r.submittedCode.length > 0) {
      solutions[r.challengeId] = r.submittedCode;
    }
  }
  return {
    challengeIds: rows.map((r) => r.challengeId),
    solutions
  };
}

export async function getCompletedChallengeIds(userId: string): Promise<string[]> {
  const { challengeIds } = await getChallengeProgress(userId);
  return challengeIds;
}

export async function markComplete(
  userId: string,
  challengeId: string,
  options?: { submittedCode?: string }
) {
  const code = options?.submittedCode;
  const base = { userId, challengeId };

  if (typeof code === "string") {
    await db
      .insert(challengeCompletions)
      .values({ ...base, submittedCode: code })
      .onConflictDoUpdate({
        target: [challengeCompletions.userId, challengeCompletions.challengeId],
        set: { submittedCode: code }
      });
  } else {
    await db
      .insert(challengeCompletions)
      .values(base)
      .onConflictDoNothing({
        target: [challengeCompletions.userId, challengeCompletions.challengeId]
      });
  }
  return getCompletedChallengeIds(userId);
}
