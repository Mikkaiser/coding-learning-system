import { NextResponse } from "next/server";
import { buildProgramForChallenge, isCorrectForChallenge } from "@/lib/challenges/grader";
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

type Challenge2StdoutJson = {
  allPassed: boolean;
  tests: Array<{
    name: string;
    passed: boolean;
    expected?: string;
    got?: string;
  }>;
};

/**
 * Judge0 may return stdout/stderr as plain UTF-8 (base64_encoded=false) or base64
 * (base64_encoded=true / implicit default). Decode only when the value looks like base64.
 */
function decodeJudge0TextField(value: string | null | undefined): string {
  if (value == null || value === "") return "";
  const s = String(value);
  const compact = s.replace(/\s/g, "");
  if (compact.length === 0) return "";
  const looksLikeBase64 =
    compact.length % 4 === 0 && /^[A-Za-z0-9+/]+=*$/.test(compact);
  if (!looksLikeBase64) return s;
  try {
    return Buffer.from(compact, "base64").toString("utf8");
  } catch {
    return s;
  }
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
  const challengeId: ChallengeId =
    challengeIdRaw === 2 || challengeIdRaw === "2" ? 2 : 1;

  if (typeof code !== "string" || code.trim().length === 0) {
    return NextResponse.json({ error: "Missing code." }, { status: 400 });
  }

  const program = buildProgramForChallenge(challengeId, code);

  // Trailing slash so `new URL("submissions", base)` resolves under the API path (not /submissions at host root).
  const judge0Root = judge0BaseUrl.endsWith("/")
    ? judge0BaseUrl
    : `${judge0BaseUrl}/`;
  const submitUrl = new URL("submissions", judge0Root);
  submitUrl.searchParams.set("wait", "true");
  submitUrl.searchParams.set("base64_encoded", "false");

  const submitRes = await fetch(submitUrl.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language_id: 71,
      source_code: program
    })
  });

  if (!submitRes.ok) {
    const text = await submitRes.text().catch(() => "");
    return NextResponse.json(
      { error: "Failed to submit to Judge0.", details: text },
      { status: 502 }
    );
  }

  const result = (await submitRes.json()) as Judge0SubmissionResult;
  if (!result?.status) {
    return NextResponse.json(
      { error: "No result returned from Judge0." },
      { status: 502 }
    );
  }

  const stdout = decodeJudge0TextField(result.stdout);
  const stderr =
    decodeJudge0TextField(result.stderr) ||
    decodeJudge0TextField(result.compile_output);
  const status = result.status;

  let tests: ChallengeTestCase[] | undefined;
  let correct = isCorrectForChallenge(challengeId, stdout);

  if (challengeId === 2 && !stderr.trim()) {
    try {
      const parsed = JSON.parse(stdout.trim()) as Challenge2StdoutJson;
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
      // Fallback to string-based correctness when stdout isn't JSON
    }
  }

  if (challengeId === 1) {
    tests = [
      {
        name: "Exact output",
        passed: correct,
        expected: "Hello, World!",
        got: stdout.trim()
      }
    ];
  }

  // Challenge 2: hide raw JSON harness output when structured tests are returned.
  const stdoutForClient =
    challengeId === 2 && tests && tests.length > 0 ? "" : stdout;

  return NextResponse.json({
    stdout: stdoutForClient,
    stderr,
    status,
    correct,
    tests
  });
}

