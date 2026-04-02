import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifyAuthToken } from "@/lib/auth";
import { getChallengeProgress } from "@/lib/completions";

export async function GET() {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await verifyAuthToken(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "student") {
    return NextResponse.json({ completedChallengeIds: [] });
  }

  const { challengeIds, solutions } = await getChallengeProgress(user.id);
  return NextResponse.json({ completedChallengeIds: challengeIds, solutions });
}

