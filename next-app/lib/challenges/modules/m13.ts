import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_13: ModuleDefinition = {
  id: 13,
  title: "Repeating Over Collections",
  description:
    "When you have a collection of data, you often need to do something with every item in it. In this module you will write programs that move through collections systematically.",
  challenges: [
    {
      id: "13-1",
      moduleId: 13,
      badge: "Challenge 1",
      title: "Each item on its own line",
      instruction: instructionBlock({
        goal: "Display each item in ['cat', 'dog', 'bird'] on its own line.",
        expectedOutput: "cat\ndog\nbird"
      }),
      competences: ["for"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "cat\ndog\nbird",
      helperText: "for x in lst: print(x)",
      successText: "Correct."
    },
    {
      id: "13-2",
      moduleId: 13,
      badge: "Challenge 2",
      title: "Sum 1 to 100 by going through them",
      instruction: instructionBlock({
        goal: "Add 1 through 100 by visiting each number in a loop.",
        expectedOutput: "5050"
      }),
      competences: ["Accumulation"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "5050",
      helperText: "for i in range(1, 101): total += i",
      successText: "Correct."
    },
    {
      id: "13-3",
      moduleId: 13,
      badge: "Challenge 3",
      title: "Only the even numbers",
      instruction: instructionBlock({
        goal: "Print only even numbers from 1 to 20, one per line.",
        expectedOutput: "2\n4\n6\n8\n10\n12\n14\n16\n18\n20"
      }),
      competences: ["Filtering"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "2\n4\n6\n8\n10\n12\n14\n16\n18\n20",
      helperText: "if i % 2 == 0",
      successText: "Correct."
    },
    {
      id: "13-4",
      moduleId: 13,
      badge: "Challenge 4",
      title: "Each character with its position",
      instruction: instructionBlock({
        goal: "For 'abc', print each index and character in the format below.",
        expectedOutput: "0: a\n1: b\n2: c"
      }),
      competences: ["enumerate"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "0: a\n1: b\n2: c",
      helperText: "enumerate(s)",
      successText: "Correct."
    },
    {
      id: "13-5",
      moduleId: 13,
      badge: "Challenge 5",
      title: "Multiplication table",
      instruction: instructionBlock({
        goal: "Print the 7 times table from 1 to 10, one equation per line.",
        expectedOutput:
          "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70"
      }),
      competences: ["Loops"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected:
        "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70",
      helperText: "Spaces around x and = as shown.",
      successText: "Correct."
    },
    {
      id: "13-6",
      moduleId: 13,
      badge: "Challenge 6",
      title: "5x5 grid of stars",
      instruction: instructionBlock({
        goal: "Print a 5×5 grid; each row must be five stars separated by spaces.",
        expectedOutput: "* * * * *\n* * * * *\n* * * * *\n* * * * *\n* * * * *"
      }),
      competences: ["Nested loops"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "* * * * *\n* * * * *\n* * * * *\n* * * * *\n* * * * *",
      helperText: "print('* '*5).strip() per row or join.",
      successText: "Correct."
    },
    {
      id: "13-7",
      moduleId: 13,
      badge: "Challenge 7",
      title: "Two collections side by side",
      instruction: instructionBlock({
        goal: "Pair names ['Alice','Bob'] with scores [90,85] as shown.",
        expectedOutput: "Alice: 90\nBob: 85"
      }),
      competences: ["zip"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Alice: 90\nBob: 85",
      helperText: "zip(names, scores)",
      successText: "Correct."
    },
    {
      id: "13-8",
      moduleId: 13,
      badge: "Challenge 8",
      title: "How many exceed the threshold?",
      instruction: instructionBlock({
        goal: "Count how many values in [5, 12, 3, 8, 20, 1, 15] are greater than 10.",
        expectedOutput: "3"
      }),
      competences: ["Counting"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "3",
      helperText: "sum(1 for x in lst if x > 10)",
      successText: "Correct."
    },
    {
      id: "13-9",
      moduleId: 13,
      badge: "Challenge 9",
      title: "Cubes of 1 to 10",
      instruction: instructionBlock({
        goal: "Display the list of cubes from 1 through 10.",
        expectedOutput: "[1, 8, 27, 64, 125, 216, 343, 512, 729, 1000]"
      }),
      competences: ["Comprehension"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "[1, 8, 27, 64, 125, 216, 343, 512, 729, 1000]",
      helperText: "[i**3 for i in range(1,11)]",
      successText: "Correct."
    },
    {
      id: "13-10",
      moduleId: 13,
      badge: "Challenge 10",
      title: "Reversed by going through it",
      instruction: instructionBlock({
        goal: "Reverse 'abcde' character by character without slicing shortcuts.",
        expectedOutput: "edcba"
      }),
      competences: ["Loops"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "edcba",
      helperText: "Build string in loop; no [::-1].",
      successText: "Correct."
    },
    {
      id: "13-11",
      moduleId: 13,
      badge: "Challenge 11",
      title: "Divisible by both 3 and 5",
      instruction: instructionBlock({
        goal: "List numbers 1–100 divisible by 3 and 5 on one comma-separated line.",
        expectedOutput: "15, 30, 45, 60, 75, 90"
      }),
      competences: ["Filtering"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "15, 30, 45, 60, 75, 90",
      helperText: "if i % 15 == 0",
      successText: "Correct."
    },
    {
      id: "13-12",
      moduleId: 13,
      badge: "Challenge 12",
      title: "Right-aligned triangle",
      instruction: instructionBlock({
        goal: "Print a right-aligned star triangle, width 5, as shown.",
        expectedOutput: "    *\n   **\n  ***\n ****\n*****"
      }),
      competences: ["Formatting"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "    *\n   **\n  ***\n ****\n*****",
      helperText: "Pad with spaces: (width-i) spaces + * i times.",
      successText: "Correct."
    },
    {
      id: "13-13",
      moduleId: 13,
      badge: "Challenge 13",
      title: "Each value only once",
      instruction: instructionBlock({
        goal: "From [1, 2, 2, 3, 1, 4, 3], build unique values in first-seen order.",
        expectedOutput: "[1, 2, 3, 4]"
      }),
      competences: ["Order-preserving unique"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "[1, 2, 3, 4]",
      helperText: "Seen set while iterating.",
      successText: "Correct."
    },
    {
      id: "13-14",
      moduleId: 13,
      badge: "Challenge 14",
      title: "Factorial by going through the values",
      instruction: instructionBlock({
        goal: "Compute 6! by multiplying in a loop.",
        expectedOutput: "720"
      }),
      competences: ["Loops"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "720",
      helperText: "product 1..6",
      successText: "Correct."
    },
    {
      id: "13-15",
      moduleId: 13,
      badge: "Challenge 15",
      title: "Pairs that sum to a target",
      instruction: instructionBlock({
        goal: "List every pair in [1..6] that sums to 7 (each pair once, i < j).",
        expectedOutput: "(1, 6)\n(2, 5)\n(3, 4)"
      }),
      competences: ["Nested loops"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "(1, 6)\n(2, 5)\n(3, 4)",
      helperText: "i < j indices, lst[i]+lst[j]==7",
      successText: "Correct."
    }
  ]
};
