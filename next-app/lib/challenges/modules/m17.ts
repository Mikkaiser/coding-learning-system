import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_17: ModuleDefinition = {
  id: 17,
  title: "When Things Go Wrong",
  description:
    "Every real program encounters unexpected situations — bad data, missing files, impossible operations. In this module you will learn to anticipate failure, handle it gracefully, and keep your program in control even when something goes wrong.",
  challenges: [
    {
      id: "17-1",
      moduleId: 17,
      badge: "Challenge 1",
      title: "Handle the impossible calculation",
      instruction: instructionBlock({
        goal: "Catch 10 / 0 and display the message below instead of crashing.",
        expectedOutput: "Cannot divide by zero."
      }),
      competences: ["try/except"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Cannot divide by zero.",
      helperText: "except ZeroDivisionError",
      successText: "Correct."
    },
    {
      id: "17-2",
      moduleId: 17,
      badge: "Challenge 2",
      title: "Handle the bad conversion",
      instruction: instructionBlock({
        goal: "Try int('abc'); on failure display the line below.",
        expectedOutput: "Invalid number."
      }),
      competences: ["ValueError"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Invalid number.",
      helperText: "int('abc') raises ValueError",
      successText: "Correct."
    },
    {
      id: "17-3",
      moduleId: 17,
      badge: "Challenge 3",
      title: "Always run the final step",
      instruction: instructionBlock({
        goal: "Try 1/0, print error in except, then always print done in finally.",
        expectedOutput: "error\ndone"
      }),
      competences: ["finally"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "error\ndone",
      helperText: "try/except/finally",
      successText: "Correct."
    },
    {
      id: "17-4",
      moduleId: 17,
      badge: "Challenge 4",
      title: "Signal that something is wrong",
      instruction: instructionBlock({
        goal: "Raise or surface Must be positive for check_positive(-1) and display that text.",
        expectedOutput: "Must be positive"
      }),
      competences: ["raise"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Must be positive",
      helperText: "raise ValueError('Must be positive') and catch",
      successText: "Correct."
    },
    {
      id: "17-5",
      moduleId: 17,
      badge: "Challenge 5",
      title: "Two different failures, handled separately",
      instruction: instructionBlock({
        goal: "For each item in [1, 0, 'a'], try 10 / item; print result, zero, or type — one line each.",
        expectedOutput: "10.0\nzero\ntype"
      }),
      competences: ["except branches"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "10.0\nzero\ntype",
      helperText: "except ZeroDivisionError, TypeError",
      successText: "Correct."
    },
    {
      id: "17-6",
      moduleId: 17,
      badge: "Challenge 6",
      title: "Why is the catch-all dangerous?",
      instruction: instructionBlock({
        goal: "Pick why a bare except: pass is a bad idea."
      }),
      competences: ["Best practices"],
      kind: "mcq",
      initialCode: "",
      snippet: `try:
    risky_operation()
except:
    pass`,
      options: [
        "It catches everything including KeyboardInterrupt and SystemExit, making the program impossible to stop",
        "It runs too slowly on large programs",
        "Python 3 removed support for bare except",
        "It only works on TypeError"
      ],
      correctOption:
        "It catches everything including KeyboardInterrupt and SystemExit, making the program impossible to stop",
      helperText: "Bare except is almost never what you want.",
      successText: "Correct."
    },
    {
      id: "17-7",
      moduleId: 17,
      badge: "Challenge 7",
      title: "Handle a missing position",
      instruction: instructionBlock({
        goal: "Access index 10 on [1,2,3] safely; display the message below on failure.",
        expectedOutput: "Index out of bounds."
      }),
      competences: ["IndexError"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Index out of bounds.",
      helperText: "except IndexError",
      successText: "Correct."
    },
    {
      id: "17-8",
      moduleId: 17,
      badge: "Challenge 8",
      title: "Handle a missing key",
      instruction: instructionBlock({
        goal: "Read key 'z' from {'a':1}; on failure display the line below.",
        expectedOutput: "Key not found."
      }),
      competences: ["KeyError"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Key not found.",
      helperText: "d['z'] or .get",
      successText: "Correct."
    },
    {
      id: "17-9",
      moduleId: 17,
      badge: "Challenge 9",
      title: "Handle a missing file",
      instruction: instructionBlock({
        goal: "Open nonexistent.txt safely and display the message below if missing.",
        expectedOutput: "File not found."
      }),
      competences: ["FileNotFoundError"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "File not found.",
      helperText: "open(...); except FileNotFoundError",
      successText: "Correct."
    },
    {
      id: "17-10",
      moduleId: 17,
      badge: "Challenge 10",
      title: "Record it and pass it on",
      instruction: instructionBlock({
        goal: "Inner: log then re-raise; outer: print handled — two lines as below.",
        expectedOutput: "logged\nhandled"
      }),
      competences: ["raise", "chaining"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "logged\nhandled",
      helperText: "except: print('logged'); raise",
      successText: "Correct."
    },
    {
      id: "17-11",
      moduleId: 17,
      badge: "Challenge 11",
      title: "Try again up to three times",
      instruction: instructionBlock({
        goal: "Write retry(func, times) returning the first success or None after all failures."
      }),
      competences: ["Retry pattern"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [],
      helperText: "Custom harness tests flaky vs always-fail.",
      successText: "Correct."
    },
    {
      id: "17-12",
      moduleId: 17,
      badge: "Challenge 12",
      title: "Your own failure type",
      instruction: instructionBlock({
        goal: "Define InsufficientFundsError; catch it and display Balance too low.",
        expectedOutput: "Balance too low"
      }),
      competences: ["Custom exceptions"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Balance too low",
      helperText: "class InsufficientFundsError(Exception): pass",
      successText: "Correct."
    }
  ]
};
