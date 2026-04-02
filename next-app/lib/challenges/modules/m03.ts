import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_3: ModuleDefinition = {
  id: 3,
  title: "Storing and Naming Data",
  description:
    "Programs need to remember things. In this module you will learn how to store values, give them meaningful names, and update them as your program runs.",
  challenges: [
    {
      id: "3-1",
      moduleId: 3,
      badge: "Challenge 1",
      title: "Store and display three things",
      instruction: instructionBlock({
        goal: "Store name Python, version 3, and fun True, then display each on its own line.",
        expectedOutput: "Python\n3\nTrue"
      }),
      competences: ["Variables", "Assignment"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Python\n3\nTrue",
      helperText: "Display each stored value on its own line.",
      successText: "Correct — three lines match."
    },
    {
      id: "3-2",
      moduleId: 3,
      badge: "Challenge 2",
      title: "Change a stored value",
      instruction: instructionBlock({
        goal: "Store 10 and display it, then change the value to 20 and display again.",
        expectedOutput: "10\n20"
      }),
      competences: ["Variables", "Updates"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "10\n20",
      helperText: "Assign, display, assign again, display again.",
      successText: "Correct — 10 then 20."
    },
    {
      id: "3-3",
      moduleId: 3,
      badge: "Challenge 3",
      title: "Predict which names will crash",
      instruction: instructionBlock({
        goal: "Without running the script, identify which storage names would crash."
      }),
      competences: ["Naming rules"],
      kind: "mcq",
      initialCode: "",
      snippet: `my_name = "Alice"   # A
2fast = "speed"     # B
_hidden = 99        # C
my-score = 50       # D
class = "Math"      # E`,
      options: ["B and D only", "B, D, and E", "D and E only", "All of them"],
      correctOption: "B, D, and E",
      helperText: "Identifiers cannot start with a digit; hyphens and reserved words are invalid.",
      successText: "Correct."
    },
    {
      id: "3-4",
      moduleId: 3,
      badge: "Challenge 4",
      title: "Swap two stored values",
      instruction: instructionBlock({
        goal: "With a = 5 and b = 10, swap values so each holds the other’s value, then display a then b.",
        expectedOutput: "10\n5"
      }),
      competences: ["Variables", "Swapping"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "10\n5",
      helperText: "Use a temporary variable or tuple unpacking.",
      successText: "Correct — values swapped."
    },
    {
      id: "3-5",
      moduleId: 3,
      badge: "Challenge 5",
      title: "Assign the same value in one line",
      instruction: instructionBlock({
        goal: "Assign 0 to three names in one line, then display all three on one line separated by spaces.",
        expectedOutput: "0 0 0"
      }),
      competences: ["Chained assignment"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "0 0 0",
      helperText: "Example: a = b = c = 0",
      successText: "Correct."
    },
    {
      id: "3-6",
      moduleId: 3,
      badge: "Challenge 6",
      title: "Unpack three values at once",
      instruction: instructionBlock({
        goal: "Unpack [10, 20, 30] into a, b, c in one line, then display each on its own line.",
        expectedOutput: "10\n20\n30"
      }),
      competences: ["Unpacking"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "10\n20\n30",
      helperText: "a, b, c = ...",
      successText: "Correct."
    },
    {
      id: "3-7",
      moduleId: 3,
      badge: "Challenge 7",
      title: "Track a running total",
      instruction: instructionBlock({
        goal: "Start at 0 and add 10, 20, 30, 40, 50 one at a time, displaying the total after each step.",
        expectedOutput: "10\n30\n60\n100\n150"
      }),
      competences: ["Accumulation"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "10\n30\n60\n100\n150",
      helperText: "Update a total variable inside a loop or repeated steps.",
      successText: "Correct."
    },
    {
      id: "3-8",
      moduleId: 3,
      badge: "Challenge 8",
      title: "Rename what was badly named",
      instruction: instructionBlock({
        goal: "Rename variables so names match what they store; keep the displayed line exactly as shown.",
        expectedOutput: "Name: Alice, Age: 25, Active: True"
      }),
      competences: ["Naming", "Refactoring"],
      kind: "fix",
      initialCode: `temperature = "Alice"
color = 25
weight = True
print(f"Name: {temperature}, Age: {color}, Active: {weight}")
`,
      expected: "Name: Alice, Age: 25, Active: True",
      helperText: "Use meaningful names that match what each value represents.",
      successText: "Correct — output matches."
    }
  ]
};
