import type { ChallengeId } from "./types";

/** First line of every challenge editor (real buffer text, not a UI placeholder). */
export const DEFAULT_CODE_STARTER = "#Write your code here:\n";

export type ChallengeDefinition = {
  id: ChallengeId;
  badge: string;
  title: string;
  instruction: React.ReactNode;
  competences: string[];
  initialCode: string;
  successText: string;
  helperText: string;
};

export const CHALLENGES: readonly ChallengeDefinition[] = [
  {
    id: 1,
    badge: "Challenge #1",
    title: "Python Hello World",
    instruction: (
      <>
        Write a Python program that prints exactly:{" "}
        <span className="mx-2 rounded bg-zinc-900 px-2.5 py-1 font-mono text-zinc-100">
          Hello, World!
        </span>
      </>
    ),
    competences: ["Printing output", "Exact string matching", "Basic program structure"],
    initialCode: DEFAULT_CODE_STARTER,
    successText: "Correct! Your output matches the expected result.",
    helperText: "Output must match exactly (case + punctuation)."
  },
  {
    id: 2,
    badge: "Challenge #2",
    title: "Sum + Subtract Functions",
    instruction: (
      <>
        Define two Python functions:
        <span className="mx-2 rounded bg-zinc-900 px-2.5 py-1 font-mono text-zinc-100">
          sum(a, b)
        </span>
        <span className="mx-2 rounded bg-zinc-900 px-2.5 py-1 font-mono text-zinc-100">
          subtract(a, b)
        </span>
        <span className="ml-1 text-zinc-300">(5 tests each)</span>
      </>
    ),
    competences: [
      "Defining functions",
      "Parameters and return values",
      "Integer arithmetic (+ and -)",
      "Handling negative numbers",
      "Passing automated test cases"
    ],
    initialCode: DEFAULT_CODE_STARTER,
    successText: "Correct! All tests passed.",
    helperText: "Your functions must return correct values for all tests."
  }
] as const;

export function getChallenge(id: ChallengeId) {
  const found = CHALLENGES.find((c) => c.id === id);
  return found ?? CHALLENGES[0];
}

