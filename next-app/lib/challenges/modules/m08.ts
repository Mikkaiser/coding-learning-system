import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_8: ModuleDefinition = {
  id: 8,
  title: "Making True/False Decisions",
  description:
    "Every decision a program makes comes down to something being true or false. In this module you will learn to construct and evaluate conditions that your programs will use to choose what to do.",
  challenges: [
    {
      id: "8-1",
      moduleId: 8,
      badge: "Challenge 1",
      title: "Greater than 100?",
      instruction: instructionBlock({
        goal: "With 150 stored, display whether it is greater than 100.",
        expectedOutput: "True"
      }),
      competences: ["Comparisons"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "True",
      helperText: "print(150 > 100)",
      successText: "Correct."
    },
    {
      id: "8-2",
      moduleId: 8,
      badge: "Challenge 2",
      title: "Exactly identical?",
      instruction: instructionBlock({
        goal: "With 'Python' and 'python' stored, display whether they match exactly (including casing).",
        expectedOutput: "False"
      }),
      competences: ["==", "Case"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "False",
      helperText: "Case-sensitive equality.",
      successText: "Correct."
    },
    {
      id: "8-3",
      moduleId: 8,
      badge: "Challenge 3",
      title: "Predict the boolean result",
      instruction: instructionBlock({
        goal: "Predict the result of the expression before you run it."
      }),
      competences: ["not", "and", "or"],
      kind: "mcq",
      initialCode: "",
      snippet: "print(not True or False and True)",
      options: ["True", "False", "None", "Error"],
      correctOption: "False",
      helperText: "not True is False; and binds tighter than or.",
      successText: "Correct."
    },
    {
      id: "8-4",
      moduleId: 8,
      badge: "Challenge 4",
      title: "Between 10 and 50?",
      instruction: instructionBlock({
        goal: "With 35 stored, display whether it lies between 10 and 50 (inclusive).",
        expectedOutput: "True"
      }),
      competences: ["Chained comparisons"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "True",
      helperText: "10 <= 35 <= 50",
      successText: "Correct."
    },
    {
      id: "8-5",
      moduleId: 8,
      badge: "Challenge 5",
      title: "Not empty and more than three characters",
      instruction: instructionBlock({
        goal: "With name = 'Alice', display whether it is non-empty and longer than three characters.",
        expectedOutput: "True"
      }),
      competences: ["and", "len()"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "True",
      helperText: "len(name) > 3 and name",
      successText: "Correct."
    },
    {
      id: "8-6",
      moduleId: 8,
      badge: "Challenge 6",
      title: "Three values — all positive, one negative, none zero",
      instruction: instructionBlock({
        goal: "With a = 5, b = -3, c = 8, display three truth lines: all positive, any negative, none zero.",
        expectedOutput: "False\nTrue\nTrue"
      }),
      competences: ["all()", "any()"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "False\nTrue\nTrue",
      helperText: "all(a>0,b>0,c>0); any(...<0); all(...!=0)",
      successText: "Correct."
    },
    {
      id: "8-7",
      moduleId: 8,
      badge: "Challenge 7",
      title: "Empty-looking values",
      instruction: instructionBlock({
        goal: "For '', 0, and [], display each value’s truthiness on its own line.",
        expectedOutput: "False\nFalse\nFalse"
      }),
      competences: ["Truthiness"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "False\nFalse\nFalse",
      helperText: "bool(...) for each.",
      successText: "Correct."
    },
    {
      id: "8-8",
      moduleId: 8,
      badge: "Challenge 8",
      title: "All conditions at once",
      instruction: instructionBlock({
        goal: "With a = 4, b = 7, c = 2, display one truth value: all positive, none above 100, and sum even.",
        expectedOutput: "False"
      }),
      competences: ["Logic"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "False",
      helperText: "All are positive and none exceeds 100, but their sum (13) is odd.",
      successText: "Correct."
    }
  ]
};
