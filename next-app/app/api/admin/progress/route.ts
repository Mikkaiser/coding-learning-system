import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifyAuthToken } from "@/lib/auth";
import { getAttemptsPerChallenge, getTotalAttempts } from "@/lib/attempts";
import { getCompletedChallengeIds } from "@/lib/completions";
import { getLastLoginAt } from "@/lib/login-history";
import { CHALLENGES, MODULES } from "@/lib/challenges/catalog";
import { listStudents } from "@/lib/users";

async function requireAdmin() {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  const user = await verifyAuthToken(token);
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const totalChallenges = CHALLENGES.length;
  const students = await listStudents();

  const rows = await Promise.all(
    students.map(async (s) => {
      const completedIds = await getCompletedChallengeIds(s.id);
      const completedCount = completedIds.length;
      const percentComplete =
        totalChallenges === 0 ? 0 : Math.round((completedCount / totalChallenges) * 100);
      const attemptsPerChallenge = await getAttemptsPerChallenge(s.id);
      const totalAttempts = await getTotalAttempts(s.id);
      const last = await getLastLoginAt(s.id);

      return {
        id: s.id,
        username: s.username,
        completedChallengeIds: completedIds,
        completedCount,
        totalChallenges,
        percentComplete,
        totalAttempts,
        attemptsPerChallenge,
        lastLogin: last ? last.toISOString() : null
      };
    })
  );

  const sorted = [...rows].sort(
    (a, b) =>
      b.completedCount - a.completedCount || a.username.localeCompare(b.username)
  );

  const withRank = sorted.map((r, idx) => ({ ...r, rank: idx + 1 }));

  const moduleStats = MODULES.map((mod) => {
    const challengeIds = mod.challenges.map((c) => c.id);
    const studentsCompleted = withRank.filter((s) =>
      challengeIds.every((id) => s.completedChallengeIds.includes(id))
    ).length;
    return {
      moduleId: mod.id,
      title: mod.title,
      totalChallenges: challengeIds.length,
      studentsCompleted
    };
  });

  return NextResponse.json({ students: withRank, moduleStats });
}
