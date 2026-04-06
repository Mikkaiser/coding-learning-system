import type { Metadata } from "next";
import Link from "next/link";
import { getAdminDashboardPayload } from "@/lib/admin-dashboard-data";
import { CHALLENGES } from "@/lib/challenges/catalog";
import { SITE_NAME, defaultOpenGraph, defaultTwitter } from "@/lib/seo";

const pageTitle = "Dashboard";
const pageDesc =
  "View class-wide progress, module completion stats, and per-student challenge activity for your Mikkaiser Coder classroom.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDesc,
  openGraph: defaultOpenGraph({
    title: `${pageTitle} | Admin | ${SITE_NAME}`,
    description: pageDesc,
    path: "/admin/dashboard"
  }),
  twitter: defaultTwitter({
    title: `${pageTitle} | Admin | ${SITE_NAME}`,
    description: pageDesc
  }),
  alternates: { canonical: "/admin/dashboard" }
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

export default async function AdminDashboardPage() {
  let students: Awaited<ReturnType<typeof getAdminDashboardPayload>>["students"] = [];
  let moduleStats: Awaited<ReturnType<typeof getAdminDashboardPayload>>["moduleStats"] = [];
  let error: string | null = null;

  try {
    const data = await getAdminDashboardPayload();
    students = data.students;
    moduleStats = data.moduleStats;
  } catch {
    error = "Failed to load dashboard.";
  }

  const totalChallenges = CHALLENGES.length;
  const classAvg =
    students.length === 0
      ? 0
      : Math.round(students.reduce((acc, s) => acc + s.percentComplete, 0) / students.length);

  return (
    <main className="container-app py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-fg">Admin dashboard</h1>
          <p className="mt-2 text-base text-muted">
            Track student progress across {totalChallenges} challenges.{" "}
            <Link
              href="/challenges"
              prefetch={false}
              className="font-medium text-brand-accent underline-offset-4 hover:text-fg hover:underline"
            >
              View course modules
            </Link>{" "}
            (same page students use).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/challenges" prefetch={false} className="btn btn-secondary h-control-md px-4">
            Course modules
          </Link>
          <Link href="/admin/students" className="btn btn-secondary h-control-md px-4">
            Manage students
          </Link>
        </div>
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

      {!error && moduleStats.length ? (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-fg">Module completion</h2>
          <p className="mt-1 text-sm text-muted">
            How many students have finished every challenge in each module.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[38rem] text-left text-sm">
              <thead className="border-b border-border bg-surface">
                <tr>
                  <th className="px-4 py-3 font-medium text-muted">Module</th>
                  <th className="px-4 py-3 font-medium text-muted">Title</th>
                  <th className="px-4 py-3 font-medium text-muted">Challenges</th>
                  <th className="px-4 py-3 font-medium text-muted">Students done</th>
                </tr>
              </thead>
              <tbody>
                {moduleStats.map((m) => (
                  <tr key={m.moduleId} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 font-mono text-fg">{m.moduleId}</td>
                    <td className="px-4 py-3 text-fg">{m.title}</td>
                    <td className="px-4 py-3 text-muted">{m.totalChallenges}</td>
                    <td className="px-4 py-3 text-fg">
                      {m.studentsCompleted}
                      {students.length ? (
                        <span className="text-muted">
                          {" "}
                          / {students.length}
                        </span>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {!error ? (
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {students.map((s) => (
            <div key={s.id} className="card p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-base font-semibold text-fg">{s.username}</div>
                  <div className="mt-1 text-sm text-muted/90">{s.email}</div>
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
      ) : null}
    </main>
  );
}
