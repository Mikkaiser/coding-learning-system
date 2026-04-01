import { SignJWT, jwtVerify } from "jose";
import type { UserRole } from "@/lib/users";

export const AUTH_COOKIE_NAME = "auth_token";

export type AuthUser = {
  id: string;
  username: string;
  role: UserRole;
};

type JwtPayload = AuthUser;

function getJwtSecret() {
  const secret = process.env.JWT_SECRET ?? "dev-secret-change-me";
  return new TextEncoder().encode(secret);
}

export async function signAuthToken(user: AuthUser) {
  return await new SignJWT(user as JwtPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getJwtSecret());
}

export async function verifyAuthToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    const id = payload?.id;
    const username = payload?.username;
    const role = payload?.role;
    if (typeof id !== "string") return null;
    if (typeof username !== "string") return null;
    if (role !== "admin" && role !== "student") return null;
    return { id, username, role };
  } catch {
    return null;
  }
}

