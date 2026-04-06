import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_NAME, defaultOpenGraph, defaultTwitter, robotsPrivate } from "@/lib/seo";

const title = "Sign in";
const desc =
  "Sign in to Mikkaiser Coder to access Python coding challenges, modules, and your learning progress.";

export const metadata: Metadata = {
  title,
  description: desc,
  robots: robotsPrivate,
  openGraph: defaultOpenGraph({
    title: `${title} | ${SITE_NAME}`,
    description: desc,
    path: "/login"
  }),
  twitter: defaultTwitter({ title: `${title} | ${SITE_NAME}`, description: desc }),
  alternates: { canonical: "/login" }
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
