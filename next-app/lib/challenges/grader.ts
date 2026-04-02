import type { ChallengeDefinition, FunctionTestSpec } from "./types";

export function buildProgram(challenge: ChallengeDefinition, userCode: string): string {
  if (challenge.kind === "mcq") return userCode;
  if (challenge.kind === "functions") {
    const custom = CUSTOM_FUNCTION_HARNESS[challenge.id];
    if (custom) return custom(userCode);
    if (challenge.functionTests?.length) {
      return buildGenericFunctionHarness(userCode, challenge.functionTests);
    }
    return userCode;
  }
  return userCode;
}

export function isCorrect(challenge: ChallengeDefinition, stdout: string): boolean {
  const trimmed = stdout.trim();
  const expected = challenge.expected ?? "";

  if (challenge.kind === "mcq") return false;

  if (expected === "__any_nonempty__") return trimmed.length > 0;

  if (expected.startsWith("__any_lines:")) {
    const raw = expected.replace("__any_lines:", "").replace(/__$/, "").trim();
    const n = parseInt(raw, 10);
    if (Number.isNaN(n)) return false;
    const lines = trimmed.split("\n").filter((l) => l.trim().length > 0);
    return lines.length === n;
  }

  if (expected.startsWith("__contains:")) {
    const substring = expected.replace("__contains:", "").replace(/__$/, "");
    return trimmed.includes(substring);
  }

  if (challenge.kind === "output" || challenge.kind === "fix") {
    return trimmed === expected.trim();
  }

  if (challenge.kind === "functions") {
    return trimmed.includes('"allPassed": true');
  }

  return false;
}

/** Legacy Challenge #2 → "14-2": add + subtract harness (unchanged logic). */
export function buildLegacy142Harness(userCode: string): string {
  return `${userCode}

import sys
import traceback
import json

results = []

def _record(name: str, passed: bool, expected=None, got=None):
    item = { "name": name, "passed": bool(passed) }
    if expected is not None:
        item["expected"] = repr(expected)
    if got is not None:
        item["got"] = repr(got)
    results.append(item)

def _assert_eq(label: str, got, expected):
    ok = got == expected
    _record(label, ok, expected=expected, got=got)
    return ok

try:
    sum_fn = globals().get("sum")
    sub_fn = globals().get("subtract")
    if not callable(sum_fn):
        _record("sum exists", False, expected="callable sum(a, b)", got=sum_fn)
        raise RuntimeError("Function sum(a, b) is missing or not callable.")
    if not callable(sub_fn):
        _record("subtract exists", False, expected="callable subtract(a, b)", got=sub_fn)
        raise RuntimeError("Function subtract(a, b) is missing or not callable.")

    _assert_eq("sum #1", sum_fn(1, 2), 3)
    _assert_eq("sum #2", sum_fn(0, 0), 0)
    _assert_eq("sum #3", sum_fn(-1, 5), 4)
    _assert_eq("sum #4", sum_fn(-10, -7), -17)
    _assert_eq("sum #5", sum_fn(123, 456), 579)

    _assert_eq("subtract #1", sub_fn(5, 2), 3)
    _assert_eq("subtract #2", sub_fn(0, 0), 0)
    _assert_eq("subtract #3", sub_fn(-1, 5), -6)
    _assert_eq("subtract #4", sub_fn(-10, -7), -3)
    _assert_eq("subtract #5", sub_fn(123, 456), -333)

    all_passed = all(r.get("passed") for r in results)
    print(json.dumps({ "allPassed": all_passed, "tests": results }))
except Exception:
    traceback.print_exc()
    sys.exit(0)
`;
}

function buildGenericFunctionHarness(
  userCode: string,
  specs: FunctionTestSpec[]
): string {
  const b64 = Buffer.from(JSON.stringify(specs), "utf8").toString("base64");
  return `${userCode}

import base64
import json
import traceback
import sys

results = []

def _record(name, passed, expected=None, got=None):
    item = {"name": name, "passed": bool(passed)}
    if expected is not None:
        item["expected"] = repr(expected)
    if got is not None:
        item["got"] = repr(got)
    results.append(item)

SPECS = json.loads(base64.b64decode("${b64}").decode("utf-8"))

try:
    for spec in SPECS:
        fname = spec["functionName"]
        fn = globals().get(fname)
        if not callable(fn):
            _record(fname + " exists", False, expected="callable", got=fn)
            raise RuntimeError("Missing function: " + fname)
        for i, case in enumerate(spec["cases"]):
            label = fname + " #" + str(i + 1)
            exp = case["expected"]
            if "kwargs" in case and case["kwargs"] is not None:
                got = fn(**case["kwargs"])
            else:
                args = case.get("args") or []
                got = fn(*args)
            ok = got == exp
            _record(label, ok, expected=exp, got=got)
    all_passed = all(r["passed"] for r in results)
    print(json.dumps({"allPassed": all_passed, "tests": results}))
except Exception:
    traceback.print_exc()
    sys.exit(0)
`;
}

