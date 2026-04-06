"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "loginWelcome";

/** After login, ignore stale flags on /login longer than this (ms). */
const STALE_ON_LOGIN_MS = 60_000;

export function PostLoginWelcomeToast() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    let ts = 0;
    let data: { message?: string; role?: string; ts?: number } = {};
    try {
      data = JSON.parse(raw) as { message?: string; role?: string; ts?: number };
      ts = typeof data.ts === "number" ? data.ts : 0;
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }

    const age = Date.now() - ts;

    if (pathname === "/login") {
      if (age > STALE_ON_LOGIN_MS) {
        sessionStorage.removeItem(STORAGE_KEY);
      }
      return;
    }

    sessionStorage.removeItem(STORAGE_KEY);

    let msg = "Signed in successfully!";
    try {
      if (typeof data.message === "string") {
        msg = data.message;
      } else if (data.role === "admin") {
        msg = "Signed in — welcome back to the admin dashboard.";
      } else if (data.role === "student") {
        msg = "Signed in — welcome back. Let’s code!";
      }
    } catch {
      /* use default */
    }

    setMessage(msg);
    setOpen(true);
    const t = window.setTimeout(() => setOpen(false), 4200);
    return () => window.clearTimeout(t);
  }, [pathname]);

  if (!open || !message) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-6 sm:pt-8"
      role="status"
      aria-live="polite"
    >
      <div className="login-welcome-toast pointer-events-auto flex max-w-md items-start gap-3 rounded-2xl border border-success/35 bg-surface/95 px-4 py-3 shadow-lg shadow-black/25 backdrop-blur-sm sm:px-5 sm:py-4">
        <span className="mt-0.5 text-lg leading-none" aria-hidden="true">
          ✨
        </span>
        <p className="text-base font-medium leading-snug text-fg">{message}</p>
      </div>
    </div>
  );
}

export function setLoginWelcomeFlag(payload: { role: "admin" | "student" }) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ts: Date.now(),
      role: payload.role,
      message:
        payload.role === "admin"
          ? "You’re in! Welcome back — your dashboard is ready."
          : "You’re in! Welcome back — pick up where you left off."
    })
  );
}

export function clearLoginWelcomeFlag() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}
