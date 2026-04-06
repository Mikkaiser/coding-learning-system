import bcrypt from "bcryptjs";
import { and, eq, ne } from "drizzle-orm";
import { db } from "@/src/db/client";
import { users } from "@/src/db/schema";

export type UserRole = "admin" | "student";

export type PublicUser = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
};

export type UserRow = {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: UserRole;
};

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  const t = normalizeEmail(email);
  if (t.length < 3 || t.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

async function findUserByEmailNormalized(email: string): Promise<UserRow | null> {
  const rows = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const r = rows[0];
  if (!r) return null;
  if (r.role !== "admin" && r.role !== "student") return null;
  return {
    id: r.id,
    username: r.username,
    email: r.email,
    passwordHash: r.passwordHash,
    role: r.role
  };
}

export async function findUserByUsername(username: string): Promise<UserRow | null> {
  const rows = await db.select().from(users).where(eq(users.username, username)).limit(1);
  const r = rows[0];
  if (!r) return null;
  if (r.role !== "admin" && r.role !== "student") return null;
  return {
    id: r.id,
    username: r.username,
    email: r.email,
    passwordHash: r.passwordHash,
    role: r.role
  };
}

export async function listStudents(): Promise<PublicUser[]> {
  const rows = await db
    .select({ id: users.id, username: users.username, email: users.email, role: users.role })
    .from(users)
    .where(eq(users.role, "student"));
  return rows.map((r) => ({
    id: r.id,
    username: r.username,
    email: r.email,
    role: r.role as UserRole
  }));
}

export async function createStudent(input: { username: string; email: string; password: string }) {
  if (!isValidEmail(input.email)) {
    return { ok: false as const, error: "Invalid email address." };
  }
  const email = normalizeEmail(input.email);

  const existingUser = await findUserByUsername(input.username);
  if (existingUser) {
    return { ok: false as const, error: "Username already exists." };
  }
  const existingEmail = await findUserByEmailNormalized(email);
  if (existingEmail) {
    return { ok: false as const, error: "Email already in use." };
  }

  const passwordHash = await bcrypt.hash(input.password, 10);
  const inserted = await db
    .insert(users)
    .values({
      username: input.username,
      email,
      passwordHash,
      role: "student"
    })
    .returning({
      id: users.id,
      username: users.username,
      email: users.email,
      role: users.role
    });

  const row = inserted[0];
  if (!row) return { ok: false as const, error: "Failed to create student." };
  return {
    ok: true as const,
    user: { id: row.id, username: row.username, email: row.email, role: row.role as UserRole }
  };
}

export async function updateStudent(
  id: string,
  patch: Partial<
    Pick<{ username: string; email: string; password: string }, "username" | "email" | "password">
  >
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

  if (typeof patch.email === "string") {
    if (!isValidEmail(patch.email)) {
      return { ok: false as const, error: "Invalid email address." };
    }
    const normalized = normalizeEmail(patch.email);
    const clash = await findUserByEmailNormalized(normalized);
    if (clash && clash.id !== id) {
      return { ok: false as const, error: "Email already in use." };
    }
  }

  const passwordHash =
    typeof patch.password === "string" ? await bcrypt.hash(patch.password, 10) : undefined;

  const updated = await db
    .update(users)
    .set({
      ...(typeof patch.username === "string" ? { username: patch.username } : {}),
      ...(typeof patch.email === "string" ? { email: normalizeEmail(patch.email) } : {}),
      ...(passwordHash ? { passwordHash } : {})
    })
    .where(and(eq(users.id, id), eq(users.role, "student")))
    .returning({
      id: users.id,
      username: users.username,
      email: users.email,
      role: users.role
    });

  const row = updated[0];
  if (!row) return { ok: false as const, error: "Student not found." };
  return {
    ok: true as const,
    user: { id: row.id, username: row.username, email: row.email, role: row.role as UserRole }
  };
}

export async function updateUserEmail(userId: string, rawEmail: string) {
  if (!isValidEmail(rawEmail)) {
    return { ok: false as const, error: "Invalid email address." };
  }
  const email = normalizeEmail(rawEmail);

  const clash = await db
    .select({ id: users.id })
    .from(users)
    .where(and(eq(users.email, email), ne(users.id, userId)))
    .limit(1);
  if (clash[0]) {
    return { ok: false as const, error: "Email already in use." };
  }

  const updated = await db
    .update(users)
    .set({ email })
    .where(eq(users.id, userId))
    .returning({
      id: users.id,
      username: users.username,
      email: users.email,
      role: users.role
    });

  const row = updated[0];
  if (!row) return { ok: false as const, error: "User not found." };
  if (row.role !== "admin" && row.role !== "student") {
    return { ok: false as const, error: "User not found." };
  }
  return {
    ok: true as const,
    user: { id: row.id, username: row.username, email: row.email, role: row.role as UserRole }
  };
}

const MIN_PASSWORD_LENGTH = 8;

export async function updateOwnPassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    return {
      ok: false as const,
      error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
    };
  }

  const rows = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  const row = rows[0];
  if (!row || (row.role !== "admin" && row.role !== "student")) {
    return { ok: false as const, error: "User not found." };
  }

  const match = await bcrypt.compare(currentPassword, row.passwordHash);
  if (!match) {
    return { ok: false as const, error: "Current password is incorrect." };
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await db.update(users).set({ passwordHash }).where(eq(users.id, userId));
  return { ok: true as const };
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
