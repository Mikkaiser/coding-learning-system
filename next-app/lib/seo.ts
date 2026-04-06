import type { Metadata } from "next";

export const SITE_NAME = "Mikkaiser Coder";

export const DEFAULT_DESCRIPTION =
  "Learn Python with interactive coding challenges, instant Judge0 feedback, and structured modules from basics to advanced topics.";

/** Base URL for canonical links and Open Graph (set NEXT_PUBLIC_SITE_URL in production). */
export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
  try {
    const u = new URL(raw.endsWith("/") ? raw.slice(0, -1) : raw);
    return u;
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const robotsPublic = { index: true, follow: true } as const;
export const robotsPrivate = { index: false, follow: false } as const;

const defaultOgImage = "/android-chrome-512x512.png";

export function defaultOpenGraph(overrides: {
  title: string;
  description: string;
  path?: string;
}): NonNullable<Metadata["openGraph"]> {
  const base = getSiteUrl();
  const url = overrides.path ? new URL(overrides.path, base).toString() : base.toString();
  return {
    type: "website",
    locale: "en_US",
    url,
    siteName: SITE_NAME,
    title: overrides.title,
    description: overrides.description,
    images: [
      {
        url: defaultOgImage,
        width: 512,
        height: 512,
        alt: SITE_NAME
      }
    ]
  };
}

export function defaultTwitter(overrides: { title: string; description: string }): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title: overrides.title,
    description: overrides.description,
    images: [defaultOgImage]
  };
}

export function websiteJsonLd() {
  const base = getSiteUrl().origin;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: base,
    inLanguage: "en-US"
  };
}
