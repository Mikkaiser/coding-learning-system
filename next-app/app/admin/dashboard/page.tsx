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
    <div className="h-2 w-full overflow-hidden rounded-full border border-zinc-800 bg-zinc-950">
      <div
        className="h-full bg-emerald-600"
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
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
              Admin dashboard
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Track student progress across {totalChallenges} challenges.
            </p>
          </div>
          <a
            href="/admin/students"
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800"
          >
            Manage students
          </a>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 bg-[#111] p-4">
            <div className="text-xs font-medium text-zinc-400">Students</div>
            <div className="mt-2 text-2xl font-semibold text-zinc-50">{students.length}</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-[#111] p-4">
            <div className="text-xs font-medium text-zinc-400">Class average</div>
            <div className="mt-2 text-2xl font-semibold text-zinc-50">{classAvg}%</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-[#111] p-4">
            <div className="text-xs font-medium text-zinc-400">Total challenges</div>
            <div className="mt-2 text-2xl font-semibold text-zinc-50">{totalChallenges}</div>
          </div>
        </div>

        {error ? (
          <div className="mt-6 rounded-xl border border-red-800/60 bg-red-950/30 p-4 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {students.map((s) => (
            <div key={s.id} className="rounded-xl border border-zinc-800 bg-[#111] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-zinc-100">{s.username}</div>
                  <div className="mt-1 text-xs text-zinc-400">
                    Rank #{s.rank} · {s.completedCount}/{s.totalChallenges} completed ·{" "}
                    {s.totalAttempts} attempts
                  </div>
                  {s.lastLogin ? (
                    <div className="mt-1 text-xs text-zinc-500">
                      Last login: {new Date(s.lastLogin).toLocaleString()}
                    </div>
                  ) : (
                    <div className="mt-1 text-xs text-zinc-500">Last login: —</div>
                  )}
                </div>
                <div className="text-sm font-semibold text-emerald-200">
                  {s.percentComplete}%
                </div>
              </div>

              <div className="mt-3">
                <ProgressBar percent={s.percentComplete} />
              </div>

              <div className="mt-4">
                <div className="text-xs font-semibold text-zinc-300">Completed challenges</div>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {s.completedChallengeIds.length ? (
                    s.completedChallengeIds.map((id) => (
                      <li
                        key={id}
                        className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-200"
                      >
                        {id}
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-zinc-500">(none yet)</li>
                  )}
                </ul>
              </div>

              <div className="mt-4">
                <div className="text-xs font-semibold text-zinc-300">Attempts per challenge</div>
                <ul className="mt-2 space-y-1 text-xs text-zinc-400">
                  {s.attemptsPerChallenge.length ? (
                    s.attemptsPerChallenge.map((a) => (
                      <li key={a.challengeId} className="flex justify-between gap-2">
                        <span className="font-mono text-zinc-300">{a.challengeId}</span>
                        <span>{a.attempts}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-zinc-500">(no attempts yet)</li>
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
