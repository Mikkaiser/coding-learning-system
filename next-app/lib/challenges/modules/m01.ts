import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_1: ModuleDefinition = {
  id: 1,
  title: "Your First Programs",
  description:
    "Computers execute instructions in order. In this module you will write your first scripts and learn how structure and spacing affect whether a program runs at all.",
  challenges: [
    {
      id: "1-1",
      moduleId: 1,
      badge: "Challenge 1",
      title: "Your first line of output",
      instruction: instructionBlock({
        goal: "Display a single line of text on the screen.",
        expectedOutput: "Hello, World!"
      }),
      competences: ["Output", "Syntax basics"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Hello, World!",
      helperText: "Use print() to display text. The output must match exactly.",
      successText: "Correct — your output matches exactly."
    },
    {
      id: "1-2",
      moduleId: 1,
      badge: "Challenge 2",
      title: "Three pieces of information",
      instruction: instructionBlock({
        goal: "Display three separate values, one value per line.",
        expectedOutput: "Alex\n20\nPython"
      }),
      competences: ["Output", "Multiple lines"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Alex\n20\nPython",
      helperText: "Use one display statement per line.",
      successText: "Correct — three lines match."
    },
    {
      id: "1-3",
      moduleId: 1,
      badge: "Challenge 3",
      title: "A poem with spacing",
      instruction: instructionBlock({
        goal: "Display a short poem where spacing and line breaks are part of the output.",
        expectedOutput: "Roses are red\nViolets are blue\nPython is cool"
      }),
      competences: ["Output", "Formatting"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Roses are red\nViolets are blue\nPython is cool",
      helperText: "Match line breaks exactly.",
      successText: "Correct — poem output matches."
    },
    {
      id: "1-4",
      moduleId: 1,
      badge: "Challenge 4",
      title: "A blank line between two blocks",
      instruction: instructionBlock({
        goal: "Display two blocks of text with a blank line between them (use an empty display call for the blank line).",
        expectedOutput: "Good morning.\n\nHave a great day."
      }),
      competences: ["Output", "Blank lines"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Good morning.\n\nHave a great day.",
      helperText: "A blank line is just an empty print() call.",
      successText: "Correct — spacing matches."
    },
    {
      id: "1-5",
      moduleId: 1,
      badge: "Challenge 5",
      title: "Fix the script that refuses to run",
      instruction: instructionBlock({
        goal: "Fix the script so it runs and matches the intended display.",
        expectedOutput: "Hello!"
      }),
      competences: ["Indentation", "Debugging"],
      kind: "fix",
      initialCode: `def greet():
print("Hello!")
greet()
`,
      expected: "Hello!",
      helperText:
        "Python uses indentation to define blocks. Every line inside a reusable unit must be indented.",
      successText: "Correct — the script runs and displays Hello!"
    },
    {
      id: "1-6",
      moduleId: 1,
      badge: "Challenge 6",
      title: "Predict which script will fail",
      instruction: instructionBlock({
        goal: "Without running them, predict which scripts will fail and why."
      }),
      competences: ["Reading code", "Indentation"],
      kind: "mcq",
      initialCode: "",
      snippet: `A)
if True:
print("ok")

B)
if True:
    print("ok")
     print("also ok")

C)
for i in range(3):
    print(i)`,
      options: ["Only A", "Only B", "A and B", "Only C"],
      correctOption: "A and B",
      helperText: "Compare indentation carefully.",
      successText: "Correct — A and B fail due to indentation issues."
    }
  ]
};