function buildApplyToAllHarness(userCode: string): string {
  return `${userCode}

import json
import traceback
import sys

results = []

def _record(name, passed, expected=None, got=None):
    item = {"name": name, "passed": bool(passed)}
    if expected is not None:
        item["expected"] = repr(expected)
    if got is not None:
        item["got"] = repr(got)
    results.append(item)

try:
    fn = globals().get("apply_to_all")
    if not callable(fn):
        _record("apply_to_all exists", False, expected="callable", got=fn)
        raise RuntimeError("apply_to_all missing")

    def double(x):
        return x * 2

    got = fn(double, [1, 2, 3])
    _record("apply_to_all double", got == [2, 4, 6], expected=[2, 4, 6], got=got)

    all_passed = all(r["passed"] for r in results)
    print(json.dumps({"allPassed": all_passed, "tests": results}))
except Exception:
    traceback.print_exc()
    sys.exit(0)
`;
}

function buildRetryHarness(userCode: string): string {
  return `${userCode}

import json
import traceback
import sys

results = []

def _record(name, passed, expected=None, got=None):
    item = {"name": name, "passed": bool(passed)}
    if expected is not None:
        item["expected"] = repr(expected)
    if got is not None:
        item["got"] = repr(got)
    results.append(item)

try:
    retry_fn = globals().get("retry")
    if not callable(retry_fn):
        _record("retry exists", False, expected="callable", got=retry_fn)
        raise RuntimeError("retry missing")

    state = {"n": 0}

    def flaky():
        state["n"] += 1
        if state["n"] < 3:
            raise ValueError("fail")
        return 42

    got1 = retry_fn(flaky, 3)
    _record("retry succeeds third", got1 == 42, expected=42, got=got1)

    def always_fail():
        raise RuntimeError("x")

    got2 = retry_fn(always_fail, 3)
    _record("retry gives up", got2 is None, expected=None, got=got2)

    all_passed = all(r["passed"] for r in results)
    print(json.dumps({"allPassed": all_passed, "tests": results}))
except Exception:
    traceback.print_exc()
    sys.exit(0)
`;
}

function buildBankAccountHarness(userCode: string): string {
  return `${userCode}

import json
import traceback
import sys

results = []

def _record(name, passed, expected=None, got=None):
    item = {"name": name, "passed": bool(passed)}
    if expected is not None:
        item["expected"] = repr(expected)
    if got is not None:
        item["got"] = repr(got)
    results.append(item)

try:
    acc = BankAccount(100)
    acc.deposit(50)
    acc.withdraw(30)
    _record("balance", acc.balance == 120, expected=120, got=acc.balance)
    all_passed = all(r["passed"] for r in results)
    print(json.dumps({"allPassed": all_passed, "tests": results}))
except Exception:
    traceback.print_exc()
    sys.exit(0)
`;
}

function buildRectangleHarness(userCode: string): string {
  return `${userCode}

import json
import traceback
import sys

results = []

def _record(name, passed, expected=None, got=None):
    item = {"name": name, "passed": bool(passed)}
    if expected is not None:
        item["expected"] = repr(expected)
    if got is not None:
        item["got"] = repr(got)
    results.append(item)

try:
    r1 = Rectangle(4, 5)
    _record("area 4x5", r1.area() == 20, expected=20, got=r1.area())
    _record("perim 4x5", r1.perimeter() == 18, expected=18, got=r1.perimeter())
    r2 = Rectangle(3, 3)
    _record("area 3x3", r2.area() == 9, expected=9, got=r2.area())
    all_passed = all(r["passed"] for r in results)
    print(json.dumps({"allPassed": all_passed, "tests": results}))
except Exception:
    traceback.print_exc()
    sys.exit(0)
`;
}

function buildStudentAverageHarness(userCode: string): string {
  return `${userCode}

import json
import traceback
import sys

results = []

def _record(name, passed, expected=None, got=None):
    item = {"name": name, "passed": bool(passed)}
    if expected is not None:
        item["expected"] = repr(expected)
    if got is not None:
        item["got"] = repr(got)
    results.append(item)

try:
    s = Student("Alice", [80, 90, 100])
    _record("average", s.average() == 90.0, expected=90.0, got=s.average())
    all_passed = all(r["passed"] for r in results)
    print(json.dumps({"allPassed": all_passed, "tests": results}))
except Exception:
    traceback.print_exc()
    sys.exit(0)
`;
}

