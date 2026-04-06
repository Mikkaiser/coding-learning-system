import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { robotsPrivate } from "@/lib/seo";
import { getSessionUser } from "@/lib/server/session";

/** Logged-in course area — not indexed; per-route titles come from each page. */
export const metadata: Metadata = {
  robots: robotsPrivate
};

export default async function ChallengesLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();
  const initialUser = user
    ? { id: user.id, username: user.username, role: user.role, email: user.email }
    : null;

  return (
    <>
      <Navbar initialUser={initialUser} />
      {children}
    </>
  );
}
