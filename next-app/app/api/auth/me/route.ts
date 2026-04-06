import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { getSessionUser } from "@/lib/server/session";
import { updateOwnPassword, updateUserEmail } from "@/lib/users";

export async function GET() {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }
  const user = await getSessionUser();
  return NextResponse.json({ user });
}

export async function PATCH(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const b = body as {
    email?: unknown;
    currentPassword?: unknown;
    newPassword?: unknown;
  };

  const email = b.email;
  const currentPassword = b.currentPassword;
  const newPassword = b.newPassword;

  const wantsEmail = typeof email === "string";
  const wantsPassword =
    typeof newPassword === "string" && (newPassword as string).length > 0;

  if (!wantsEmail && !wantsPassword) {
    return NextResponse.json(
      { error: "Provide email and/or newPassword (with currentPassword)." },
      { status: 400 }
    );
  }

  if (wantsPassword) {
    if (typeof currentPassword !== "string" || !currentPassword.length) {
      return NextResponse.json(
        { error: "Current password is required to set a new password." },
        { status: 400 }
      );
    }
    const pw = await updateOwnPassword(user.id, currentPassword, newPassword);
    if (!pw.ok) {
      return NextResponse.json({ error: pw.error }, { status: 400 });
    }
  }

  if (wantsEmail) {
    const updated = await updateUserEmail(user.id, email);
    if (!updated.ok) {
      return NextResponse.json({ error: updated.error }, { status: 400 });
    }
    return NextResponse.json({
      user: {
        id: updated.user.id,
        username: updated.user.username,
        role: updated.user.role,
        email: updated.user.email
      }
    });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email
    }
  });
}
