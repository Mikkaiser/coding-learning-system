import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_6: ModuleDefinition = {
  id: 6,
  title: "Converting Between Data Kinds",
  description:
    "Data does not always arrive in the form you need it. In this module you will practice transforming data from one kind to another and learn what gets lost — or breaks — when you do.",
  challenges: [
    {
      id: "6-1",
      moduleId: 6,
      badge: "Challenge 1",
      title: "A number stored as text",
      instruction: instructionBlock({
        goal: "The value 25 is stored as text — add 10 and display the numeric result.",
        expectedOutput: "35"
      }),
      competences: ["int()", "Conversion"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "35",
      helperText: "Convert to a whole number before adding.",
      successText: "Correct."
    },
    {
      id: "6-2",
      moduleId: 6,
      badge: "Challenge 2",
      title: "Decimal to whole number",
      instruction: instructionBlock({
        goal: "Show 9.99, then its whole-number form, with a note about what happened to the rest.",
        expectedOutput: "9.99\n9"
      }),
      competences: ["int()", "float"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "9.99\n9",
      helperText: "Use int() truncates toward zero.",
      successText: "Correct."
    },
    {
      id: "6-3",
      moduleId: 6,
      badge: "Challenge 3",
      title: "Combine different kinds into one sentence",
      instruction: instructionBlock({
        goal: "Combine name, age, and score into one sentence exactly as shown.",
        expectedOutput: "Alice is 25 years old with a score of 98.5"
      }),
      competences: ["Formatting", "str"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Alice is 25 years old with a score of 98.5",
      helperText: "Use an f-string or format.",
      successText: "Correct."
    },
    {
      id: "6-4",
      moduleId: 6,
      badge: "Challenge 4",
      title: "Fix the crash when combining kinds",
      instruction: instructionBlock({
        goal: "Fix the script so it displays the line below without crashing.",
        expectedOutput: "The year is 2024"
      }),
      competences: ["str()", "Concatenation"],
      kind: "fix",
      initialCode: `year = 2024
print("The year is " + year)
`,
      expected: "The year is 2024",
      helperText: "Convert the whole number to text before concatenating.",
      successText: "Correct."
    },
    {
      id: "6-5",
      moduleId: 6,
      badge: "Challenge 5",
      title: "Three stages of conversion",
      instruction: instructionBlock({
        goal: "Show 7, then 7.0, then 7 again, each on its own line, plus a note about information loss.",
        expectedOutput: "7\n7.0\n7"
      }),
      competences: ["float()", "int()"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "7\n7.0\n7",
      helperText: "float(7), then int(...).",
      successText: "Correct."
    },
    {
      id: "6-6",
      moduleId: 6,
      badge: "Challenge 6",
      title: "Truth values as numbers",
      instruction: instructionBlock({
        goal: "Convert True and False to numbers and display each on its own line, with a note on the pattern.",
        expectedOutput: "1\n0"
      }),
      competences: ["int()", "bool"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "1\n0",
      helperText: "int(True) and int(False).",
      successText: "Correct."
    },
    {
      id: "6-7",
      moduleId: 6,
      badge: "Challenge 7",
      title: "Why does this crash?",
      instruction: instructionBlock({
        goal: "What error do you get when converting this text straight to a whole number?"
      }),
      competences: ["ValueError"],
      kind: "mcq",
      initialCode: "",
      snippet: 'print(int("3.14"))',
      options: ["TypeError", "ValueError", "SyntaxError", "It works fine and prints 3"],
      correctOption: "ValueError",
      helperText: "int() cannot parse a string with a decimal point.",
      successText: "Correct."
    },
    {
      id: "6-8",
      moduleId: 6,
      badge: "Challenge 8",
      title: "Safe conversion with a fallback",
      instruction: instructionBlock({
        goal: "Try to turn 'abc' into a whole number; if it fails, display 0 and do not crash.",
        expectedOutput: "0"
      }),
      competences: ["try/except", "int()"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "0",
      helperText: "Catch ValueError and print 0.",
      successText: "Correct."
    }
  ]
};
