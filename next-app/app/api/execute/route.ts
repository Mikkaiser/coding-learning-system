import { NextResponse } from "next/server";
import {
  buildProgram,
  isCorrect
} from "@/lib/challenges/grader";
import { getChallenge } from "@/lib/challenges/catalog";
import type { ChallengeId } from "@/lib/challenges/types";
import type { ChallengeTestCase } from "@/lib/challenges/types";

type Judge0Status = {
  id: number;
  description?: string;
};

type Judge0SubmissionResult = {
  token: string;
  status: Judge0Status;
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
};

type FunctionsStdoutJson = {
  allPassed: boolean;
  tests: Array<{
    name: string;
    passed: boolean;
    expected?: string;
    got?: string;
  }>;
};

/**
 * Judge0 is polled with `base64_encoded=false`, so stdout/stderr are plain UTF-8 text.
 * Do not auto-decode as Base64: short lines like "Alex" match length % 4 and the Base64
 * alphabet and decode to garbage (mojibake in the UI "Got" column).
 */
function decodeJudge0TextField(value: string | null | undefined): string {
  if (value == null || value === "") return "";
  return String(value);
}

async function pollUntilDone(
  judge0Root: string,
  token: string
): Promise<Judge0SubmissionResult> {
  const maxAttempts = 20;
  const delayMs = 500;
  for (let i = 0; i < maxAttempts; i++) {
    const pollUrl = new URL(`submissions/${token}`, judge0Root);
    pollUrl.searchParams.set("base64_encoded", "false");
    const pollRes = await fetch(pollUrl.toString());
    if (!pollRes.ok) throw new Error("Poll request failed");
    const result = (await pollRes.json()) as Judge0SubmissionResult;
    if (result.status.id !== 1 && result.status.id !== 2) return result;
    if (i < maxAttempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw new Error("Submission timed out after polling");
}

export async function POST(req: Request) {
  const judge0BaseUrl = process.env.JUDGE0_API_URL;
  if (!judge0BaseUrl) {
    return NextResponse.json(
      { error: "JUDGE0_API_URL is not configured on the server." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const code = (body as { code?: unknown })?.code;
  const challengeIdRaw = (body as { challengeId?: unknown })?.challengeId;
  const challengeId = String(challengeIdRaw ?? "") as ChallengeId;

  if (typeof code !== "string" || code.trim().length === 0) {
    return NextResponse.json({ error: "Missing code." }, { status: 400 });
  }

  const challenge = getChallenge(challengeId);
  if (!challenge) {
    return NextResponse.json({ error: "Unknown challenge." }, { status: 400 });
  }

  if (challenge.kind === "mcq") {
    return NextResponse.json(
      { error: "This challenge is not executed on the server." },
      { status: 400 }
    );
  }

  const program = buildProgram(challenge, code);

  const judge0Root = judge0BaseUrl.endsWith("/")
    ? judge0BaseUrl
    : `${judge0BaseUrl}/`;
  const submitUrl = new URL("submissions", judge0Root);
  submitUrl.searchParams.set("base64_encoded", "false");

  const submitRes = await fetch(submitUrl.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language_id: 71,
      source_code: program,
      enable_per_process_and_thread_memory_limit: true,
      enable_per_process_and_thread_time_limit: true
    })
  });

  if (!submitRes.ok) {
    const text = await submitRes.text().catch(() => "");
    return NextResponse.json(
      { error: "Failed to submit to Judge0.", details: text },
      { status: 502 }
    );
  }

  const submitData = (await submitRes.json()) as { token?: string };
  if (!submitData?.token) {
    return NextResponse.json(
      { error: "No token returned from Judge0." },
      { status: 502 }
    );
  }

  let result: Judge0SubmissionResult;
  try {
    result = await pollUntilDone(judge0Root, submitData.token);
  } catch {
    return NextResponse.json(
      { error: "Code execution timed out." },
      { status: 504 }
    );
  }

  const stdout = decodeJudge0TextField(result.stdout);
  const stderr =
    decodeJudge0TextField(result.stderr) ||
    decodeJudge0TextField(result.compile_output);
  const status = result.status;

  let tests: ChallengeTestCase[] | undefined;
  let correct = isCorrect(challenge, stdout);

  if (challenge.kind === "functions" && !stderr.trim()) {
    try {
      const parsed = JSON.parse(stdout.trim()) as FunctionsStdoutJson;
      if (typeof parsed?.allPassed === "boolean" && Array.isArray(parsed?.tests)) {
        tests = parsed.tests.map((t) => ({
          name: String(t.name),
          passed: Boolean(t.passed),
          expected: typeof t.expected === "string" ? t.expected : undefined,
          got: typeof t.got === "string" ? t.got : undefined
        }));
        correct = parsed.allPassed && tests.every((t) => t.passed);
      }
    } catch {
      // keep string-based correctness
    }
  }

  if (challenge.kind === "output" || challenge.kind === "fix") {
    const exp = challenge.expected ?? "";
    tests = [
      {
        name: exp.startsWith("__") ? "Pattern" : "Exact output",
        passed: correct,
        expected: exp.startsWith("__") ? exp : exp,
        got: stdout.trim()
      }
    ];
  }

  const stdoutForClient =
    challenge.kind === "functions" && tests && tests.length > 0 ? "" : stdout;

  return NextResponse.json({
    stdout: stdoutForClient,
    stderr,
    status,
    correct,
    tests
  });
}
