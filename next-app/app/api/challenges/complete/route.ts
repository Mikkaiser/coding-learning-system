import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifyAuthToken } from "@/lib/auth";
import { markComplete } from "@/lib/completions";

export async function POST(req: Request) {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await verifyAuthToken(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "student") {
    return NextResponse.json({ completedChallengeIds: [] });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const challengeId = (body as { challengeId?: unknown })?.challengeId;
  if (typeof challengeId !== "string") {
    return NextResponse.json({ error: "Missing challengeId." }, { status: 400 });
  }

  const list = await markComplete(user.id, challengeId);
  return NextResponse.json({ completedChallengeIds: list });
}
