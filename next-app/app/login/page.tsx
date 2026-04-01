"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d: { user?: { role?: "admin" | "student" } | null }) => {
        if (d.user?.role === "admin") {
          router.replace("/admin/dashboard");
        } else if (d.user) {
          router.replace("/challenges");
        }
      })
      .catch(() => {});
  }, [router]);

  async function submit() {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Sign in failed.");
        return;
      }
      const me = (await fetch("/api/auth/me").then((r) => r.json()).catch(() => null)) as
        | { user?: { role?: "admin" | "student" } | null }
        | null;
      if (me?.user?.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/challenges");
      }
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <div className="rounded-xl border border-zinc-800 bg-[#111] p-6">
        <h1 className="text-lg font-semibold text-zinc-50">Sign in</h1>
        <p className="mt-1 text-sm text-zinc-400">Use your account credentials.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="block text-xs font-medium text-zinc-400">
              Username
            </label>
            <input
              id="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-[#0d0d0d] px-3 py-2 text-sm text-zinc-100 outline-none ring-zinc-600 focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-zinc-400">
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-[#0d0d0d] px-3 py-2 pr-11 text-sm text-zinc-100 outline-none ring-zinc-600 focus:ring-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 inline-flex items-center justify-center px-3 text-xs font-semibold text-zinc-300 transition hover:text-zinc-100"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </div>

        {error ? (
          <p className="mt-3 text-sm text-red-300" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="button"
          disabled={busy}
          onClick={submit}
          className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </div>
    </div>
  );
}
