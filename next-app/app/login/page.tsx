"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import { setLoginWelcomeFlag } from "@/components/PostLoginWelcomeToast";
import logo from "@/public/images/logo-mikkaiser-coder.png";

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
      const role = me?.user?.role;
      if (role === "admin" || role === "student") {
        setLoginWelcomeFlag({ role });
      }
      if (role === "admin") {
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

  async function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await submit();
  }

  return (
    <main className="container-app flex flex-1 flex-col justify-center py-10">
      <div className="mx-auto w-full max-w-md">
        <div className="card p-6">
          <div className="mb-5 flex justify-center">
            <Image
              src={logo}
              alt="Mikkaiser Coder logo"
              width={384}
              height={144}
              priority
              sizes="(max-width: 768px) 312px, 384px"
              className="h-[101px] w-auto"
            />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-fg">Sign in</h1>
          <p className="mt-1 text-base text-muted">Use your account credentials.</p>

          <form className="mt-6" onSubmit={onSubmitForm} noValidate>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-muted">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input mt-1"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-muted">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center rounded-r-lg text-sm font-semibold text-muted transition hover:text-fg"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>

            {error ? (
              <p className="mt-3 text-base text-danger" role="alert">
                {error}
              </p>
            ) : null}

            <div className="mt-6 w-full">
              <div className="glow-wrap w-full">
                <div className="glow" aria-hidden="true" />
                <div className="border-ring" aria-hidden="true">
                  <div className="border-ring-inner" />
                </div>
                <button
                  type="submit"
                  disabled={busy}
                  className="btn btn-primary relative z-0 w-full rounded-full"
                >
                  {busy ? "Signing in…" : "Sign in"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
