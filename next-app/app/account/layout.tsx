import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { SITE_NAME, defaultOpenGraph, defaultTwitter, robotsPrivate } from "@/lib/seo";
import { getSessionUser } from "@/lib/server/session";

const title = "Account";
const desc = "Update your email and manage your Mikkaiser Coder profile settings.";

export const metadata: Metadata = {
  title,
  description: desc,
  robots: robotsPrivate,
  openGraph: defaultOpenGraph({
    title: `${title} | ${SITE_NAME}`,
    description: desc,
    path: "/account"
  }),
  twitter: defaultTwitter({ title: `${title} | ${SITE_NAME}`, description: desc }),
  alternates: { canonical: "/account" }
};

export default async function AccountLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const initialUser = {
    id: user.id,
    username: user.username,
    role: user.role,
    email: user.email
  };

  return (
    <>
      <Navbar initialUser={initialUser} />
      {children}
    </>
  );
}
