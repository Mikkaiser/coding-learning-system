import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_12: ModuleDefinition = {
  id: 12,
  title: "Repeating With Conditions",
  description:
    "Some tasks need to repeat until something changes. In this module you will write programs that keep running a block of code as long as a condition holds — and learn how to control exactly when they stop.",
  challenges: [
    {
      id: "12-1",
      moduleId: 12,
      badge: "Challenge 1",
      title: "1 to 10",
      instruction: instructionBlock({
        goal: "Display 1 through 10, one number per line.",
        expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10"
      }),
      competences: ["for"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
      helperText: "range(1, 11)",
      successText: "Correct."
    },
    {
      id: "12-2",
      moduleId: 12,
      badge: "Challenge 2",
      title: "Countdown from 10",
      instruction: instructionBlock({
        goal: "Display a countdown from 10 down to 0, one per line.",
        expectedOutput: "10\n9\n8\n7\n6\n5\n4\n3\n2\n1\n0"
      }),
      competences: ["range"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "10\n9\n8\n7\n6\n5\n4\n3\n2\n1\n0",
      helperText: "range(10, -1, -1)",
      successText: "Correct."
    },
    {
      id: "12-3",
      moduleId: 12,
      badge: "Challenge 3",
      title: "Keep doubling",
      instruction: instructionBlock({
        goal: "Start at 1 and double until you pass 1000; print each value including the first over 1000.",
        expectedOutput: "2\n4\n8\n16\n32\n64\n128\n256\n512\n1024"
      }),
      competences: ["while"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "2\n4\n8\n16\n32\n64\n128\n256\n512\n1024",
      helperText: "Start n=1, loop n*=2, print after each double until >1000.",
      successText: "Correct."
    },
    {
      id: "12-4",
      moduleId: 12,
      badge: "Challenge 4",
      title: "Sum from 1 to 100",
      instruction: instructionBlock({
        goal: "Display the sum of numbers 1 through 100.",
        expectedOutput: "5050"
      }),
      competences: ["sum loop"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "5050",
      helperText: "Gauss: n(n+1)/2 or loop.",
      successText: "Correct."
    },
    {
      id: "12-5",
      moduleId: 12,
      badge: "Challenge 5",
      title: "Skip the multiples of 3",
      instruction: instructionBlock({
        goal: "Print 1–20 skipping multiples of 3.",
        expectedOutput: "1\n2\n4\n5\n7\n8\n10\n11\n13\n14\n16\n17\n19\n20"
      }),
      competences: ["continue"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "1\n2\n4\n5\n7\n8\n10\n11\n13\n14\n16\n17\n19\n20",
      helperText: "if n % 3 == 0: continue",
      successText: "Correct."
    },
    {
      id: "12-6",
      moduleId: 12,
      badge: "Challenge 6",
      title: "Find the first negative",
      instruction: instructionBlock({
        goal: "In [4, 7, 2, -9, 1, 5], print the index of the first negative value.",
        expectedOutput: "3"
      }),
      competences: ["break"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "3",
      helperText: "enumerate until value < 0",
      successText: "Correct."
    },
    {
      id: "12-7",
      moduleId: 12,
      badge: "Challenge 7",
      title: "Stop at divisible by 3 and 7",
      instruction: instructionBlock({
        goal: "Print 1 upward until you hit a number divisible by both 3 and 7, then stop.",
        expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21"
      }),
      competences: ["break"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21",
      helperText: "Break at 21.",
      successText: "Correct."
    },
    {
      id: "12-8",
      moduleId: 12,
      badge: "Challenge 8",
      title: "First number over 50 divisible by 7",
      instruction: instructionBlock({
        goal: "Print the first number greater than 50 that is divisible by 7.",
        expectedOutput: "56"
      }),
      competences: ["while"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "56",
      helperText: "Start at 51, step until %7==0",
      successText: "Correct."
    },
    {
      id: "12-9",
      moduleId: 12,
      badge: "Challenge 9",
      title: "PIN entry system",
      instruction: instructionBlock({
        goal: "Simulate PIN entry for 1234 with attempts 0000, 1111, 1234 — match the messages below.",
        expectedOutput: "Wrong PIN.\nWrong PIN.\nAccess granted."
      }),
      competences: ["Simulation"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Wrong PIN.\nWrong PIN.\nAccess granted.",
      helperText: "Match exact lines including punctuation.",
      successText: "Correct."
    },
    {
      id: "12-10",
      moduleId: 12,
      badge: "Challenge 10",
      title: "Digits one at a time",
      instruction: instructionBlock({
        goal: "For 1234, print digits last-to-first using only arithmetic (no string conversion).",
        expectedOutput: "4\n3\n2\n1"
      }),
      competences: ["//", "%"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "4\n3\n2\n1",
      helperText: "n % 10, n //= 10",
      successText: "Correct."
    }
  ]
};
