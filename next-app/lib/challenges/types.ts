import type { ReactNode } from "react";

// Challenge IDs: "1-1", "1-2", "14-3", etc.
export type ChallengeId = string;

export type ModuleId = number;

export type ChallengeKind =
  | "output"
  | "fix"
  | "functions"
  | "mcq";

export type ChallengeTestCase = {
  name: string;
  passed: boolean;
  expected?: string;
  got?: string;
};

export type JudgeResult = {
  stdout: string;
  stderr: string;
  status: { id: number; description?: string };
  correct: boolean;
  tests?: ChallengeTestCase[];
};

/** One row for a reusable-unit test harness. */
export type FunctionTestCaseRow = {
  args?: unknown[];
  kwargs?: Record<string, unknown>;
  expected: unknown;
};

export type FunctionTestSpec = {
  functionName: string;
  cases: FunctionTestCaseRow[];
};

export type ChallengeDefinition = {
  id: ChallengeId;
  moduleId: ModuleId;
  badge: string;
  title: string;
  instruction: ReactNode;
  competences: string[];
  kind: ChallengeKind;
  initialCode: string;
  expected?: string;
  helperText: string;
  successText: string;
  snippet?: string;
  options?: string[];
  correctOption?: string;
  functionTests?: FunctionTestSpec[];
};

export type ModuleDefinition = {
  id: ModuleId;
  title: string;
  description: string;
  challenges: ChallengeDefinition[];
};
