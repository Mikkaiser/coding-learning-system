import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_16: ModuleDefinition = {
  id: 16,
  title: "Modeling the World With Objects",
  description:
    "Complex programs model real things — accounts, products, users, systems. In this module you will learn to define your own data structures that bundle related information and behavior together.",
  challenges: [
    {
      id: "16-1",
      moduleId: 16,
      badge: "Challenge 1",
      title: "A structure for a dog",
      instruction: instructionBlock({
        goal: "Define a dog with name and breed; create Rex the Lab and display each on its own line.",
        expectedOutput: "Rex\nLab"
      }),
      competences: ["class"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Rex\nLab",
      helperText: "Use a class with __init__.",
      successText: "Correct."
    },
    {
      id: "16-2",
      moduleId: 16,
      badge: "Challenge 2",
      title: "A behavior that introduces",
      instruction: instructionBlock({
        goal: "Add introduce() and display its result for Rex the Lab.",
        expectedOutput: "Hi, I am Rex and I am a Lab."
      }),
      competences: ["Methods"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Hi, I am Rex and I am a Lab.",
      helperText: "Return or print from introduce.",
      successText: "Correct."
    },
    {
      id: "16-3",
      moduleId: 16,
      badge: "Challenge 3",
      title: "Two instances compared",
      instruction: instructionBlock({
        goal: "Create two Labs and display whether their breeds match.",
        expectedOutput: "True"
      }),
      competences: ["Equality"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "True",
      helperText: "Compare .breed attributes.",
      successText: "Correct."
    },
    {
      id: "16-4",
      moduleId: 16,
      badge: "Challenge 4",
      title: "A birthday behavior",
      instruction: instructionBlock({
        goal: "Start at age 3, call birthday(), display the new age.",
        expectedOutput: "4"
      }),
      competences: ["Methods"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "4",
      helperText: "self.age += 1",
      successText: "Correct."
    },
    {
      id: "16-5",
      moduleId: 16,
      badge: "Challenge 5",
      title: "A bank account structure",
      instruction: instructionBlock({
        goal: "Implement BankAccount with deposit and withdraw; the harness checks balance after a sequence."
      }),
      competences: ["class_sequence harness"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [],
      helperText: "Automated harness: BankAccount(100), deposit, withdraw, balance==120.",
      successText: "Correct."
    },
    {
      id: "16-6",
      moduleId: 16,
      badge: "Challenge 6",
      title: "Rejected when funds are low",
      instruction: instructionBlock({
        goal: "With balance 50, try to withdraw 100 and display the message below.",
        expectedOutput: "Insufficient funds."
      }),
      competences: ["Validation"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Insufficient funds.",
      helperText: "Do not change balance if invalid.",
      successText: "Correct."
    },
    {
      id: "16-7",
      moduleId: 16,
      badge: "Challenge 7",
      title: "A readable description",
      instruction: instructionBlock({
        goal: "Implement __str__ so printing an account with balance 100 matches the line below.",
        expectedOutput: "Account balance: 100"
      }),
      competences: ["__str__"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Account balance: 100",
      helperText: "Define __str__",
      successText: "Correct."
    },
    {
      id: "16-8",
      moduleId: 16,
      badge: "Challenge 8",
      title: "Shared information across all instances",
      instruction: instructionBlock({
        goal: "Store species on the class; display it from an instance and from the class.",
        expectedOutput: "Canis lupus\nCanis lupus"
      }),
      competences: ["class attribute"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Canis lupus\nCanis lupus",
      helperText: "Dog.species and d.species",
      successText: "Correct."
    },
    {
      id: "16-9",
      moduleId: 16,
      badge: "Challenge 9",
      title: "Rectangle area and perimeter",
      instruction: instructionBlock({
        goal: "Implement Rectangle(w, h) with area() and perimeter(); harness checks sample sizes."
      }),
      competences: ["class_sequence harness"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [],
      helperText: "Harness checks Rectangle(4,5) and Rectangle(3,3).",
      successText: "Correct."
    },
    {
      id: "16-10",
      moduleId: 16,
      badge: "Challenge 10",
      title: "Student grade average",
      instruction: instructionBlock({
        goal: "Implement Student(name, grades) with average(); harness checks Alice’s average."
      }),
      competences: ["class_sequence harness"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [],
      helperText: "Harness: Student('Alice', [80,90,100]).average()==90.0",
      successText: "Correct."
    },
    {
      id: "16-11",
      moduleId: 16,
      badge: "Challenge 11",
      title: "A general and two specific structures",
      instruction: instructionBlock({
        goal: "Animal with speak(); Cat says Meow, Dog says Woof — display both lines.",
        expectedOutput: "Meow\nWoof"
      }),
      competences: ["Inheritance"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Meow\nWoof",
      helperText: "print each speak result.",
      successText: "Correct."
    },
    {
      id: "16-12",
      moduleId: 16,
      badge: "Challenge 12",
      title: "Override without breaking the general one",
      instruction: instructionBlock({
        goal: "Override Dog.__str__ to Dog: {name}; print a Dog instance.",
        expectedOutput: "Dog: Rex"
      }),
      competences: ["__str__"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Dog: Rex",
      helperText: "print(Dog('Rex'))",
      successText: "Correct."
    },
    {
      id: "16-13",
      moduleId: 16,
      badge: "Challenge 13",
      title: "Reuse setup logic from the parent",
      instruction: instructionBlock({
        goal: "Vehicle(make) and Car(make, model) with super; display make then model for Corolla.",
        expectedOutput: "Toyota\nCorolla"
      }),
      competences: ["super"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "Toyota\nCorolla",
      helperText: "super().__init__(make)",
      successText: "Correct."
    },
    {
      id: "16-14",
      moduleId: 16,
      badge: "Challenge 14",
      title: "Information that cannot be touched directly",
      instruction: instructionBlock({
        goal: "Hide age behind get_age(); display get_age() for Person(25).",
        expectedOutput: "25"
      }),
      competences: ["Encapsulation"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "25",
      helperText: "Private attribute convention _age",
      successText: "Correct."
    },
    {
      id: "16-15",
      moduleId: 16,
      badge: "Challenge 15",
      title: "Count how many times it has been used",
      instruction: instructionBlock({
        goal: "Increment a class counter in __init__; create three dogs; display Dog.count.",
        expectedOutput: "3"
      }),
      competences: ["class variable"],
      kind: "output",
      initialCode: "#Write your code here:\n",
      expected: "3",
      helperText: "Increment in __init__",
      successText: "Correct."
    },
    {
      id: "16-16",
      moduleId: 16,
      badge: "Challenge 16",
      title: "Respond to a size question",
      instruction: instructionBlock({
        goal: "Implement __len__ on Playlist; harness checks len(Playlist(...))."
      }),
      competences: ["__len__"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [],
      helperText: "Harness tests len(Playlist([...])).",
      successText: "Correct."
    },
    {
      id: "16-17",
      moduleId: 16,
      badge: "Challenge 17",
      title: "Respond to an equality comparison",
      instruction: instructionBlock({
        goal: "Implement __eq__ on Point; harness compares instances."
      }),
      competences: ["__eq__"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [],
      helperText: "Harness compares Point instances.",
      successText: "Correct."
    },
    {
      id: "16-18",
      moduleId: 16,
      badge: "Challenge 18",
      title: "A stack structure",
      instruction: instructionBlock({
        goal: "Implement Stack with push, pop, and peek; harness runs a short sequence."
      }),
      competences: ["Data structures"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [],
      helperText: "Harness uses push/peek/pop sequence.",
      successText: "Correct."
    },
    {
      id: "16-19",
      moduleId: 16,
      badge: "Challenge 19",
      title: "A queue structure",
      instruction: instructionBlock({
        goal: "Implement Queue with enqueue and dequeue; harness checks order."
      }),
      competences: ["Queue"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [],
      helperText: "Harness enqueues a,b then dequeues.",
      successText: "Correct."
    },
    {
      id: "16-20",
      moduleId: 16,
      badge: "Challenge 20",
      title: "A library of books",
      instruction: instructionBlock({
        goal: "Library stores books; add, remove by title, search by author — harness drives the flow."
      }),
      competences: ["Composition"],
      kind: "functions",
      initialCode: "#Write your code here:\n",
      functionTests: [],
      helperText: "Harness expects Book(title, author) and Library API.",
      successText: "Correct."
    }
  ]
};
