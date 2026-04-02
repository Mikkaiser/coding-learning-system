import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_2: ModuleDefinition = {
  id: 2,
  title: "Documenting Your Intent",
  description:
    "Professional code is read far more often than it is written. In this module you will learn how to leave notes inside your code that help others — and your future self — understand what is happening and why.",
  challenges: [
    {
      id: "2-1",
      moduleId: 2,
      badge: "Challenge 1",
      title: "A note above every line",
      instruction: instructionBlock({
        goal: "Add a note above each line of the script below explaining what that line does; the displayed result must stay exactly as shown.",
        expectedOutput: "7"
      }),
      competences: ["Notes", "Readability"],
      kind: "output",
      initialCode: `x = 3
y = 4
print(x + y)
`,
      expected: "7",
      helperText: "Notes start with #. They are ignored when the program runs.",
      successText: "Correct — output is still 7."
    },
    {
      id: "2-2",
      moduleId: 2,
      badge: "Challenge 2",
      title: "Disable code without deleting it",
      instruction: instructionBlock({
        goal: "Disable the first two lines so they do not run, without deleting any code.",
        expectedOutput: "line 3"
      }),
      competences: ["Notes", "Debugging"],
      kind: "fix",
      initialCode: `print("line 1")
print("line 2")
print("line 3")
`,
      expected: "line 3",
      helperText: "Use # at the start of a line to disable it.",
      successText: "Correct — only line 3 runs."
    },
    {
      id: "2-3",
      moduleId: 2,
      badge: "Challenge 3",
      title: "Spot the useless note",
      instruction: instructionBlock({
        goal: "Five notes appear in the script; pick the one that communicates real intent."
      }),
      competences: ["Intent", "Documentation"],
      kind: "mcq",
      initialCode: "",
      snippet: `# A) Add 1 to x
x = x + 1

# B) Loop counter
for i in range(10):
    pass

# C) We cap at 100 here because the API rejects higher values
if value > 100:
    value = 100

# D) Set name to Alice
name = "Alice"

# E) True
is_active = True`,
      options: ["A", "B", "C", "D", "E"],
      correctOption: "C",
      helperText: "Look for the why, not the what.",
      successText: "Correct — C explains a real constraint."
    },
    {
      id: "2-4",
      moduleId: 2,
      badge: "Challenge 4",
      title: "Plan before you code",
      instruction: instructionBlock({
        goal: "Store two numbers, multiply them, and display the result — with a short plan written as notes in the file first.",
        expectedOutput: "42"
      }),
      competences: ["Planning", "Notes"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "42",
      helperText: "Use # notes for your plan, then code.",
      successText: "Correct — output is 42."
    },
    {
      id: "2-5",
      moduleId: 2,
      badge: "Challenge 5",
      title: "Notes for a complete beginner",
      instruction: instructionBlock({
        goal: "Add helpful notes to the script below without changing what it displays.",
        expectedOutput: "Hello, Alice! You are 30 years old."
      }),
      competences: ["Documentation"],
      kind: "output",
      initialCode: `name = "Alice"
age = 30
print(f"Hello, {name}! You are {age} years old.")
`,
      expected: "Hello, Alice! You are 30 years old.",
      helperText: "Add helpful # lines; do not change behavior.",
      successText: "Correct — output unchanged."
    },
    {
      id: "2-6",
      moduleId: 2,
      badge: "Challenge 6",
      title: "What vs. why",
      instruction: instructionBlock({
        goal: "Pick the note that explains why the code exists, not only what it does."
      }),
      competences: ["Intent"],
      kind: "mcq",
      initialCode: "",
      snippet: `# A) Multiply price by 1.2
price = price * 1.2

# B) We add 20% because EU regulations require VAT to be included in displayed prices
price = price * 1.2

# C) price times 1.2
price = price * 1.2`,
      options: ["A", "B", "C"],
      correctOption: "B",
      helperText: "Regulation context is the why.",
      successText: "Correct — B explains why."
    }
  ]
};
