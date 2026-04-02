"use client";

import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CHALLENGES } from "@/lib/challenges/catalog";

type StudentProgress = {
  id: string;
  username: string;
  completedChallengeIds: string[];
  completedCount: number;
  totalChallenges: number;
  percentComplete: number;
  totalAttempts: number;
  attemptsPerChallenge: { challengeId: string; attempts: number }[];
  lastLogin: string | null;
  rank: number;
};

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full border border-border bg-bg">
      <div
        className="h-full bg-brand-secondary"
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </div>
  );
}

export default function AdminDashboardPage() {
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/progress")
      .then((r) => r.json())
      .then((d: { students?: StudentProgress[]; error?: string }) => {
        if (!Array.isArray(d.students)) {
          setError(d.error ?? "Failed to load dashboard.");
          return;
        }
        setStudents(d.students);
      })
      .catch(() => setError("Failed to load dashboard."));
  }, []);

  const totalChallenges = CHALLENGES.length;
  const classAvg = useMemo(() => {
    if (!students.length) return 0;
    const sum = students.reduce((acc, s) => acc + s.percentComplete, 0);
    return Math.round(sum / students.length);
  }, [students]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-fg">Admin dashboard</h1>
            <p className="mt-2 text-base text-muted">
              Track student progress across {totalChallenges} challenges.
            </p>
          </div>
          <a
            href="/admin/students"
            className="btn btn-secondary h-control-md px-4"
          >
            Manage students
          </a>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="card p-4">
            <div className="text-sm font-medium text-muted">Students</div>
            <div className="mt-2 text-2xl font-semibold text-fg">{students.length}</div>
          </div>
          <div className="card p-4">
            <div className="text-sm font-medium text-muted">Class average</div>
            <div className="mt-2 text-2xl font-semibold text-fg">{classAvg}%</div>
          </div>
          <div className="card p-4">
            <div className="text-sm font-medium text-muted">Total challenges</div>
            <div className="mt-2 text-2xl font-semibold text-fg">{totalChallenges}</div>
          </div>
        </div>

        {error ? (
          <div className="mt-6 rounded-xl border border-danger/40 bg-danger/10 p-4 text-base text-danger">
            {error}
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {students.map((s) => (
            <div key={s.id} className="card p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-base font-semibold text-fg">{s.username}</div>
                  <div className="mt-1 text-sm text-muted">
                    Rank #{s.rank} · {s.completedCount}/{s.totalChallenges} completed ·{" "}
                    {s.totalAttempts} attempts
                  </div>
                  {s.lastLogin ? (
                    <div className="mt-1 text-sm text-muted/80">
                      Last login: {new Date(s.lastLogin).toLocaleString()}
                    </div>
                  ) : (
                    <div className="mt-1 text-sm text-muted/80">Last login: —</div>
                  )}
                </div>
                <div className="text-base font-semibold text-brand-secondary">{s.percentComplete}%</div>
              </div>

              <div className="mt-3">
                <ProgressBar percent={s.percentComplete} />
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold text-fg">Completed challenges</div>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {s.completedChallengeIds.length ? (
                    s.completedChallengeIds.map((id) => (
                      <li
                        key={id}
                        className="rounded-full border border-border bg-bg px-3 py-1 text-sm text-fg"
                      >
                        {id}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-muted/80">(none yet)</li>
                  )}
                </ul>
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold text-fg">Attempts per challenge</div>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  {s.attemptsPerChallenge.length ? (
                    s.attemptsPerChallenge.map((a) => (
                      <li key={a.challengeId} className="flex justify-between gap-2">
                        <span className="font-mono text-fg/90">{a.challengeId}</span>
                        <span>{a.attempts}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-muted/80">(no attempts yet)</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
