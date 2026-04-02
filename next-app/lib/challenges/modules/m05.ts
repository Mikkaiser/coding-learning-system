import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_5: ModuleDefinition = {
  id: 5,
  title: "Working With Numbers",
  description:
    "Numbers are at the core of almost every program. In this module you will solve real calculation problems and learn how computers handle arithmetic — including some behaviors that might surprise you.",
  challenges: [
    {
      id: "5-1",
      moduleId: 5,
      badge: "Challenge 1",
      title: "Area of a rectangle",
      instruction: instructionBlock({
        goal: "A rectangle is width 7 and height 3 — display its area.",
        expectedOutput: "21"
      }),
      competences: ["Arithmetic"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "21",
      helperText: "Multiply width by height.",
      successText: "Correct."
    },
    {
      id: "5-2",
      moduleId: 5,
      badge: "Challenge 2",
      title: "Celsius to Fahrenheit",
      instruction: instructionBlock({
        goal: "Convert 100 °C to Fahrenheit using F = C × 9/5 + 32 and display the result.",
        expectedOutput: "212.0"
      }),
      competences: ["Formulas"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "212.0",
      helperText: "Use floating division so the result matches.",
      successText: "Correct."
    },
    {
      id: "5-3",
      moduleId: 5,
      badge: "Challenge 3",
      title: "Minutes and seconds from total seconds",
      instruction: instructionBlock({
        goal: "From 137 seconds, display full minutes and leftover seconds in the format shown.",
        expectedOutput: "2 minutes and 17 seconds"
      }),
      competences: ["Division", "Remainder"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "2 minutes and 17 seconds",
      helperText: "Use // and %.",
      successText: "Correct."
    },
    {
      id: "5-4",
      moduleId: 5,
      badge: "Challenge 4",
      title: "Predict the order of operations",
      instruction: instructionBlock({
        goal: "Predict the result of the expression without running it (then explain in a note)."
      }),
      competences: ["Order of operations"],
      kind: "mcq",
      initialCode: "",
      snippet: "print(2 + 3 * 4 - 1)",
      options: ["13", "19", "11", "20"],
      correctOption: "13",
      helperText: "Multiplication before addition and subtraction.",
      successText: "Correct."
    },
    {
      id: "5-5",
      moduleId: 5,
      badge: "Challenge 5",
      title: "Average of five numbers",
      instruction: instructionBlock({
        goal: "Average 10, 20, 30, 40, 50 and display it rounded to two decimal places (no imports).",
        expectedOutput: "30.0"
      }),
      competences: ["Average"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "30.0",
      helperText: "Sum / 5, format to two decimals.",
      successText: "Correct."
    },
    {
      id: "5-6",
      moduleId: 5,
      badge: "Challenge 6",
      title: "The third side of a triangle",
      instruction: instructionBlock({
        goal: "For a right triangle with a = 3 and b = 4, display the hypotenuse using **.",
        expectedOutput: "5.0"
      }),
      competences: ["Powers"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "5.0",
      helperText: "c = (a**2 + b**2) ** 0.5",
      successText: "Correct."
    },
    {
      id: "5-7",
      moduleId: 5,
      badge: "Challenge 7",
      title: "Price after a discount",
      instruction: instructionBlock({
        goal: "An item costs 80.00 — apply 25% off and display the final price.",
        expectedOutput: "60.0"
      }),
      competences: ["Percentages"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "60.0",
      helperText: "Multiply by 0.75 or subtract 25%.",
      successText: "Correct."
    },
    {
      id: "5-8",
      moduleId: 5,
      badge: "Challenge 8",
      title: "The floating-point surprise",
      instruction: instructionBlock({
        goal: "Explain the float issue in a note and fix the display so it matches exactly.",
        expectedOutput: "0.3"
      }),
      competences: ["float", "round"],
      kind: "fix",
      initialCode: `result = 0.1 + 0.2
print(result)
`,
      expected: "0.3",
      helperText: "Use round() to correct the floating-point result.",
      successText: "Correct."
    },
    {
      id: "5-9",
      moduleId: 5,
      badge: "Challenge 9",
      title: "Six operations, clearly labeled",
      instruction: instructionBlock({
        goal: "With a = 10 and b = 2, display sum, difference, product, quotient, integer quotient, and remainder as labeled lines.",
        expectedOutput:
          "sum: 12\ndifference: 8\nproduct: 20\nquotient: 5.0\ninteger quotient: 5\nremainder: 0"
      }),
      competences: ["Arithmetic"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected:
        "sum: 12\ndifference: 8\nproduct: 20\nquotient: 5.0\ninteger quotient: 5\nremainder: 0",
      helperText: "Use // for integer quotient and % for remainder.",
      successText: "Correct."
    },
    {
      id: "5-10",
      moduleId: 5,
      badge: "Challenge 10",
      title: "Annual salary broken down",
      instruction: instructionBlock({
        goal: "From annual salary 52000, display monthly, weekly, and daily amounts rounded to two decimals.",
        expectedOutput: "monthly: 4333.33\nweekly: 1000.0\ndaily: 142.47"
      }),
      competences: ["Division", "Rounding"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "monthly: 4333.33\nweekly: 1000.0\ndaily: 142.47",
      helperText: "monthly = /12, weekly = /52, daily = /365",
      successText: "Correct."
    }
  ]
};
