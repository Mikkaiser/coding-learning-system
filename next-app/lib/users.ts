import bcrypt from "bcryptjs";
import { and, eq } from "drizzle-orm";
import { db } from "@/src/db/client";
import { users } from "@/src/db/schema";

export type UserRole = "admin" | "student";

export type PublicUser = {
  id: string;
  username: string;
  role: UserRole;
};

export type UserRow = {
  id: string;
  username: string;
  passwordHash: string;
  role: UserRole;
};

export async function findUserByUsername(username: string): Promise<UserRow | null> {
  const rows = await db.select().from(users).where(eq(users.username, username)).limit(1);
  const r = rows[0];
  if (!r) return null;
  if (r.role !== "admin" && r.role !== "student") return null;
  return {
    id: r.id,
    username: r.username,
    passwordHash: r.passwordHash,
    role: r.role
  };
}

export async function listStudents(): Promise<PublicUser[]> {
  const rows = await db
    .select({ id: users.id, username: users.username, role: users.role })
    .from(users)
    .where(eq(users.role, "student"));
  return rows.map((r) => ({
    id: r.id,
    username: r.username,
    role: r.role as UserRole
  }));
}

export async function createStudent(input: { username: string; password: string }) {
  const existing = await findUserByUsername(input.username);
  if (existing) {
    return { ok: false as const, error: "Username already exists." };
  }
  const passwordHash = await bcrypt.hash(input.password, 10);
  const inserted = await db
    .insert(users)
    .values({
      username: input.username,
      passwordHash,
      role: "student"
    })
    .returning({ id: users.id, username: users.username, role: users.role });

  const row = inserted[0];
  if (!row) return { ok: false as const, error: "Failed to create student." };
  return {
    ok: true as const,
    user: { id: row.id, username: row.username, role: row.role as UserRole }
  };
}

export async function updateStudent(
  id: string,
  patch: Partial<Pick<{ username: string; password: string }, "username" | "password">>
) {
  const existing = await db
    .select()
    .from(users)
    .where(and(eq(users.id, id), eq(users.role, "student")))
    .limit(1);
  if (!existing[0]) {
    return { ok: false as const, error: "Student not found." };
  }

  if (typeof patch.username === "string") {
    const clash = await findUserByUsername(patch.username);
    if (clash && clash.id !== id) {
      return { ok: false as const, error: "Username already exists." };
    }
  }

  const passwordHash =
    typeof patch.password === "string" ? await bcrypt.hash(patch.password, 10) : undefined;

  const updated = await db
    .update(users)
    .set({
      ...(typeof patch.username === "string" ? { username: patch.username } : {}),
      ...(passwordHash ? { passwordHash } : {})
    })
    .where(and(eq(users.id, id), eq(users.role, "student")))
    .returning({ id: users.id, username: users.username, role: users.role });

  const row = updated[0];
  if (!row) return { ok: false as const, error: "Student not found." };
  return {
    ok: true as const,
    user: { id: row.id, username: row.username, role: row.role as UserRole }
  };
}

export async function deleteStudent(id: string) {
  const deleted = await db
    .delete(users)
    .where(and(eq(users.id, id), eq(users.role, "student")))
    .returning({ id: users.id });

  if (!deleted.length) {
    return { ok: false as const, error: "Student not found." };
  }
  return { ok: true as const };
}
