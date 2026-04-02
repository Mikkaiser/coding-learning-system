"use client";

import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";

type Student = { id: string; username: string };

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showCreatePassword, setShowCreatePassword] = useState(false);

  const [editId, setEditId] = useState<string | null>(null);
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [showEditPassword, setShowEditPassword] = useState(false);

  async function load() {
    setError(null);
    const res = await fetch("/api/admin/students");
    const data = (await res.json().catch(() => ({}))) as { students?: Student[]; error?: string };
    if (!res.ok) {
      setError(data.error ?? "Failed to load students.");
      return;
    }
    setStudents(Array.isArray(data.students) ? data.students : []);
  }

  useEffect(() => {
    load().catch(() => setError("Failed to load students."));
  }, []);

  const sorted = useMemo(
    () => [...students].sort((a, b) => a.username.localeCompare(b.username)),
    [students]
  );

  async function create() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Failed to create student.");
        return;
      }
      setUsername("");
      setPassword("");
      setShowCreatePassword(false);
      await load();
    } catch {
      setError("Failed to create student.");
    } finally {
      setBusy(false);
    }
  }

  async function startEdit(s: Student) {
    setEditId(s.id);
    setEditUsername(s.username);
    setEditPassword("");
    setShowEditPassword(false);
  }

  async function saveEdit() {
    if (!editId) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/students", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editId,
          username: editUsername,
          ...(editPassword.trim().length ? { password: editPassword } : null)
        })
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Failed to update student.");
        return;
      }
      setEditId(null);
      setEditUsername("");
      setEditPassword("");
      await load();
    } catch {
      setError("Failed to update student.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/students", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Failed to delete student.");
        return;
      }
      await load();
    } catch {
      setError("Failed to delete student.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-fg">Manage students</h1>
            <p className="mt-2 text-base text-muted">Create, update, and delete student accounts.</p>
          </div>
          <a
            href="/admin/dashboard"
            className="btn btn-secondary h-control-md px-4"
          >
            Back to dashboard
          </a>
        </div>

        {error ? (
          <div className="mt-6 rounded-xl border border-danger/40 bg-danger/10 p-4 text-base text-danger">
            {error}
          </div>
        ) : null}

        <div className="card mt-6 p-5">
          <div className="text-base font-semibold text-fg">Create student</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-muted">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted">Password</label>
              <div className="relative mt-1">
                <input
                  type={showCreatePassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowCreatePassword((v) => !v)}
                  className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center rounded-r-lg text-sm font-semibold text-muted transition hover:text-fg"
                  aria-label={showCreatePassword ? "Hide password" : "Show password"}
                >
                  {showCreatePassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={create}
            className="btn btn-primary mt-4"
          >
            Create
          </button>
        </div>

        <div className="card mt-6 p-5">
          <div className="text-base font-semibold text-fg">Students</div>
          <div className="mt-4 space-y-3">
            {sorted.length ? (
              sorted.map((s) => {
                const isEditing = editId === s.id;
                return (
                  <div key={s.id} className="rounded-lg border border-border bg-bg/30 p-4">
                    {!isEditing ? (
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="text-base font-medium text-fg">{s.username}</div>
                          <div className="mt-1 text-sm text-muted/80">id: {s.id}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => startEdit(s)}
                            className="btn btn-secondary h-control-sm px-3 text-sm disabled:opacity-60"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => remove(s.id)}
                            className="btn h-control-sm border border-danger/50 bg-danger/10 px-3 text-sm font-semibold text-danger transition hover:bg-danger/15 disabled:opacity-60"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium text-muted">Username</label>
                            <input
                              value={editUsername}
                              onChange={(e) => setEditUsername(e.target.value)}
                              className="input mt-1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-muted">
                              New password (optional)
                            </label>
                            <div className="relative mt-1">
                              <input
                                type={showEditPassword ? "text" : "password"}
                                value={editPassword}
                                onChange={(e) => setEditPassword(e.target.value)}
                                className="input pr-12"
                              />
                              <button
                                type="button"
                                onClick={() => setShowEditPassword((v) => !v)}
                                className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center rounded-r-lg text-sm font-semibold text-muted transition hover:text-fg"
                                aria-label={showEditPassword ? "Hide password" : "Show password"}
                              >
                                {showEditPassword ? "Hide" : "Show"}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            disabled={busy}
                            onClick={saveEdit}
                            className="btn btn-primary"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => setEditId(null)}
                            className="btn btn-secondary"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-base text-muted/80">No students yet.</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

