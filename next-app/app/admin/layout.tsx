import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { SITE_NAME, robotsPrivate } from "@/lib/seo";
import { getSessionUser } from "@/lib/server/session";

const sectionTitle = "Admin";

/** Instructor area — not indexed; child routes set specific titles. */
export const metadata: Metadata = {
  title: { default: sectionTitle, template: `%s | ${sectionTitle} | ${SITE_NAME}` },
  robots: robotsPrivate
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
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
