import { NextResponse } from "next/server";
import { buildProgramForChallenge, isCorrectForChallenge } from "@/lib/challenges/grader";
import type { ChallengeId } from "@/lib/challenges/types";
import type { ChallengeTestCase } from "@/lib/challenges/types";

type Judge0SubmissionResponse = {
  token: string;
};

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

function toBase64Utf8(input: string) {
  return Buffer.from(input, "utf8").toString("base64");
}

function fromBase64Utf8(input: string | null) {
  if (!input) return "";
  return Buffer.from(input, "base64").toString("utf8");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
  const challengeId: ChallengeId = challengeIdRaw === 2 ? 2 : 1;

  if (typeof code !== "string" || code.trim().length === 0) {
    return NextResponse.json({ error: "Missing code." }, { status: 400 });
  }

  const program = buildProgramForChallenge(challengeId, code);

  const submitRes = await fetch(
    `${judge0BaseUrl}/submissions?wait=false&base64_encoded=true`,
    {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language_id: 71,
      source_code: toBase64Utf8(program)
    })
    }
  );

  if (!submitRes.ok) {
    const text = await submitRes.text().catch(() => "");
    return NextResponse.json(
      { error: "Failed to submit to Judge0.", details: text },
      { status: 502 }
    );
  }

  const submitJson = (await submitRes.json()) as Judge0SubmissionResponse;
  const token = submitJson?.token;
  if (!token) {
    return NextResponse.json(
      { error: "Judge0 did not return a token." },
      { status: 502 }
    );
  }

  let result: Judge0SubmissionResult | null = null;
  for (let attempt = 0; attempt < 60; attempt++) {
    const pollRes = await fetch(
      `${judge0BaseUrl}/submissions/${token}?base64_encoded=true`,
      { method: "GET" }
    );

    if (!pollRes.ok) {
      const text = await pollRes.text().catch(() => "");
      return NextResponse.json(
        { error: "Failed to poll Judge0.", details: text },
        { status: 502 }
      );
    }

    result = (await pollRes.json()) as Judge0SubmissionResult;
    if (result?.status?.id && result.status.id > 2) break;

    await sleep(1500);
  }

  if (!result) {
    return NextResponse.json(
      { error: "No result returned from Judge0." },
      { status: 502 }
    );
  }

  const stdout = fromBase64Utf8(result.stdout);
  const stderr =
    fromBase64Utf8(result.stderr) || fromBase64Utf8(result.compile_output);
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

  // Do not leak raw JSON runner output to the client when structured tests are returned.
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

