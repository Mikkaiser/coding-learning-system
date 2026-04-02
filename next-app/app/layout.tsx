import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mikkaiser Coder",
  description: "Python coding challenges with Judge0"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}

