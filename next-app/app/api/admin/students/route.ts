import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifyAuthToken } from "@/lib/auth";
import { createStudent, deleteStudent, listStudents, updateStudent } from "@/lib/users";

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
  const students = await listStudents();
  return NextResponse.json({
    students: students.map((s) => ({ id: s.id, username: s.username }))
  });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const username = (body as { username?: unknown })?.username;
  const password = (body as { password?: unknown })?.password;
  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Missing username or password." }, { status: 400 });
  }

  const created = await createStudent({ username, password });
  if (!created.ok) return NextResponse.json({ error: created.error }, { status: 400 });
  return NextResponse.json({ student: { id: created.user.id, username: created.user.username } });
}

export async function PUT(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const id = (body as { id?: unknown })?.id;
  const username = (body as { username?: unknown })?.username;
  const password = (body as { password?: unknown })?.password;
  if (typeof id !== "string") return NextResponse.json({ error: "Missing id." }, { status: 400 });

  const updated = await updateStudent(id, {
    ...(typeof username === "string" ? { username } : null),
    ...(typeof password === "string" ? { password } : null)
  });
  if (!updated.ok) return NextResponse.json({ error: updated.error }, { status: 400 });
  return NextResponse.json({ student: { id: updated.user.id, username: updated.user.username } });
}

export async function DELETE(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const id = (body as { id?: unknown })?.id;
  if (typeof id !== "string") return NextResponse.json({ error: "Missing id." }, { status: 400 });
  const deleted = await deleteStudent(id);
  if (!deleted.ok) return NextResponse.json({ error: deleted.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}

