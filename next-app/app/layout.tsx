import "./globals.css";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PostLoginWelcomeToast } from "@/components/PostLoginWelcomeToast";

export const metadata: Metadata = {
  title: "Mikkaiser Coder",
  description: "Python coding challenges with Judge0",
  manifest: "/site.webmanifest",
  themeColor: "#08080c",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" }
    ],
    apple: "/apple-touch-icon.png"
  }
};

/** Server-render HTML on each request (auth-aware layouts use cookies). */
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <PostLoginWelcomeToast />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

