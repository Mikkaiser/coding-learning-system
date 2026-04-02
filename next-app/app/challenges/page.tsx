"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { loader } from "@monaco-editor/react";
import { Navbar } from "@/components/Navbar";
import { CHALLENGES } from "@/lib/challenges/catalog";
import type { ChallengeId, ChallengeTestCase, JudgeResult } from "@/lib/challenges/types";

loader.config({ paths: { vs: "/monaco/vs" } });

type UiState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "correct"; tests?: ChallengeTestCase[]; stdout?: string }
  | { kind: "wrong"; stdout: string; tests?: ChallengeTestCase[] }
  | { kind: "error"; stderr: string }
  | { kind: "failure" };

function Spinner() {
  return (
    <div
      className="h-5 w-5 animate-spin rounded-full border-2 border-border/70 border-t-brand-secondary"
      aria-label="Loading"
    />
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-muted"
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

function SuccessCheckIcon() {
  return (
    <div className="shrink-0 p-0.5" aria-hidden="true">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-secondary/15 ring-1 ring-brand-secondary/35">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-brand-secondary"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
    </div>
  );
}

function ChallengeTestsSummary({
  challengeId,
  ui
}: {
  challengeId: ChallengeId;
  ui: UiState;
}) {
  const expectedHello = "Hello, World!";
  const helloFallback: ChallengeTestCase = {
    name: "Exact output",
    passed:
      ui.kind === "correct" ||
      (ui.kind === "wrong" && ui.stdout.trim() === expectedHello),
    expected: expectedHello,
    got:
      ui.kind === "wrong"
        ? ui.stdout
        : ui.kind === "correct"
          ? (ui.stdout ?? "")
          : ""
  };

  const tests: ChallengeTestCase[] =
    challengeId === 1
      ? ui.kind === "wrong" || ui.kind === "correct"
        ? (ui.tests?.length ? ui.tests : [helloFallback])
        : []
      : ui.kind === "wrong"
        ? ui.tests ?? []
        : ui.kind === "correct"
          ? ui.tests ?? []
          : [];

  if (!tests.length) return null;

  function gotCell(t: ChallengeTestCase) {
    const g = t.got ?? "";
    if (g !== "") return g;
    if (
      challengeId === 1 &&
      (ui.kind === "wrong" || ui.kind === "correct")
    ) {
      return (ui.stdout ?? "").trim();
    }
    return "";
  }

  return (
    <>
      <div className="mt-2 text-sm text-muted/80">Test scenarios:</div>
      <div className="mt-2 overflow-hidden rounded border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-bg text-muted">
            <tr>
              <th className="px-3 py-2">Test</th>
              <th className="px-3 py-2">Result</th>
              <th className="px-3 py-2">Expected</th>
              <th className="px-3 py-2">Got</th>
            </tr>
          </thead>
          <tbody className="bg-bg text-fg">
            {tests.map((t) => (
              <tr
                key={t.name}
                className={t.passed ? "text-brand-secondary" : "text-warning"}
              >
                <td className="px-3 py-2 font-medium">{t.name}</td>
                <td className="px-3 py-2">{t.passed ? "PASS" : "FAIL"}</td>
                <td className="px-3 py-2 font-mono text-[11px]">{t.expected ?? ""}</td>
                <td className="px-3 py-2 font-mono text-[11px]">{gotCell(t)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function ChallengesPage() {
  const sectionsRef = useRef<Record<number, HTMLElement | null>>({});
  const [role, setRole] = useState<"admin" | "student" | null>(null);

  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const [codeById, setCodeById] = useState<Record<number, string>>(() => {
    const init: Record<number, string> = {};
    for (const c of CHALLENGES) init[c.id] = c.initialCode;
    return init;
  });
  const [uiById, setUiById] = useState<Record<number, UiState>>(() => {
    const init: Record<number, UiState> = {};
    for (const c of CHALLENGES) init[c.id] = { kind: "idle" };
    return init;
  });
  const [runningId, setRunningId] = useState<number | null>(null);

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
        const next: Record<number, boolean> = {};
        for (const c of CHALLENGES) {
          next[c.id] = ids.includes(String(c.id));
        }
        setCompleted(next);
      })
      .catch(() => {
        // ignore (middleware should redirect if unauthenticated)
      });
  }, []);

  const currentChallengeId: ChallengeId = useMemo(() => {
    for (const c of CHALLENGES) {
      if (!completed[c.id]) return c.id;
    }
    return CHALLENGES[CHALLENGES.length - 1]?.id ?? 1;
  }, [completed]);

  useEffect(() => {
    const el = sectionsRef.current[currentChallengeId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentChallengeId]);

  function isUnlocked(id: ChallengeId) {
    if (role === "admin") return true;
    if (id === 1) return true;
    const prev = (id - 1) as ChallengeId;
    return Boolean(completed[prev]);
  }

  function postAttempt(cid: ChallengeId, success: boolean) {
    void fetch("/api/challenges/attempt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ challengeId: String(cid), success })
    }).catch(() => {});
  }

  async function runCode(challengeId: ChallengeId) {
    setRunningId(challengeId);
    setUiById((prev) => ({ ...prev, [challengeId]: { kind: "loading" } }));
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeById[challengeId] ?? "", challengeId })
      });

      if (!res.ok) {
        postAttempt(challengeId, false);
        setUiById((prev) => ({ ...prev, [challengeId]: { kind: "failure" } }));
        return;
      }

      const data = (await res.json()) as JudgeResult;

      const hasError = (data.stderr ?? "").trim().length > 0;
      if (hasError) {
        postAttempt(challengeId, false);
        setUiById((prev) => ({
          ...prev,
          [challengeId]: { kind: "error", stderr: data.stderr }
        }));
        return;
      }

      if (data.correct) {
        postAttempt(challengeId, true);
        setUiById((prev) => ({
          ...prev,
          [challengeId]: {
            kind: "correct",
            tests: data.tests,
            stdout: data.stdout ?? ""
          }
        }));

        setCompleted((prev) => ({ ...prev, [challengeId]: true }));
        fetch("/api/challenges/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ challengeId: String(challengeId) })
        }).catch(() => {});

        const nextId = (challengeId + 1) as ChallengeId;
        const nextEl = sectionsRef.current[nextId];
        if (nextEl) {
          setTimeout(() => {
            nextEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 350);
        }
        return;
      }

      postAttempt(challengeId, false);
      setUiById((prev) => ({
        ...prev,
        [challengeId]: { kind: "wrong", stdout: data.stdout ?? "", tests: data.tests }
      }));
    } catch {
      postAttempt(challengeId, false);
      setUiById((prev) => ({ ...prev, [challengeId]: { kind: "failure" } }));
    } finally {
      setRunningId(null);
    }
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-sm text-fg">
            <span className="font-semibold">Mikkaiser Coder</span>
          </div>
          <h1 className="mt-4 text-[32px] font-semibold tracking-tight text-fg">Python challenges</h1>
          <p className="mt-2 text-base text-[rgba(255,255,255,0.55)]">
            Complete each challenge to unlock the next one.
          </p>
        </header>

        <div className="space-y-10">
          {CHALLENGES.map((challenge) => {
            const unlocked = isUnlocked(challenge.id);
            const ui = uiById[challenge.id] ?? { kind: "idle" };
            const isRunning = runningId === challenge.id;
            const isDone = Boolean(completed[challenge.id]);

            return (
              <section
                key={challenge.id}
                ref={(el) => {
                  sectionsRef.current[challenge.id] = el;
                }}
                className="scroll-mt-8"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(123,47,247,0.35)] bg-[rgba(123,47,247,0.15)] px-3 py-[3px] text-[12px] font-medium text-[#c4aaff]">
                      <span className="font-medium">{challenge.badge}</span>
                    </div>
                    {isDone ? (
                      <span className="rounded-full border border-brand-secondary/40 bg-brand-secondary/10 px-3 py-1 text-sm font-semibold text-brand-secondary">
                        Completed
                      </span>
                    ) : null}
                  </div>

                  {!unlocked ? (
                    <span className="text-sm text-muted">Locked</span>
                  ) : null}
                </div>

                <h2 className="text-[22px] font-medium tracking-tight text-fg">{challenge.title}</h2>
                <p className="mt-2 text-base text-[rgba(255,255,255,0.55)] [&_*]:text-[rgba(255,255,255,0.55)]">
                  {challenge.instruction}
                </p>

                <div className="mt-4">
                  <div className="text-sm font-semibold text-fg">Competences covered</div>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {challenge.competences.map((c) => (
                      <li
                        key={c}
                        className="rounded-full border border-[rgba(123,47,247,0.3)] bg-[rgba(123,47,247,0.12)] px-[10px] py-[3px] text-[12px] text-[rgba(200,185,255,0.9)]"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {!unlocked ? (
                  <div
                    className="mt-6 rounded-xl border border-border bg-surface/40 p-6 opacity-50"
                    style={{ filter: "grayscale(0.3)" }}
                  >
                    <div className="flex items-center gap-3 text-fg">
                      <LockIcon />
                      <div>
                        <div className="text-sm font-semibold">
                          Complete the previous challenge to unlock this one.
                        </div>
                        <div className="mt-1 text-sm text-muted">
                          Your progress is saved automatically.
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-4 h-48 overflow-hidden rounded-lg border border-border bg-bg/40">
                      <div
                        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
                        style={{
                          background: "rgba(0,0,0,0.45)",
                          backdropFilter: "blur(3px)",
                          WebkitBackdropFilter: "blur(3px)"
                        }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 rounded-xl border border-border border-l-2 border-l-[#7B2FF7] bg-bg p-4">
                    <div className="relative overflow-hidden rounded-lg border border-border bg-bg">
                      <Editor
                        height="260px"
                        defaultLanguage="python"
                        theme="mikkaiser-challenges"
                        value={codeById[challenge.id] ?? ""}
                        onChange={(v) =>
                          setCodeById((prev) => ({
                            ...prev,
                            [challenge.id]: v ?? ""
                          }))
                        }
                        beforeMount={(monaco) => {
                          const bg = "#08080c";
                          monaco.editor.defineTheme("mikkaiser-challenges", {
                            base: "vs-dark",
                            inherit: true,
                            rules: [],
                            colors: {
                              "editor.background": bg,
                              "editorGutter.background": bg,
                              "editorLineNumber.foreground": "#ffffff33",
                              "editorLineNumber.activeForeground": "#ffffff55",
                              "editorCursor.foreground": "#a78bfa",
                              "editor.foreground": "#e4e4e7",
                              "editorWidget.background": "#121218",
                              "editorSuggestWidget.background": "#121218",
                              "editorHoverWidget.background": "#121218",
                              "input.background": bg,
                              "scrollbarSlider.background": "#ffffff22",
                              "scrollbarSlider.hoverBackground": "#ffffff33"
                            }
                          });
                        }}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          readOnly: false
                        }}
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div className="glow-wrap glow-wrap--run inline-flex">
                        <div className="glow" aria-hidden="true" />
                        <div className="border-ring" aria-hidden="true">
                          <div className="border-ring-inner" />
                        </div>
                        <button
                          type="button"
                          onClick={() => runCode(challenge.id)}
                          disabled={isRunning}
                          className="btn btn-primary relative z-0 inline-flex gap-2"
                        >
                          {isRunning ? (
                            <>
                              <Spinner />
                              <span>Running...</span>
                            </>
                          ) : isDone ? (
                            "Run again"
                          ) : (
                            "Run Code"
                          )}
                        </button>
                      </div>

                      <div className="text-sm text-muted">
                        {challenge.helperText}
                      </div>
                    </div>

                    {ui.kind === "loading" ? (
                      <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-[#050509] px-4 py-3 text-muted">
                        <Spinner />
                        <div className="text-sm text-fg/80">Running your code...</div>
                      </div>
                    ) : null}

                    {ui.kind === "correct" ? (
                      <div className="mt-4 rounded-lg border border-brand-secondary/40 bg-brand-secondary/10 px-4 py-3 text-fg">
                        <div className="flex items-center gap-3">
                          <SuccessCheckIcon />
                          <div>
                            <div className="text-sm font-semibold">
                              {challenge.successText}
                            </div>
                          </div>
                        </div>
                        <ChallengeTestsSummary challengeId={challenge.id} ui={ui} />
                      </div>
                    ) : null}

                    {ui.kind === "wrong" ? (
                      <div className="mt-4 rounded-lg border border-warning/40 bg-warning/10 px-4 py-3 text-fg">
                        <div className="text-sm font-semibold">Wrong answer.</div>
                        <ChallengeTestsSummary challengeId={challenge.id} ui={ui} />
                      </div>
                    ) : null}

                    {ui.kind === "error" ? (
                      <div className="mt-4 rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-fg">
                        <div className="text-sm font-semibold">
                          Runtime/compile error
                        </div>
                        <div className="mt-2 text-sm text-danger/80">
                          stderr:
                        </div>
                        <pre className="mt-1 overflow-auto rounded bg-bg px-3 py-2 text-sm text-fg">
                          {ui.stderr.length ? ui.stderr : "(empty)"}
                        </pre>
                      </div>
                    ) : null}

                    {ui.kind === "failure" ? (
                      <div className="mt-4 rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-fg">
                        <div className="text-sm font-semibold">
                          Request failed. Please try again.
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}

