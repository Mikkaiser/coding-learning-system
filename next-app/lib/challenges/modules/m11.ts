import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_11: ModuleDefinition = {
  id: 11,
  title: "Branching Logic",
  description:
    "A program that always does the same thing regardless of its data is not very useful. In this module you will write programs that make decisions and follow different paths depending on what they find.",
  challenges: [
    {
      id: "11-1",
      moduleId: 11,
      badge: "Challenge 1",
      title: "Pass or fail",
      instruction: instructionBlock({
        goal: "With score 75 and pass at ≥50, display pass or fail.",
        expectedOutput: "pass"
      }),
      competences: ["if/else"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "pass",
      helperText: "Compare to 50.",
      successText: "Correct."
    },
    {
      id: "11-2",
      moduleId: 11,
      badge: "Challenge 2",
      title: "Below, at, or above zero",
      instruction: instructionBlock({
        goal: "For -5, display whether it is negative, zero, or positive (use the words required below).",
        expectedOutput: "negative"
      }),
      competences: ["Branches"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "negative",
      helperText: "Use one word as specified.",
      successText: "Correct."
    },
    {
      id: "11-3",
      moduleId: 11,
      badge: "Challenge 3",
      title: "Divisible by both 2 and 3",
      instruction: instructionBlock({
        goal: "For 12, display yes or no for divisible by both 2 and 3.",
        expectedOutput: "yes"
      }),
      competences: ["%"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "yes",
      helperText: "12 % 2 == 0 and 12 % 3 == 0",
      successText: "Correct."
    },
    {
      id: "11-4",
      moduleId: 11,
      badge: "Challenge 4",
      title: "Access granted",
      instruction: instructionBlock({
        goal: "With username admin and password 1234, display access granted only if both match exactly.",
        expectedOutput: "access granted"
      }),
      competences: ["and"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "access granted",
      helperText: "Exact string match for both.",
      successText: "Correct."
    },
    {
      id: "11-5",
      moduleId: 11,
      badge: "Challenge 5",
      title: "Which life stage?",
      instruction: instructionBlock({
        goal: "For age 17, display the life stage label (child / teenager / adult / senior).",
        expectedOutput: "teenager"
      }),
      competences: ["elif"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "teenager",
      helperText: "17 is 13–17 inclusive.",
      successText: "Correct."
    },
    {
      id: "11-6",
      moduleId: 11,
      badge: "Challenge 6",
      title: "Distance from zero",
      instruction: instructionBlock({
        goal: "Display the distance of -42 from zero without using abs().",
        expectedOutput: "42"
      }),
      competences: ["abs without abs"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "42",
      helperText: "-n if n < 0 else n",
      successText: "Correct."
    },
    {
      id: "11-7",
      moduleId: 11,
      badge: "Challenge 7",
      title: "Largest of three",
      instruction: instructionBlock({
        goal: "Display the largest of 4, 9, and 6 without max().",
        expectedOutput: "9"
      }),
      competences: ["Comparisons"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "9",
      helperText: "Nested if or pairwise max.",
      successText: "Correct."
    },
    {
      id: "11-8",
      moduleId: 11,
      badge: "Challenge 8",
      title: "Even or odd in one expression",
      instruction: instructionBlock({
        goal: "For 7, display even or odd using one expression.",
        expectedOutput: "odd"
      }),
      competences: ["Ternary"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "odd",
      helperText: '"even" if n%2==0 else "odd"',
      successText: "Correct."
    },
    {
      id: "11-9",
      moduleId: 11,
      badge: "Challenge 9",
      title: "Is it a leap year?",
      instruction: instructionBlock({
        goal: "Display whether 2024 is a leap year (full calendar rules).",
        expectedOutput: "True"
      }),
      competences: ["Calendar logic"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "True",
      helperText: "2024 is divisible by 4, not a bad century case.",
      successText: "Correct."
    },
    {
      id: "11-10",
      moduleId: 11,
      badge: "Challenge 10",
      title: "Valid username?",
      instruction: instructionBlock({
        goal: "For username 'hi', display valid or invalid per the length and space rules.",
        expectedOutput: "invalid"
      }),
      competences: ["Validation"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "invalid",
      helperText: "len('hi') < 3",
      successText: "Correct."
    },
    {
      id: "11-11",
      moduleId: 11,
      badge: "Challenge 11",
      title: "Membership discount",
      instruction: instructionBlock({
        goal: "With member True and total 150, apply 15% off only when both rules apply; show final amount.",
        expectedOutput: "127.5"
      }),
      competences: ["Business logic"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "127.5",
      helperText: "150 * 0.85",
      successText: "Correct."
    },
    {
      id: "11-12",
      moduleId: 11,
      badge: "Challenge 12",
      title: "Days in a month",
      instruction: instructionBlock({
        goal: "For month 2 and year 2024, display how many days that month has.",
        expectedOutput: "29"
      }),
      competences: ["Calendar"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "29",
      helperText: "2024 is a leap year, so February has 29 days.",
      successText: "Correct."
    }
  ]
};
