"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/Avatar";

type SessionUser = {
  id: string;
  username: string;
  role: "admin" | "student";
};

export function Navbar() {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d: { user?: SessionUser | null }) => setUser(d.user ?? null))
      .catch(() => setUser(null));
  }, []);

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    window.location.href = "/login";
  }

  return (
    <nav className="border-b border-zinc-800 bg-[#111]">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/challenges" className="text-sm font-semibold tracking-tight text-zinc-100">
          Mikkaiser Coder
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Avatar username={user.username} role={user.role} />
              <span className="hidden text-sm text-zinc-300 sm:inline">{user.username}</span>
              {user.role === "admin" ? (
                <Link
                  href="/admin/dashboard"
                  className="hidden rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800 sm:inline"
                >
                  Dashboard
                </Link>
              ) : null}
              <button
                type="button"
                onClick={signOut}
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
