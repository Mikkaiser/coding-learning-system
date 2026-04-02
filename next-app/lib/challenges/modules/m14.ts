import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_14: ModuleDefinition = {
  id: 14,
  title: "Reusable Logic",
  description:
    "Writing the same logic in multiple places is a maintenance nightmare. In this module you will learn to package logic into reusable units that accept inputs, do work, and return results.",
  challenges: [
    {
      id: "14-1",
      moduleId: 14,
      badge: "Challenge 1",
      title: "Square a number",
      instruction: instructionBlock({
        goal: "Write square(n) that returns n squared."
      }),
      competences: ["def", "return"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [
        {
          functionName: "square",
          cases: [
            { args: [2], expected: 4 },
            { args: [3], expected: 9 },
            { args: [0], expected: 0 },
            { args: [-4], expected: 16 },
            { args: [10], expected: 100 }
          ]
        }
      ],
      helperText: "def square(n): return n * n",
      successText: "Correct — all tests passed."
    },
    {
      id: "14-2",
      moduleId: 14,
      badge: "Challenge 2",
      title: "Add and subtract",
      instruction: instructionBlock({
        goal: "Write add(a, b) and subtract(a, b) as separate reusable units."
      }),
      competences: ["Functions", "Testing"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      helperText:
        "Use the names add and subtract at the top level. The automated harness runs the full test suite.",
      successText: "Correct — all harness checks pass."
    },
    {
      id: "14-3",
      moduleId: 14,
      badge: "Challenge 3",
      title: "Largest of three",
      instruction: instructionBlock({
        goal: "Write largest(a, b, c) returning the largest value."
      }),
      competences: ["def"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [
        {
          functionName: "largest",
          cases: [
            { args: [1, 2, 3], expected: 3 },
            { args: [9, 3, 6], expected: 9 },
            { args: [-1, -2, -3], expected: -1 },
            { args: [5, 5, 5], expected: 5 },
            { args: [100, 99, 98], expected: 100 }
          ]
        }
      ],
      helperText: "Compare pairwise or use max logic without calling max().",
      successText: "Correct."
    },
    {
      id: "14-4",
      moduleId: 14,
      badge: "Challenge 4",
      title: "Palindrome check",
      instruction: instructionBlock({
        goal: "Write is_palindrome(s) — ignore spaces and casing."
      }),
      competences: ["Text"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [
        {
          functionName: "is_palindrome",
          cases: [
            { args: ["racecar"], expected: true },
            { args: ["hello"], expected: false },
            { args: ["A man a plan a canal Panama"], expected: true },
            { args: ["a"], expected: true },
            { args: ["ab"], expected: false }
          ]
        }
      ],
      helperText: "Normalize letters only, lower case.",
      successText: "Correct."
    },
    {
      id: "14-5",
      moduleId: 14,
      badge: "Challenge 5",
      title: "A sensible default",
      instruction: instructionBlock({
        goal: "Define greet with default name World; call greet() and greet('Alice').",
        expectedOutput: "Hello, World!\nHello, Alice!"
      }),
      competences: ["Default args"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Hello, World!\nHello, Alice!",
      helperText: "def greet(name='World'):",
      successText: "Correct."
    },
    {
      id: "14-6",
      moduleId: 14,
      badge: "Challenge 6",
      title: "Any number of inputs",
      instruction: instructionBlock({
        goal: "Write my_sum(*args) that returns the total of all arguments."
      }),
      competences: ["*args"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [
        {
          functionName: "my_sum",
          cases: [
            { args: [1, 2, 3], expected: 6 },
            { args: [10], expected: 10 },
            { args: [], expected: 0 },
            { args: [1, 2, 3, 4, 5], expected: 15 }
          ]
        }
      ],
      helperText: "Harness calls my_sum(1, 2, 3) — spread args as separate parameters.",
      successText: "Correct."
    },
    {
      id: "14-7",
      moduleId: 14,
      badge: "Challenge 7",
      title: "Two results at once",
      instruction: instructionBlock({
        goal: "Define min_max(lst) and print its result for [3, 1, 4, 1, 5].",
        expectedOutput: "(1, 5)"
      }),
      competences: ["Tuples"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "(1, 5)",
      helperText: "return (min_v, max_v); print repr",
      successText: "Correct."
    },
    {
      id: "14-8",
      moduleId: 14,
      badge: "Challenge 8",
      title: "Scope: inside vs. outside",
      instruction: instructionBlock({
        goal: "Show outer x stays 10 after a function sets local x = 99.",
        expectedOutput: "10"
      }),
      competences: ["Scope"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "10",
      helperText: "Outer x unchanged.",
      successText: "Correct."
    },
    {
      id: "14-9",
      moduleId: 14,
      badge: "Challenge 9",
      title: "One unit calls another",
      instruction: instructionBlock({
        goal: "Implement double(n) and quad(n) using double twice; display quad(3).",
        expectedOutput: "12"
      }),
      competences: ["Composition"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "12",
      helperText: "quad(n)=double(double(n))",
      successText: "Correct."
    },
    {
      id: "14-10",
      moduleId: 14,
      badge: "Challenge 10",
      title: "Factorial that calls itself",
      instruction: instructionBlock({
        goal: "Write factorial(n) using recursion."
      }),
      competences: ["Recursion"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [
        {
          functionName: "factorial",
          cases: [
            { args: [0], expected: 1 },
            { args: [1], expected: 1 },
            { args: [5], expected: 120 },
            { args: [10], expected: 3628800 }
          ]
        }
      ],
      helperText: "Base case n<=1.",
      successText: "Correct."
    },
    {
      id: "14-11",
      moduleId: 14,
      badge: "Challenge 11",
      title: "Fibonacci that calls itself",
      instruction: instructionBlock({
        goal: "Write fib(n) returning the Fibonacci number at position n (recursive)."
      }),
      competences: ["Recursion"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [
        {
          functionName: "fib",
          cases: [
            { args: [0], expected: 0 },
            { args: [1], expected: 1 },
            { args: [5], expected: 5 },
            { args: [10], expected: 55 }
          ]
        }
      ],
      helperText: "fib(0)=0, fib(1)=1",
      successText: "Correct."
    },
    {
      id: "14-12",
      moduleId: 14,
      badge: "Challenge 12",
      title: "A compact unnamed unit",
      instruction: instructionBlock({
        goal: "Assign a lambda that doubles a number to double; display double(7).",
        expectedOutput: "14"
      }),
      competences: ["lambda"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "14",
      helperText: "double = lambda x: x*2",
      successText: "Correct."
    },
    {
      id: "14-13",
      moduleId: 14,
      badge: "Challenge 13",
      title: "Apply to every item",
      instruction: instructionBlock({
        goal: "Square each item in [1..5] with a lambda and display the list.",
        expectedOutput: "[1, 4, 9, 16, 25]"
      }),
      competences: ["lambda", "map"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "[1, 4, 9, 16, 25]",
      helperText: "list(map(lambda x: x*x, ...))",
      successText: "Correct."
    },
    {
      id: "14-14",
      moduleId: 14,
      badge: "Challenge 14",
      title: "Keep only what passes",
      instruction: instructionBlock({
        goal: "Filter [1..6] to even values with a lambda; display the list.",
        expectedOutput: "[2, 4, 6]"
      }),
      competences: ["filter"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "[2, 4, 6]",
      helperText: "list(filter(lambda x: x%2==0, ...))",
      successText: "Correct."
    },
    {
      id: "14-15",
      moduleId: 14,
      badge: "Challenge 15",
      title: "Flexible named inputs",
      instruction: instructionBlock({
        goal: "Write format_info(**kwargs) returning name=value pairs sorted by name, joined with ', '."
      }),
      competences: ["**kwargs"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [
        {
          functionName: "format_info",
          cases: [
            { kwargs: { name: "Alice", age: 30 }, expected: "age=30, name=Alice" },
            { kwargs: { x: 1 }, expected: "x=1" }
          ]
        }
      ],
      helperText: "Sort keys, join with ', '",
      successText: "Correct."
    },
    {
      id: "14-16",
      moduleId: 14,
      badge: "Challenge 16",
      title: "Is it a plausible email?",
      instruction: instructionBlock({
        goal: "Write valid_email(s) using simple structural checks only."
      }),
      competences: ["Validation"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [
        {
          functionName: "valid_email",
          cases: [
            { args: ["user@example.com"], expected: true },
            { args: ["notanemail"], expected: false },
            { args: ["@nodomain.com"], expected: false },
            { args: ["user@"], expected: false },
            { args: ["a@b.co"], expected: true }
          ]
        }
      ],
      helperText: "Simple structural checks.",
      successText: "Correct."
    },
    {
      id: "14-17",
      moduleId: 14,
      badge: "Challenge 17",
      title: "A unit that accepts another unit",
      instruction: instructionBlock({
        goal: "Write apply_to_all(func, lst) without using map(); the harness uses a doubling lambda."
      }),
      competences: ["Higher-order"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      helperText: "Custom harness verifies with a doubling lambda.",
      successText: "Correct — harness passed."
    },
    {
      id: "14-18",
      moduleId: 14,
      badge: "Challenge 18",
      title: "Remember previous results",
      instruction: instructionBlock({
        goal: "Write memo_fib(n) with a cache so each n is computed only once."
      }),
      competences: ["Memoization"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [
        {
          functionName: "memo_fib",
          cases: [
            { args: [0], expected: 0 },
            { args: [1], expected: 1 },
            { args: [10], expected: 55 },
            { args: [30], expected: 832040 }
          ]
        }
      ],
      helperText: "Cache dict or list.",
      successText: "Correct."
    }
  ]
};
