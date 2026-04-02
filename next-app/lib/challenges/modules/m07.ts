import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_7: ModuleDefinition = {
  id: 7,
  title: "Working With Text",
  description:
    "Text is everywhere in software — names, messages, file paths, user input. In this module you will manipulate text in increasingly complex ways to extract meaning, reformat it, and make decisions based on its content.",
  challenges: [
    {
      id: "7-1",
      moduleId: 7,
      badge: "Challenge 1",
      title: "First and last character",
      instruction: instructionBlock({
        goal: "With the word 'Python' stored, display its first and last character on separate lines.",
        expectedOutput: "P\nn"
      }),
      competences: ["Indexing"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "P\nn",
      helperText: "Use index 0 and index -1.",
      successText: "Correct."
    },
    {
      id: "7-2",
      moduleId: 7,
      badge: "Challenge 2",
      title: "Forwards and backwards",
      instruction: instructionBlock({
        goal: "Display 'hello' forward, then backward — one line each.",
        expectedOutput: "hello\nolleh"
      }),
      competences: ["Slicing"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "hello\nolleh",
      helperText: "s[::-1] for reverse.",
      successText: "Correct."
    },
    {
      id: "7-3",
      moduleId: 7,
      badge: "Challenge 3",
      title: "Count a specific letter",
      instruction: instructionBlock({
        goal: "In 'banana', count how many times the letter 'a' appears.",
        expectedOutput: "3"
      }),
      competences: [".count()"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "3",
      helperText: "Use .count('a').",
      successText: "Correct."
    },
    {
      id: "7-4",
      moduleId: 7,
      badge: "Challenge 4",
      title: "Uppercase and length",
      instruction: instructionBlock({
        goal: "With 'alice' stored, display it in uppercase, then its length — one line each.",
        expectedOutput: "ALICE\n5"
      }),
      competences: [".upper()", "len()"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "ALICE\n5",
      helperText: "upper() then len().",
      successText: "Correct."
    },
    {
      id: "7-5",
      moduleId: 7,
      badge: "Challenge 5",
      title: "Replace spaces with hyphens",
      instruction: instructionBlock({
        goal: "Replace every space in 'hello world foo' with a hyphen.",
        expectedOutput: "hello-world-foo"
      }),
      competences: [".replace()"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "hello-world-foo",
      helperText: "replace(' ', '-')",
      successText: "Correct."
    },
    {
      id: "7-6",
      moduleId: 7,
      badge: "Challenge 6",
      title: "Remove the extra whitespace",
      instruction: instructionBlock({
        goal: "Display ' hello ' with leading and trailing spaces removed.",
        expectedOutput: "hello"
      }),
      competences: [".strip()"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "hello",
      helperText: "strip()",
      successText: "Correct."
    },
    {
      id: "7-7",
      moduleId: 7,
      badge: "Challenge 7",
      title: "Split and reassemble",
      instruction: instructionBlock({
        goal: "Show the words split into a collection, then the same sentence rejoined — one line each.",
        expectedOutput: "['the', 'quick', 'brown', 'fox']\nthe quick brown fox"
      }),
      competences: [".split()", "join"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "['the', 'quick', 'brown', 'fox']\nthe quick brown fox",
      helperText: "split(), then ' '.join(...).",
      successText: "Correct."
    },
    {
      id: "7-8",
      moduleId: 7,
      badge: "Challenge 8",
      title: "Does the word appear?",
      instruction: instructionBlock({
        goal: "In 'hello world', display whether 'world' appears in the text.",
        expectedOutput: "True"
      }),
      competences: ["in"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "True",
      helperText: "Use in or find.",
      successText: "Correct."
    },
    {
      id: "7-9",
      moduleId: 7,
      badge: "Challenge 9",
      title: "Extract the domain from an email",
      instruction: instructionBlock({
        goal: "From 'user@example.com', display only the domain (after @).",
        expectedOutput: "example.com"
      }),
      competences: ["Slicing"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "example.com",
      helperText: "Split on @ and take [1].",
      successText: "Correct."
    },
    {
      id: "7-10",
      moduleId: 7,
      badge: "Challenge 10",
      title: "Combine into a formatted sentence",
      instruction: instructionBlock({
        goal: "Combine Ada, Python, and 1991 into one sentence as shown.",
        expectedOutput: "Ada wrote Python in 1991."
      }),
      competences: ["f-strings"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Ada wrote Python in 1991.",
      helperText: "Match punctuation at the end.",
      successText: "Correct."
    },
    {
      id: "7-11",
      moduleId: 7,
      badge: "Challenge 11",
      title: "Always five digits wide",
      instruction: instructionBlock({
        goal: "Display 42 padded to five digits with leading zeros.",
        expectedOutput: "00042"
      }),
      competences: ["Formatting"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "00042",
      helperText: "f'{n:05d}'",
      successText: "Correct."
    },
    {
      id: "7-12",
      moduleId: 7,
      badge: "Challenge 12",
      title: "Count the words",
      instruction: instructionBlock({
        goal: "Count how many words are in 'one two three four five' without extra tools.",
        expectedOutput: "5"
      }),
      competences: [".split()"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "5",
      helperText: "len(s.split()).",
      successText: "Correct."
    },
    {
      id: "7-13",
      moduleId: 7,
      badge: "Challenge 13",
      title: "Censor a word",
      instruction: instructionBlock({
        goal: "Write censor(text, word) that replaces every occurrence of word with stars matching that word’s length."
      }),
      competences: ["Text manipulation", "Reusable units"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [
        {
          functionName: "censor",
          cases: [
            { args: ["hello world", "world"], expected: "hello *****" },
            { args: ["bad word here", "bad"], expected: "*** word here" },
            { args: ["clean text", "xyz"], expected: "clean text" },
            { args: ["go away now", "away"], expected: "go **** now" }
          ]
        }
      ],
      helperText: "Replace each occurrence; stars count equals len(word).",
      successText: "Correct — all tests passed."
    },
    {
      id: "7-14",
      moduleId: 7,
      badge: "Challenge 14",
      title: "Does it read the same both ways?",
      instruction: instructionBlock({
        goal: "Tell whether the phrase is a palindrome when you keep only letters and ignore spaces and casing.",
        expectedOutput: "True"
      }),
      competences: ["Palindrome"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "True",
      helperText: "Strip non-letters, lowercase everything, then compare to its reverse.",
      successText: "Correct."
    },
    {
      id: "7-15",
      moduleId: 7,
      badge: "Challenge 15",
      title: "Extract and reformat structured data",
      instruction: instructionBlock({
        goal: "Parse 'john doe, 87, 2024-03-15' and display the summary lines below.",
        expectedOutput: "Name: John Doe\nScore: 87\nDate: 15/03/2024"
      }),
      competences: ["Parsing", "Formatting"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Name: John Doe\nScore: 87\nDate: 15/03/2024",
      helperText: "Split by comma, strip parts.",
      successText: "Correct."
    }
  ]
};
