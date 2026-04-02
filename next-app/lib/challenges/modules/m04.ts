import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_4: ModuleDefinition = {
  id: 4,
  title: "Understanding What Your Data Is",
  description:
    "Not all data is the same. A number and a word behave differently, and mixing them up causes problems. In this module you will learn to identify what kind of data your program is working with and why it matters.",
  challenges: [
    {
      id: "4-1",
      moduleId: 4,
      badge: "Challenge 1",
      title: "Display what kind of data each value is",
      instruction: instructionBlock({
        goal: "For 42, 3.14, 'hello', True, and None, display each value’s kind on its own line.",
        expectedOutput:
          "<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>\n<class 'NoneType'>"
      }),
      competences: ["type()", "Kinds of data"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected:
        "<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>\n<class 'NoneType'>",
      helperText: "Use type(...) and display it.",
      successText: "Correct."
    },
    {
      id: "4-2",
      moduleId: 4,
      badge: "Challenge 2",
      title: "One of each fundamental kind",
      instruction: instructionBlock({
        goal: "Store one value of each kind, then display each line in the format shown.",
        expectedOutput: "int: 42\nfloat: 3.14\nstr: hello\nbool: True"
      }),
      competences: ["Types", "Literals"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "int: 42\nfloat: 3.14\nstr: hello\nbool: True",
      helperText: "Format each line exactly as shown.",
      successText: "Correct."
    },
    {
      id: "4-3",
      moduleId: 4,
      badge: "Challenge 3",
      title: "Two divisions that look the same",
      instruction: instructionBlock({
        goal: "Compute 10 / 2 and 10 // 2, then display the kind of each result on its own line.",
        expectedOutput: "<class 'float'>\n<class 'int'>"
      }),
      competences: ["/", "//", "Types"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "<class 'float'>\n<class 'int'>",
      helperText: "Compute each division, then type(...).",
      successText: "Correct."
    },
    {
      id: "4-4",
      moduleId: 4,
      badge: "Challenge 4",
      title: "Wrong kind causes wrong output",
      instruction: instructionBlock({
        goal: "Fix the script so numeric addition works and the display matches the target.",
        expectedOutput: "100"
      }),
      competences: ["Conversion"],
      kind: "fix",
      initialCode: `score = "95"
bonus = 5
print(score + bonus)
`,
      expected: "100",
      helperText: "Convert kinds before combining.",
      successText: "Correct."
    },
    {
      id: "4-5",
      moduleId: 4,
      badge: "Challenge 5",
      title: "A value that looks like a number",
      instruction: instructionBlock({
        goal: "Fix the script so it displays the numeric result as shown.",
        expectedOutput: "50"
      }),
      competences: ["int()", "str"],
      kind: "fix",
      initialCode: `value = "42"
print(value + 8)
`,
      expected: "50",
      helperText: "Convert to a whole number before adding.",
      successText: "Correct."
    },
    {
      id: "4-6",
      moduleId: 4,
      badge: "Challenge 6",
      title: "Predict the kind returned",
      instruction: instructionBlock({
        goal: "Predict what kind of value this expression returns before you run it."
      }),
      competences: ["len()", "Types"],
      kind: "mcq",
      initialCode: "",
      snippet: 'result = len("hello")',
      options: ["<class 'int'>", "<class 'str'>", "<class 'float'>", "<class 'bool'>"],
      correctOption: "<class 'int'>",
      helperText: "len returns a count.",
      successText: "Correct."
    },
    {
      id: "4-7",
      moduleId: 4,
      badge: "Challenge 7",
      title: "Kind, content, and whether it has a length",
      instruction: instructionBlock({
        goal: "With value = 'hello', display kind, content, and whether it has a length (safely).",
        expectedOutput: "<class 'str'>\nhello\nTrue"
      }),
      competences: ["len()", "try/except"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "<class 'str'>\nhello\nTrue",
      helperText: "Use a try/except around len() to safely check whether the value has a length.",
      successText: "Correct."
    },
    {
      id: "4-8",
      moduleId: 4,
      badge: "Challenge 8",
      title: "Three type mismatch scripts",
      instruction: instructionBlock({
        goal: "Fix all three scripts so the three lines of output match exactly.",
        expectedOutput: "The year is 2024\n30\nFalse"
      }),
      competences: ["Types", "Fixing"],
      kind: "fix",
      initialCode: `# Script 1
year = 2024
print("The year is " + year)

# Script 2
total = "10" + "20"
print(total)

# Script 3
print(1 == "1")
`,
      expected: "The year is 2024\n30\nFalse",
      helperText: "Fix concatenation, numeric addition, and comparison kinds.",
      successText: "Correct."
    }
  ]
};
