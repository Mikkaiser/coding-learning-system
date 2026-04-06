import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE_NAME, defaultOpenGraph, defaultTwitter, robotsPrivate } from "@/lib/seo";

const desc = "Admin area for Mikkaiser Coder: view the dashboard or manage students.";

export const metadata: Metadata = {
  title: "Admin",
  description: desc,
  robots: robotsPrivate,
  openGraph: defaultOpenGraph({
    title: `Admin | ${SITE_NAME}`,
    description: desc,
    path: "/admin"
  }),
  twitter: defaultTwitter({ title: `Admin | ${SITE_NAME}`, description: desc }),
  alternates: { canonical: "/admin" }
};

export default function AdminPage() {
  redirect("/admin/dashboard");
}

