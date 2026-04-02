import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_10: ModuleDefinition = {
  id: 10,
  title: "Working With Collections",
  description:
    "Real programs rarely work with just one piece of data at a time. In this module you will learn to store, retrieve, and manipulate ordered collections of values.",
  challenges: [
    {
      id: "10-1",
      moduleId: 10,
      badge: "Challenge 1",
      title: "The third item",
      instruction: instructionBlock({
        goal: "From the five-item collection given, display the third item.",
        expectedOutput: "cherry"
      }),
      competences: ["Indexing"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "cherry",
      helperText: "Index 2 for third item.",
      successText: "Correct."
    },
    {
      id: "10-2",
      moduleId: 10,
      badge: "Challenge 2",
      title: "Add one, remove one",
      instruction: instructionBlock({
        goal: "Start from [1, 2, 3], append 4, remove the first item, then display the collection.",
        expectedOutput: "[2, 3, 4]"
      }),
      competences: [".append", ".pop"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "[2, 3, 4]",
      helperText: "Mutate then print the list.",
      successText: "Correct."
    },
    {
      id: "10-3",
      moduleId: 10,
      badge: "Challenge 3",
      title: "Sorted largest to smallest",
      instruction: instructionBlock({
        goal: "Display [3, 1, 4, 1, 5, 9, 2, 6] sorted from largest to smallest.",
        expectedOutput: "[9, 6, 5, 4, 3, 2, 1, 1]"
      }),
      competences: ["sorted"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "[9, 6, 5, 4, 3, 2, 1, 1]",
      helperText: "sorted(..., reverse=True)",
      successText: "Correct."
    },
    {
      id: "10-4",
      moduleId: 10,
      badge: "Challenge 4",
      title: "Only the middle three",
      instruction: instructionBlock({
        goal: "From seven items [10..70], display only the middle three.",
        expectedOutput: "[30, 40, 50]"
      }),
      competences: ["Slicing"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "[30, 40, 50]",
      helperText: "lst[2:5]",
      successText: "Correct."
    },
    {
      id: "10-5",
      moduleId: 10,
      badge: "Challenge 5",
      title: "Total without a built-in",
      instruction: instructionBlock({
        goal: "Total [1, 2, 3, 4, 5] without using sum() or similar.",
        expectedOutput: "15"
      }),
      competences: ["Loops"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "15",
      helperText: "No sum(); use a loop.",
      successText: "Correct."
    },
    {
      id: "10-6",
      moduleId: 10,
      badge: "Challenge 6",
      title: "Does the value appear?",
      instruction: instructionBlock({
        goal: "Display whether 20 appears in [10, 20, 30].",
        expectedOutput: "True"
      }),
      competences: ["in"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "True",
      helperText: "20 in lst",
      successText: "Correct."
    },
    {
      id: "10-7",
      moduleId: 10,
      badge: "Challenge 7",
      title: "How many times?",
      instruction: instructionBlock({
        goal: "Count how many times 2 appears in [1, 2, 2, 3, 2, 4].",
        expectedOutput: "3"
      }),
      competences: [".count"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "3",
      helperText: ".count(2)",
      successText: "Correct."
    },
    {
      id: "10-8",
      moduleId: 10,
      badge: "Challenge 8",
      title: "Reversed without a built-in",
      instruction: instructionBlock({
        goal: "Reverse [1, 2, 3, 4, 5] without reversed() or similar.",
        expectedOutput: "[5, 4, 3, 2, 1]"
      }),
      competences: ["Loops"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "[5, 4, 3, 2, 1]",
      helperText: "No reversed(); build new list.",
      successText: "Correct."
    },
    {
      id: "10-9",
      moduleId: 10,
      badge: "Challenge 9",
      title: "Combine and deduplicate",
      instruction: instructionBlock({
        goal: "Merge [1, 2, 3] and [2, 3, 4, 5], drop duplicates, display sorted.",
        expectedOutput: "[1, 2, 3, 4, 5]"
      }),
      competences: ["set", "sorted"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "[1, 2, 3, 4, 5]",
      helperText: "sorted(set(a+b))",
      successText: "Correct."
    },
    {
      id: "10-10",
      moduleId: 10,
      badge: "Challenge 10",
      title: "Largest without a built-in",
      instruction: instructionBlock({
        goal: "Find the largest value in [3, 7, 1, 9, 4] without max() or similar.",
        expectedOutput: "9"
      }),
      competences: ["Loops"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "9",
      helperText: "No max(); scan manually.",
      successText: "Correct."
    },
    {
      id: "10-11",
      moduleId: 10,
      badge: "Challenge 11",
      title: "Every value squared",
      instruction: instructionBlock({
        goal: "Build the collection of squares from 1 through 10.",
        expectedOutput: "[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]"
      }),
      competences: ["Comprehensions"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]",
      helperText: "[i*i for i in range(1,11)]",
      successText: "Correct."
    },
    {
      id: "10-12",
      moduleId: 10,
      badge: "Challenge 12",
      title: "Remove every occurrence",
      instruction: instructionBlock({
        goal: "Remove every 3 from [1, 3, 2, 3, 4, 3] and display the result.",
        expectedOutput: "[1, 2, 4]"
      }),
      competences: ["List comp"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "[1, 2, 4]",
      helperText: "[x for x in lst if x != 3]",
      successText: "Correct."
    },
    {
      id: "10-13",
      moduleId: 10,
      badge: "Challenge 13",
      title: "Flatten a nested collection",
      instruction: instructionBlock({
        goal: "Flatten [[1, 2], [3, 4], [5, 6]] into one collection.",
        expectedOutput: "[1, 2, 3, 4, 5, 6]"
      }),
      competences: ["Nested loops"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "[1, 2, 3, 4, 5, 6]",
      helperText: "Nested loop or extend.",
      successText: "Correct."
    },
    {
      id: "10-14",
      moduleId: 10,
      badge: "Challenge 14",
      title: "Rotate right by one",
      instruction: instructionBlock({
        goal: "Move the last item of [1, 2, 3, 4, 5] to the front.",
        expectedOutput: "[5, 1, 2, 3, 4]"
      }),
      competences: ["Slicing"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "[5, 1, 2, 3, 4]",
      helperText: "[lst[-1]] + lst[:-1]",
      successText: "Correct."
    },
    {
      id: "10-15",
      moduleId: 10,
      badge: "Challenge 15",
      title: "The two largest values",
      instruction: instructionBlock({
        goal: "Write two_largest(lst) returning the two largest values (largest first) without sorting the whole list or using max()."
      }),
      competences: ["Algorithms"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [
        {
          functionName: "two_largest",
          cases: [
            { args: [[3, 1, 4, 1, 5]], expected: [5, 4] },
            { args: [[10, 20]], expected: [20, 10] },
            { args: [[7, 7, 7]], expected: [7, 7] },
            { args: [[2, 9, 4, 6]], expected: [9, 6] }
          ]
        }
      ],
      helperText: "Scan twice or track top two.",
      successText: "Correct — all tests passed."
    }
  ]
};
