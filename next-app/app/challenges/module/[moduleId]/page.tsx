"use client";

import Editor from "@monaco-editor/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { loader } from "@monaco-editor/react";
import { Navbar } from "@/components/Navbar";
import { getChallenge, getModule, MODULES } from "@/lib/challenges/catalog";
import type {
  ChallengeDefinition,
  ChallengeId,
  ChallengeTestCase,
  JudgeResult,
  ModuleId
} from "@/lib/challenges/types";

loader.config({ paths: { vs: "/monaco/vs" } });

type UiState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "correct"; tests?: ChallengeTestCase[]; stdout?: string }
  | { kind: "wrong"; stdout: string; tests?: ChallengeTestCase[] }
  | { kind: "error"; stderr: string }
  | { kind: "failure" };

function sortChallenges(list: ChallengeDefinition[]): ChallengeDefinition[] {
  return [...list].sort((a, b) => {
    const pa = a.id.split("-").map(Number);
    const pb = b.id.split("-").map(Number);
    const [am, ac] = pa;
    const [bm, bc] = pb;
    if (am !== bm) return am - bm;
    return ac - bc;
  });
}

function Spinner() {
  return (
    <div
      className="h-5 w-5 animate-spin rounded-full border-2 border-border/70 border-t-brand-accent"
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

function SuccessBannerCheckIcon() {
  return (
    <div className="shrink-0 p-0.5" aria-hidden="true">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/45">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-white"
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
  challenge,
  ui
}: {
  challenge: ChallengeDefinition;
  ui: UiState;
}) {
  const exp = challenge.expected ?? "";
  const fallback: ChallengeTestCase = {
    name: exp.startsWith("__") ? "Pattern" : "Exact output",
    passed: ui.kind === "correct",
    expected: exp,
    got: ui.kind === "wrong" || ui.kind === "correct" ? ui.stdout : ""
  };

  const tests: ChallengeTestCase[] =
    ui.kind === "wrong" || ui.kind === "correct"
      ? ui.tests?.length
        ? ui.tests
        : [fallback]
      : [];

  if (!tests.length) return null;

  function gotCell(t: ChallengeTestCase) {
    const g = t.got ?? "";
    if (g !== "") return g;
    if (ui.kind === "wrong" || ui.kind === "correct") {
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
                className={t.passed ? "text-success" : "text-warning"}
              >
                <td className="px-3 py-2 font-medium">{t.name}</td>
                <td className="px-3 py-2 font-semibold">{t.passed ? "PASS" : "FAIL"}</td>
                <td className="max-w-[14rem] whitespace-pre-wrap break-all px-3 py-2 font-mono text-[11px] text-fg/90">
                  {t.expected ?? ""}
                </td>
                <td className="max-w-[14rem] whitespace-pre-wrap break-all px-3 py-2 font-mono text-[11px] text-fg/90">
                  {gotCell(t)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function ModuleChallengesPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params.moduleId;
  const moduleId = Number(
    Array.isArray(rawId) ? rawId[0] : rawId
  ) as ModuleId;

  const mod = getModule(moduleId);
  const challenges = useMemo(
    () => (mod ? sortChallenges(mod.challenges) : []),
    [mod]
  );

  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const [role, setRole] = useState<"admin" | "student" | null>(null);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  /** Saved solutions from the server for completed code challenges (autofill on reload). */
  const [savedSolutions, setSavedSolutions] = useState<Record<string, string>>({});
  const [codeById, setCodeById] = useState<Record<string, string>>({});
  const [uiById, setUiById] = useState<Record<string, UiState>>({});
  const [selectedOptionById, setSelectedOptionById] = useState<Record<string, string>>({});
  const [runningId, setRunningId] = useState<string | null>(null);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [showModuleCompleteModal, setShowModuleCompleteModal] = useState(false);
  const moduleCompleteSyncedRef = useRef(false);
  const prevModuleCompleteRef = useRef(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d: { user?: { role?: "admin" | "student" } | null }) =>
        setRole(d.user?.role ?? null)
      )
      .catch(() => setRole(null));
  }, []);

  useEffect(() => {
    fetch("/api/challenges/progress")
      .then((r) => r.json())
      .then(
        (d: {
          completedChallengeIds?: string[];
          solutions?: Record<string, string>;
        }) => {
          const ids = Array.isArray(d.completedChallengeIds)
            ? d.completedChallengeIds.map(String)
            : [];
          const next: Record<string, boolean> = {};
          for (const id of ids) next[id] = true;
          setCompleted(next);
          if (d.solutions && typeof d.solutions === "object") {
            const sol: Record<string, string> = {};
            for (const [k, v] of Object.entries(d.solutions)) {
              if (typeof v === "string") sol[k] = v;
            }
            setSavedSolutions(sol);
          }
        }
      )
      .catch(() => {})
      .finally(() => setProgressLoaded(true));
  }, []);

  useEffect(() => {
    if (!mod) {
      router.replace("/challenges");
      return;
    }
    const initCode: Record<string, string> = {};
    const initUi: Record<string, UiState> = {};
    for (const c of mod.challenges) {
      initCode[c.id] = c.initialCode;
      initUi[c.id] = { kind: "idle" };
    }
    setCodeById(initCode);
    setUiById(initUi);
  }, [mod, router]);

  useEffect(() => {
    if (!mod) return;
    setCodeById((prev) => {
      const next = { ...prev };
      for (const c of mod.challenges) {
        const saved = savedSolutions[c.id];
        if (saved != null && saved !== "") {
          next[c.id] = saved;
        }
      }
      return next;
    });
  }, [mod, savedSolutions]);

  const doneInModule = challenges.filter((c) => completed[c.id]).length;
  const moduleComplete =
    challenges.length > 0 && doneInModule === challenges.length;
  const nextModule = MODULES.find((m) => m.id === moduleId + 1);

  useEffect(() => {
    moduleCompleteSyncedRef.current = false;
    prevModuleCompleteRef.current = false;
  }, [moduleId]);

  useEffect(() => {
    if (!progressLoaded) return;
    if (!moduleCompleteSyncedRef.current) {
      moduleCompleteSyncedRef.current = true;
      prevModuleCompleteRef.current = moduleComplete;
      return;
    }
    if (!prevModuleCompleteRef.current && moduleComplete) {
      setShowModuleCompleteModal(true);
    }
    prevModuleCompleteRef.current = moduleComplete;
  }, [moduleComplete, progressLoaded]);

  const closeModuleCompleteModal = useCallback(() => {
    setShowModuleCompleteModal(false);
  }, []);

  useEffect(() => {
    if (!showModuleCompleteModal) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModuleCompleteModal();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showModuleCompleteModal, closeModuleCompleteModal]);

  const prevModuleComplete = useMemo(() => {
    if (!mod || mod.id <= 1) return true;
    const prev = getModule((mod.id - 1) as ModuleId);
    if (!prev) return false;
    return prev.challenges.every((c) => completed[c.id]);
  }, [mod, completed]);

  useEffect(() => {
    if (!mod) return;
    // Avoid redirecting before progress loads: empty `completed` makes
    // prevModuleComplete false and would bounce students back to /challenges.
    if (!progressLoaded) return;
    if (role === null) return;
    if (role === "admin") return;
    if (!prevModuleComplete) {
      router.replace("/challenges");
    }
  }, [mod, role, prevModuleComplete, router, progressLoaded]);

  function isChallengeUnlocked(idx: number): boolean {
    if (!challenges.length) return false;
    if (idx === 0) return true;
    for (let i = 0; i < idx; i++) {
      if (!completed[challenges[i].id]) return false;
    }
    return true;
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
        body: JSON.stringify({
          code: codeById[challengeId] ?? "",
          challengeId
        })
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
        const submitted = codeById[challengeId] ?? "";
        setSavedSolutions((prev) => ({ ...prev, [challengeId]: submitted }));
        fetch("/api/challenges/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            challengeId: String(challengeId),
            code: submitted
          })
        }).catch(() => {});

        const ch = getChallenge(challengeId);
        const list = ch ? sortChallenges(getModule(ch.moduleId)?.challenges ?? []) : [];
        const ix = list.findIndex((x) => x.id === challengeId);
        const nextCh = ix >= 0 ? list[ix + 1] : undefined;
        if (nextCh) {
          setTimeout(() => {
            sectionsRef.current[nextCh.id]?.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
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

  function submitMcq(challenge: ChallengeDefinition) {
    const sel = selectedOptionById[challenge.id] ?? "";
    const ok = sel === challenge.correctOption;
    if (ok) {
      postAttempt(challenge.id, true);
      setCompleted((prev) => ({ ...prev, [challenge.id]: true }));
      setUiById((prev) => ({ ...prev, [challenge.id]: { kind: "correct" } }));
      fetch("/api/challenges/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ challengeId: String(challenge.id) })
      }).catch(() => {});
    } else {
      postAttempt(challenge.id, false);
      setUiById((prev) => ({ ...prev, [challenge.id]: { kind: "wrong", stdout: "" } }));
    }
  }

  if (!mod) return null;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <Link
          href="/challenges"
          className="text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
        >
          ← Back to course
        </Link>

        <header className="mt-6 border-b border-border pb-8">
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
              <h1 className="text-[28px] font-semibold tracking-tight text-fg">
                Module {mod.id} — {mod.title}
              </h1>
              <p className="mt-2 text-base text-muted">{mod.description}</p>
              <p className="mt-2 text-sm text-muted">
                {doneInModule}/{challenges.length} challenges completed
              </p>
            </div>
          </div>
        </header>

        <div className="mt-10 space-y-10">
          {challenges.map((challenge, idx) => {
            const unlocked = isChallengeUnlocked(idx);
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
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-[3px] text-[12px] font-medium text-muted">
                      <span>{challenge.badge}</span>
                    </div>
                    {isDone ? (
                      <span className="rounded-full border border-success/40 bg-success/10 px-3 py-1 text-sm font-semibold text-success">
                        Completed
                      </span>
                    ) : null}
                  </div>

                  {!unlocked ? (
                    <span className="text-sm text-muted">Locked</span>
                  ) : null}
                </div>

                <h2 className="text-[22px] font-medium tracking-tight text-fg">{challenge.title}</h2>
                <div className="mt-2 text-base">{challenge.instruction}</div>

                <div className="mt-4">
                  <div className="text-sm font-semibold text-fg">Competences covered</div>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {challenge.competences.map((c) => (
                      <li
                        key={c}
                        className="rounded-full border border-border bg-surface px-[10px] py-[3px] text-[12px] text-muted"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {!unlocked ? (
                  <div className="mt-6 rounded-xl border border-border bg-surface/40 p-6 opacity-50">
                    <div className="flex items-center gap-3 text-fg">
                      <LockIcon />
                      <div className="text-sm font-semibold">
                        Complete the previous challenge in this module to unlock this one.
                      </div>
                    </div>
                  </div>
                ) : challenge.kind === "mcq" ? (
                  <div className="mt-6 rounded-xl border border-border bg-bg p-4">
                    {challenge.snippet ? (
                      <pre className="overflow-auto rounded-lg bg-bg p-3 font-mono text-sm text-fg ring-1 ring-border">
                        {challenge.snippet}
                      </pre>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(challenge.options ?? []).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setSelectedOptionById((prev) => ({
                              ...prev,
                              [challenge.id]: opt
                            }))
                          }
                          className={`rounded-full border px-3 py-1.5 text-sm transition ${
                            selectedOptionById[challenge.id] === opt
                              ? "border-brand-accent ring-2 ring-brand-accent"
                              : "border-border bg-surface hover:bg-surface/80"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <div className="glow-wrap glow-wrap--run mt-4 inline-flex">
                      <div className="glow" aria-hidden="true" />
                      <div className="border-ring" aria-hidden="true">
                        <div className="border-ring-inner" />
                      </div>
                      <button
                        type="button"
                        onClick={() => submitMcq(challenge)}
                        disabled={isDone}
                        className="btn btn-primary relative z-0"
                      >
                        Submit Answer
                      </button>
                    </div>
                    {ui.kind === "correct" ? (
                      <div className="mt-4 text-sm font-semibold text-success">Correct!</div>
                    ) : null}
                    {ui.kind === "wrong" ? (
                      <div className="mt-4 text-sm font-semibold text-warning">
                        Wrong answer — try again.
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="mt-6 rounded-xl border border-border border-l-2 border-l-brand-accent bg-bg p-4">
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
                          monaco.editor.defineTheme("mikkaiser-challenges", {
                            base: "vs-dark",
                            inherit: true,
                            rules: [],
                            colors: {
                              "editor.background": "#08080c",
                              "editorGutter.background": "#08080c",
                              "editorLineNumber.foreground": "#ffffff33",
                              "editorLineNumber.activeForeground": "#ffffff55",
                              "editorCursor.foreground": "#a78bfa",
                              "editor.foreground": "#e4e4e7",
                              "editorWidget.background": "#121218",
                              "editorSuggestWidget.background": "#121218",
                              "editorHoverWidget.background": "#121218",
                              "input.background": "#08080c",
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

                      <div className="text-sm text-muted">{challenge.helperText}</div>
                    </div>

                    {ui.kind === "loading" ? (
                      <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-bg px-4 py-3 text-muted">
                        <Spinner />
                        <div className="text-sm text-fg/80">Running your code...</div>
                      </div>
                    ) : null}

                    {ui.kind === "correct" ? (
                      <div className="mt-4 overflow-hidden rounded-lg border border-success/50 text-fg">
                        <div className="flex items-center gap-3 bg-success px-4 py-3 text-white">
                          <SuccessBannerCheckIcon />
                          <div className="text-sm font-semibold">{challenge.successText}</div>
                        </div>
                        <div className="bg-bg px-4 py-3">
                          <ChallengeTestsSummary challenge={challenge} ui={ui} />
                        </div>
                      </div>
                    ) : null}

                    {ui.kind === "wrong" ? (
                      <div className="mt-4 rounded-lg border border-warning/40 bg-warning/10 px-4 py-3 text-fg">
                        <div className="text-sm font-semibold">Wrong answer.</div>
                        <ChallengeTestsSummary challenge={challenge} ui={ui} />
                      </div>
                    ) : null}

                    {ui.kind === "error" ? (
                      <div className="mt-4 rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-fg">
                        <div className="text-sm font-semibold">Runtime/compile error</div>
                        <div className="mt-2 text-sm text-danger/80">stderr:</div>
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

      {showModuleCompleteModal && mod ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="module-complete-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-bg/85 backdrop-blur-[2px]"
            onClick={closeModuleCompleteModal}
            aria-label="Dismiss"
          />
          <div className="relative z-10 w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-xl">
            <h2 id="module-complete-title" className="text-lg font-semibold text-success">
              Module {mod.id} complete!
            </h2>
            <p className="mt-2 text-sm text-muted">
              {nextModule
                ? `You can open Module ${nextModule.id} (${nextModule.title}) or stay on this page.`
                : "You have finished the full course. Congratulations!"}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeModuleCompleteModal}
                className="btn btn-secondary min-w-[7rem]"
              >
                Stay here
              </button>
              {nextModule ? (
                <Link
                  href={`/challenges/module/${nextModule.id}`}
                  className="btn btn-primary min-w-[7rem]"
                  onClick={closeModuleCompleteModal}
                >
                  Next module
                </Link>
              ) : (
                <Link
                  href="/challenges"
                  className="btn btn-primary min-w-[7rem]"
                  onClick={closeModuleCompleteModal}
                >
                  Back to course
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
