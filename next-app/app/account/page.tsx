"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [initialEmail, setInitialEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [busy, setBusy] = useState(false);
  const [passwordBusy, setPasswordBusy] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d: { user?: { email?: string } | null }) => {
        const e = d.user?.email;
        if (typeof e === "string") {
          setEmail(e);
          setInitialEmail(e);
        }
      })
      .catch(() => {});
  }, []);

  async function onSubmitEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; user?: { email?: string } };
      if (!res.ok) {
        setError(data.error ?? "Could not update email.");
        return;
      }
      if (typeof data.user?.email === "string") {
        setInitialEmail(data.user.email);
        setEmail(data.user.email);
      }
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  async function onSubmitPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }

    setPasswordBusy(true);
    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setPasswordError(data.error ?? "Could not update password.");
        return;
      }
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setPasswordError("Network error.");
    } finally {
      setPasswordBusy(false);
    }
  }

  const loaded = initialEmail !== null;
  const noEmailChanges = loaded && email.trim() === initialEmail.trim();

  return (
    <main className="container-app py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-fg">Account</h1>
      <p className="mt-2 text-base text-muted">
        Update your email and password. Email must be unique across all accounts.
      </p>

      <div className="card mt-6 max-w-md p-6">
        <h2 className="text-lg font-semibold text-fg">Email</h2>
        <form className="mt-4" onSubmit={onSubmitEmail} noValidate>
          <label htmlFor="email" className="block text-sm font-medium text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input mt-1"
            required
          />

          {error ? (
            <p className="mt-3 text-base text-danger" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={busy || !loaded || noEmailChanges}
            className="btn btn-primary mt-6"
          >
            {busy ? "Saving…" : "Save email"}
          </button>
        </form>
      </div>

      <div className="card mt-6 max-w-md p-6">
        <h2 className="text-lg font-semibold text-fg">Password</h2>
        <p className="mt-1 text-sm text-muted">
          Enter your current password, then choose a new one (at least 8 characters).
        </p>
        <form className="mt-4 space-y-4" onSubmit={onSubmitPassword} noValidate>
          <div>
            <label htmlFor="current-password" className="block text-sm font-medium text-muted">
              Current password
            </label>
            <div className="relative mt-1">
              <input
                id="current-password"
                name="currentPassword"
                type={showCurrent ? "text" : "password"}
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input pr-12"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center rounded-r-lg text-sm font-semibold text-muted transition hover:text-fg"
                aria-label={showCurrent ? "Hide password" : "Show password"}
              >
                {showCurrent ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-muted">
              New password
            </label>
            <div className="relative mt-1">
              <input
                id="new-password"
                name="newPassword"
                type={showNew ? "text" : "password"}
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input pr-12"
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center rounded-r-lg text-sm font-semibold text-muted transition hover:text-fg"
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-muted">
              Confirm new password
            </label>
            <div className="relative mt-1">
              <input
                id="confirm-password"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center rounded-r-lg text-sm font-semibold text-muted transition hover:text-fg"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {passwordError ? (
            <p className="text-base text-danger" role="alert">
              {passwordError}
            </p>
          ) : null}
          {passwordSuccess ? (
            <p className="text-base text-success" role="status">
              Password updated successfully.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={
              passwordBusy ||
              !currentPassword ||
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword
            }
            className="btn btn-primary w-full sm:w-auto"
          >
            {passwordBusy ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>
    </main>
  );
}
