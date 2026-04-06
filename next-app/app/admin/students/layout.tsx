import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_NAME, defaultOpenGraph, defaultTwitter, robotsPrivate } from "@/lib/seo";

const title = "Manage students";
const desc =
  "Create, edit, and remove student accounts for your Mikkaiser Coder classroom. Set usernames, emails, and passwords.";

export const metadata: Metadata = {
  title,
  description: desc,
  robots: robotsPrivate,
  openGraph: defaultOpenGraph({
    title: `${title} | ${SITE_NAME}`,
    description: desc,
    path: "/admin/students"
  }),
  twitter: defaultTwitter({ title: `${title} | ${SITE_NAME}`, description: desc }),
  alternates: { canonical: "/admin/students" }
};

export default function AdminStudentsLayout({ children }: { children: ReactNode }) {
  return children;
}
