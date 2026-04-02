import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_9: ModuleDefinition = {
  id: 9,
  title: "All the Ways to Operate on Data",
  description:
    "Programs transform data constantly. In this module you will use the full range of operations available and learn how combining them in different ways produces different results.",
  challenges: [
    {
      id: "9-1",
      moduleId: 9,
      badge: "Challenge 1",
      title: "Six operations labeled",
      instruction: instructionBlock({
        goal: "With a = 10 and b = 2, display sum, difference, product, quotient, integer quotient, and remainder as labeled lines.",
        expectedOutput:
          "sum: 12\ndifference: 8\nproduct: 20\nquotient: 5.0\ninteger quotient: 5\nremainder: 0"
      }),
      competences: ["Arithmetic"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected:
        "sum: 12\ndifference: 8\nproduct: 20\nquotient: 5.0\ninteger quotient: 5\nremainder: 0",
      helperText: "Match labels exactly.",
      successText: "Correct."
    },
    {
      id: "9-2",
      moduleId: 9,
      badge: "Challenge 2",
      title: "Five update operations",
      instruction: instructionBlock({
        goal: "Start at n = 10 and apply add 5, subtract 3, ×2, ÷6, then **2 — display n after each step.",
        expectedOutput: "15\n12\n24\n4.0\n16.0"
      }),
      competences: ["Augmented assignment"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "15\n12\n24\n4.0\n16.0",
      helperText: "Update n after each step.",
      successText: "Correct."
    },
    {
      id: "9-3",
      moduleId: 9,
      badge: "Challenge 3",
      title: "Hours, minutes, and seconds",
      instruction: instructionBlock({
        goal: "Convert 3723 seconds into hours, minutes, and seconds in the format shown.",
        expectedOutput: "1 hours, 2 minutes, 3 seconds"
      }),
      competences: ["Division"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "1 hours, 2 minutes, 3 seconds",
      helperText: "3723 // 3600, then remainder // 60, then % 60.",
      successText: "Correct."
    },
    {
      id: "9-4",
      moduleId: 9,
      badge: "Challenge 4",
      title: "Predict the mixed-operator result",
      instruction: instructionBlock({
        goal: "Predict the result without running the code."
      }),
      competences: ["**", "//"],
      kind: "mcq",
      initialCode: "",
      snippet: "print(5 ** 2 // 3)",
      options: ["8", "7", "9", "25"],
      correctOption: "8",
      helperText: "** before //.",
      successText: "Correct."
    },
    {
      id: "9-5",
      moduleId: 9,
      badge: "Challenge 5",
      title: "Parentheses change everything",
      instruction: instructionBlock({
        goal: "Show two expressions where parentheses change the value — line 1 without extra parens, line 2 with parens.",
        expectedOutput: "14\n20"
      }),
      competences: ["Precedence"],
      kind: "output",
      initialCode: "#Write your code here:\n# Hint: try (2 + 3) * 4 vs 2 + 3 * 4\n",
      expected: "14\n20",
      helperText: "2+3*4 vs (2+3)*4",
      successText: "Correct."
    },
    {
      id: "9-6",
      moduleId: 9,
      badge: "Challenge 6",
      title: "Short-circuit evaluation",
      instruction: instructionBlock({
        goal: "Print the result of False and (1/0==0) and of True or (1/0==0) — each on its own line, without crashing.",
        expectedOutput: "False\nTrue"
      }),
      competences: ["short-circuit"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "False\nTrue",
      helperText: "print(False and (1/0==0)); print(True or (1/0==0))",
      successText: "Correct."
    },
    {
      id: "9-7",
      moduleId: 9,
      badge: "Challenge 7",
      title: "Membership in text and in a collection",
      instruction: instructionBlock({
        goal: "For 'hello world' and [1,2,3,4], display whether 'world' is in the text, then whether 5 is in the collection.",
        expectedOutput: "True\nFalse"
      }),
      competences: ["in"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "True\nFalse",
      helperText: "'world' in s; 5 in lst",
      successText: "Correct."
    },
    {
      id: "9-8",
      moduleId: 9,
      badge: "Challenge 8",
      title: "Password validation",
      instruction: instructionBlock({
        goal: "For password 'secret', display whether it passes: length ≥ 8, no spaces, and not the literal 'password'.",
        expectedOutput: "False"
      }),
      competences: ["Logic"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "False",
      helperText: "'secret' is only 6 characters.",
      successText: "Correct."
    },
    {
      id: "9-9",
      moduleId: 9,
      badge: "Challenge 9",
      title: "Bitwise AND and OR",
      instruction: instructionBlock({
        goal: "For 5 and 3, display 5 & 3 then 5 | 3, with a note on what each did.",
        expectedOutput: "1\n7"
      }),
      competences: ["Bitwise"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "1\n7",
      helperText: "5 & 3 and 5 | 3",
      successText: "Correct."
    },
    {
      id: "9-10",
      moduleId: 9,
      badge: "Challenge 10",
      title: "Fix the operator precedence bug",
      instruction: instructionBlock({
        goal: "Fix the expression so it evaluates to the target (add a note explaining the fix).",
        expectedOutput: "100"
      }),
      competences: ["Precedence"],
      kind: "fix",
      initialCode: `# This should calculate (2 + 3) squared, which is 25, times 4 = 100
result = 2 + 3 ** 2 * 4
print(result)
`,
      expected: "100",
      helperText: "Use parentheses: ((2 + 3) ** 2) * 4",
      successText: "Correct."
    }
  ]
};
