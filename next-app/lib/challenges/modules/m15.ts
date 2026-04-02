import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_15: ModuleDefinition = {
  id: 15,
  title: "Using External Tools",
  description:
    "You do not have to build everything from scratch. In this module you will learn to bring in ready-made collections of tools and use them to solve problems that would be tedious to solve alone.",
  challenges: [
    {
      id: "15-1",
      moduleId: 15,
      badge: "Challenge 1",
      title: "Square roots of five numbers",
      instruction: instructionBlock({
        goal: "Display the square roots of 1, 4, 9, 16, 25 — one per line — using math.",
        expectedOutput: "1.0\n2.0\n3.0\n4.0\n5.0"
      }),
      competences: ["import math"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "1.0\n2.0\n3.0\n4.0\n5.0",
      helperText: "import math; math.sqrt",
      successText: "Correct."
    },
    {
      id: "15-2",
      moduleId: 15,
      badge: "Challenge 2",
      title: "A random whole number",
      instruction: instructionBlock({
        goal: "After random.seed(42), display one random whole number from 1 to 100.",
        expectedOutput: "82"
      }),
      competences: ["random"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "82",
      helperText: "random.seed(42); random.randint(1, 100)",
      successText: "Correct."
    },
    {
      id: "15-3",
      moduleId: 15,
      badge: "Challenge 3",
      title: "Shuffle a collection",
      instruction: instructionBlock({
        goal: "With random.seed(0), shuffle ['a','b','c','d','e'] in place and display the list.",
        expectedOutput: "['c', 'b', 'a', 'e', 'd']"
      }),
      competences: ["random.shuffle"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "['c', 'b', 'a', 'e', 'd']",
      helperText: "shuffle mutates list; print list repr.",
      successText: "Correct."
    },
    {
      id: "15-4",
      moduleId: 15,
      badge: "Challenge 4",
      title: "Today's date",
      instruction: instructionBlock({
        goal: "Format datetime.date(2024, 6, 15) as a readable month-day-year line.",
        expectedOutput: "June 15, 2024"
      }),
      competences: ["datetime"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "June 15, 2024",
      helperText:
        "strftime('%B %d, %Y').strip leading zero if needed — use %-d on Unix or format day without leading zero.",
      successText: "Correct."
    },
    {
      id: "15-5",
      moduleId: 15,
      badge: "Challenge 5",
      title: "Area of a circle",
      instruction: instructionBlock({
        goal: "With radius 5, display circle area using the best pi available, rounded to four decimals.",
        expectedOutput: "78.5398"
      }),
      competences: ["math.pi"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "78.5398",
      helperText: "round(math.pi * r * r, 4)",
      successText: "Correct."
    },
    {
      id: "15-6",
      moduleId: 15,
      badge: "Challenge 6",
      title: "Pick one at random",
      instruction: instructionBlock({
        goal: "With random.seed(1), pick one item from rock / paper / scissors.",
        expectedOutput: "rock"
      }),
      competences: ["random.choice"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "rock",
      helperText: "random.seed(1); random.choice([...])",
      successText: "Correct."
    },
    {
      id: "15-7",
      moduleId: 15,
      badge: "Challenge 7",
      title: "Date as DD/MM/YYYY",
      instruction: instructionBlock({
        goal: "Display datetime.date(2024, 3, 5) as DD/MM/YYYY.",
        expectedOutput: "05/03/2024"
      }),
      competences: ["strftime"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "05/03/2024",
      helperText: "%d/%m/%Y",
      successText: "Correct."
    },
    {
      id: "15-8",
      moduleId: 15,
      badge: "Challenge 8",
      title: "Nearest whole numbers",
      instruction: instructionBlock({
        goal: "For 4.3, display ceiling and floor lines as shown.",
        expectedOutput: "ceiling: 5\nfloor: 4"
      }),
      competences: ["math.ceil", "math.floor"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "ceiling: 5\nfloor: 4",
      helperText: "math.ceil and math.floor",
      successText: "Correct."
    },
    {
      id: "15-9",
      moduleId: 15,
      badge: "Challenge 9",
      title: "Random 8-character password",
      instruction: instructionBlock({
        goal: "With random.seed(99), display an 8-character password from letters and digits.",
        expectedOutput: "zymMlopi"
      }),
      competences: ["random", "string"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "zymMlopi",
      helperText: "string.ascii_letters + string.digits",
      successText: "Correct."
    },
    {
      id: "15-10",
      moduleId: 15,
      badge: "Challenge 10",
      title: "Where is this script running?",
      instruction: instructionBlock({
        goal: "Display the full path of the working directory your script runs in (any non-empty path is accepted)."
      }),
      competences: ["os"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "__any_nonempty__",
      helperText: "Use os.getcwd() to get the current working directory.",
      successText: "Correct — non-empty path."
    }
  ]
};