function buildPlaylistLenHarness(userCode: string): string {
  return `${userCode}

import json
import traceback
import sys

results = []

def _record(name, passed, expected=None, got=None):
    item = {"name": name, "passed": bool(passed)}
    if expected is not None:
        item["expected"] = repr(expected)
    if got is not None:
        item["got"] = repr(got)
    results.append(item)

try:
    p1 = Playlist(["a", "b", "c"])
    _record("len3", len(p1) == 3, expected=3, got=len(p1))
    p2 = Playlist([])
    _record("len0", len(p2) == 0, expected=0, got=len(p2))
    all_passed = all(r["passed"] for r in results)
    print(json.dumps({"allPassed": all_passed, "tests": results}))
except Exception:
    traceback.print_exc()
    sys.exit(0)
`;
}

function buildPointEqHarness(userCode: string): string {
  return `${userCode}

import json
import traceback
import sys

results = []

def _record(name, passed, expected=None, got=None):
    item = {"name": name, "passed": bool(passed)}
    if expected is not None:
        item["expected"] = repr(expected)
    if got is not None:
        item["got"] = repr(got)
    results.append(item)

try:
    _record("eq", Point(1, 2) == Point(1, 2), expected=True, got=(Point(1, 2) == Point(1, 2)))
    _record("neq", Point(1, 2) == Point(1, 3), expected=False, got=(Point(1, 2) == Point(1, 3)))
    all_passed = all(r["passed"] for r in results)
    print(json.dumps({"allPassed": all_passed, "tests": results}))
except Exception:
    traceback.print_exc()
    sys.exit(0)
`;
}

function buildStackHarness(userCode: string): string {
  return `${userCode}

import json
import traceback
import sys

results = []

def _record(name, passed, expected=None, got=None):
    item = {"name": name, "passed": bool(passed)}
    if expected is not None:
        item["expected"] = repr(expected)
    if got is not None:
        item["got"] = repr(got)
    results.append(item)

try:
    s = Stack()
    s.push(1)
    s.push(2)
    _record("peek", s.peek() == 2, expected=2, got=s.peek())
    _record("pop2", s.pop() == 2, expected=2, got=s.pop())
    _record("peek1", s.peek() == 1, expected=1, got=s.peek())
    all_passed = all(r["passed"] for r in results)
    print(json.dumps({"allPassed": all_passed, "tests": results}))
except Exception:
    traceback.print_exc()
    sys.exit(0)
`;
}

function buildQueueHarness(userCode: string): string {
  return `${userCode}

import json
import traceback
import sys

results = []

def _record(name, passed, expected=None, got=None):
    item = {"name": name, "passed": bool(passed)}
    if expected is not None:
        item["expected"] = repr(expected)
    if got is not None:
        item["got"] = repr(got)
    results.append(item)

try:
    q = Queue()
    q.enqueue("a")
    q.enqueue("b")
    x = q.dequeue()
    _record("deq a", x == "a", expected="a", got=x)
    y = q.dequeue()
    _record("deq b", y == "b", expected="b", got=y)
    all_passed = all(r["passed"] for r in results)
    print(json.dumps({"allPassed": all_passed, "tests": results}))
except Exception:
    traceback.print_exc()
    sys.exit(0)
`;
}

function buildLibraryHarness(userCode: string): string {
  return `${userCode}

import json
import traceback
import sys

results = []

def _record(name, passed, expected=None, got=None):
    item = {"name": name, "passed": bool(passed)}
    if expected is not None:
        item["expected"] = repr(expected)
    if got is not None:
        item["got"] = repr(got)
    results.append(item)

try:
    lib = Library()
    lib.add_book(Book("1984", "Orwell"))
    found = lib.search_by_author("Orwell")
    _record("find", found is not None and found.title == "1984", expected="found", got=found)
    lib.remove_by_title("1984")
    gone = lib.search_by_author("Orwell")
    _record("gone", gone is None, expected=None, got=gone)
    all_passed = all(r["passed"] for r in results)
    print(json.dumps({"allPassed": all_passed, "tests": results}))
except Exception:
    traceback.print_exc()
    sys.exit(0)
`;
}

const CUSTOM_FUNCTION_HARNESS: Record<string, (code: string) => string> = {
  "14-2": buildLegacy142Harness,
  "14-17": buildApplyToAllHarness,
  "17-11": buildRetryHarness,
  "16-5": buildBankAccountHarness,
  "16-9": buildRectangleHarness,
  "16-10": buildStudentAverageHarness,
  "16-16": buildPlaylistLenHarness,
  "16-17": buildPointEqHarness,
  "16-18": buildStackHarness,
  "16-19": buildQueueHarness,
  "16-20": buildLibraryHarness
};
