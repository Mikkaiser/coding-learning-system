import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifyAuthToken } from "@/lib/auth";
import { recordAttempt } from "@/lib/attempts";

export async function POST(req: Request) {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await verifyAuthToken(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "student") {
    return NextResponse.json({ ok: true });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const challengeId = (body as { challengeId?: unknown })?.challengeId;
  const success = (body as { success?: unknown })?.success;
  if (typeof challengeId !== "string" || typeof success !== "boolean") {
    return NextResponse.json({ error: "Missing challengeId or success." }, { status: 400 });
  }

  await recordAttempt(user.id, challengeId, success);
  return NextResponse.json({ ok: true });
}
