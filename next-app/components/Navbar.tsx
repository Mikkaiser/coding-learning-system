"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/Avatar";
import { clearLoginWelcomeFlag } from "@/components/PostLoginWelcomeToast";
import { LogoLinkToChallenges } from "@/components/LogoLinkToChallenges";

type SessionUser = {
  id: string;
  username: string;
  email: string;
  role: "admin" | "student";
};

export function Navbar({ initialUser }: { initialUser?: SessionUser | null }) {
  const [user, setUser] = useState<SessionUser | null>(initialUser ?? null);

  useEffect(() => {
    if (initialUser !== undefined) {
      setUser(initialUser);
    }
  }, [initialUser]);

  useEffect(() => {
    if (initialUser !== undefined) return;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d: { user?: SessionUser | null }) => setUser(d.user ?? null))
      .catch(() => setUser(null));
  }, [initialUser]);

  async function signOut() {
    clearLoginWelcomeFlag();
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    window.location.href = "/login";
  }

  return (
    <nav className="sticky top-0 z-50 w-full shrink-0 border-b border-border bg-surface/90 backdrop-blur-md">
      <div className="container-app flex items-center justify-between gap-4 py-3">
        <LogoLinkToChallenges variant="navbar" />
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Avatar username={user.username} role={user.role} />
              <Link
                href="/account"
                className="inline-flex h-control-sm items-center rounded-lg border border-border bg-surface px-3 text-sm font-medium text-fg transition hover:bg-surface/70"
              >
                Account
              </Link>
              {user.role === "admin" ? (
                <Link
                  href="/admin/dashboard"
                  className="hidden h-control-sm items-center rounded-lg border border-border bg-surface px-3 text-sm font-medium text-fg transition hover:bg-surface/70 sm:inline-flex"
                >
                  Dashboard
                </Link>
              ) : null}
              <button
                type="button"
                onClick={signOut}
                className="h-control-sm rounded-lg border border-border bg-surface px-3 text-sm font-medium text-fg transition hover:bg-surface/70"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="h-control-sm rounded-lg border border-border bg-surface px-3 text-sm font-medium text-fg transition hover:bg-surface/70"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
