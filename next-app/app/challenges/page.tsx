"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CHALLENGES, getModule, MODULES } from "@/lib/challenges/catalog";
import type { ModuleDefinition } from "@/lib/challenges/types";

type ModuleStatus = "locked" | "in-progress" | "completed";

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-5 w-5 text-muted"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M7 11V8a5 5 0 0 1 10 0v3" />
      <path d="M6 11h12v10H6z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-5 w-5 text-success"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function ChallengesOverviewPage() {
  const [role, setRole] = useState<"admin" | "student" | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d: { user?: { role?: "admin" | "student" } | null }) =>
        setRole(d.user?.role ?? null)
      )
      .catch(() => setRole(null));
    fetch("/api/challenges/progress")
      .then((r) => r.json())
      .then((d: { completedChallengeIds?: string[] }) => {
        const ids = Array.isArray(d.completedChallengeIds)
          ? d.completedChallengeIds.map(String)
          : [];
        setCompletedIds(new Set(ids));
      })
      .catch(() => setCompletedIds(new Set()));
  }, []);

  const totalChallenges = CHALLENGES.length;
  const completedCount = useMemo(
    () => CHALLENGES.filter((c) => completedIds.has(c.id)).length,
    [completedIds]
  );
  const progressPct = totalChallenges
    ? Math.round((completedCount / totalChallenges) * 1000) / 10
    : 0;

  function prevModuleDone(m: ModuleDefinition): boolean {
    if (m.id <= 1) return true;
    const prev = getModule((m.id - 1) as ModuleDefinition["id"]);
    if (!prev) return false;
    return prev.challenges.every((c) => completedIds.has(c.id));
  }

  function moduleUnlock(m: ModuleDefinition): boolean {
    if (role === "admin") return true;
    return prevModuleDone(m);
  }

  function moduleStatus(m: ModuleDefinition): ModuleStatus {
    const done = m.challenges.filter((c) => completedIds.has(c.id)).length;
    const total = m.challenges.length;
    if (done === total) return "completed";
    if (moduleUnlock(m)) return "in-progress";
    return "locked";
  }

  const currentModuleId = useMemo(() => {
    for (const m of MODULES) {
      if (!moduleUnlock(m)) continue;
      const done = m.challenges.every((c) => completedIds.has(c.id));
      if (!done) return m.id;
    }
    return null;
  }, [completedIds, role]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8 border-b border-border pb-8">
          <div className="flex flex-wrap items-start gap-4 sm:gap-5">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-1 ring-border/80">
              <Image
                src="/images/python_logo.png"
                alt="Python logo"
                width={56}
                height={56}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-[32px] font-semibold tracking-tight text-fg">
                Python Course
              </h1>
              <p className="mt-2 text-base text-muted">
                {completedCount} / {totalChallenges} challenges complete
              </p>
            </div>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full border border-border bg-border">
            <div
              className="h-full rounded-full bg-brand-accent transition-[width]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-muted">
            Complete each module to unlock the next one.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => {
            const status = moduleStatus(m);
            const done = m.challenges.filter((c) => completedIds.has(c.id)).length;
            const total = m.challenges.length;
            const unlocked = moduleUnlock(m);
            const isCurrent = currentModuleId === m.id && status !== "completed";
            const inner = (
              <>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {status === "completed" ? (
                      <CheckIcon />
                    ) : status === "locked" ? (
                      <LockIcon />
                    ) : (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-brand-accent/50 text-[10px] font-semibold text-brand-accent">
                        {m.id}
                      </span>
                    )}
                    <div>
                      <div className="text-sm font-semibold text-fg">Module {m.id}</div>
                      <div className="mt-0.5 text-sm text-muted">{m.title}</div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-muted">{m.description}</p>
                {unlocked ? (
                  <div className="mt-3 text-sm text-fg">
                    {done}/{total} challenges
                  </div>
                ) : (
                  <div className="mt-3 text-sm text-muted">Locked</div>
                )}
                {unlocked && total > 0 ? (
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full bg-brand-accent/80"
                      style={{ width: `${(done / total) * 100}%` }}
                    />
                  </div>
                ) : null}
              </>
            );

            const cardClass = [
              "rounded-xl border p-4 transition",
              status === "locked"
                ? "cursor-not-allowed border-border opacity-50 grayscale"
                : "border-border hover:border-brand-accent/40",
              isCurrent ? "ring-2 ring-brand-accent ring-offset-2 ring-offset-bg" : ""
            ].join(" ");

            if (!unlocked) {
              return (
                <div key={m.id} className={cardClass}>
                  {inner}
                </div>
              );
            }

            return (
              <Link
                key={m.id}
                href={`/challenges/module/${m.id}`}
                className={`${cardClass} block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent`}
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
