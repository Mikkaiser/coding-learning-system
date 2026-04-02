"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar } from "@/components/Avatar";
import logo from "@/public/images/logo-mikkaiser-coder.png";

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
    <nav className="border-b border-border bg-surface/70 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/challenges"
          className="flex items-center gap-3 text-base font-semibold tracking-tight text-fg"
        >
          <Image
            src={logo}
            alt="Mikkaiser Coder logo"
            width={180}
            height={48}
            priority
            sizes="(max-width: 768px) 140px, 180px"
            className="h-8 w-auto sm:h-9"
          />
          <span className="leading-none text-fg">Mikkaiser Coder</span>
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Avatar username={user.username} role={user.role} />
              <span className="hidden text-base text-muted sm:inline">{user.username}</span>
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
