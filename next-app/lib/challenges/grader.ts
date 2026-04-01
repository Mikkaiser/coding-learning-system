import type { ChallengeId } from "./types";

export function buildProgramForChallenge(
  challengeId: ChallengeId,
  userCode: string
) {
  switch (challengeId) {
    case 2:
      return buildChallenge2Harness(userCode);
    case 1:
    default:
      return userCode;
  }
}

export function isCorrectForChallenge(challengeId: ChallengeId, stdout: string) {
  switch (challengeId) {
    case 2:
      // For Challenge #2 we prefer structured parsing (done in API).
      // This fallback supports older output formats.
      return stdout.includes("\"allPassed\": true") || stdout.includes("ALL_TESTS_PASSED");
    case 1:
    default:
      return stdout.trim() === "Hello, World!";
  }
}

function buildChallenge2Harness(userCode: string) {
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

    # 5 test cases for sum
    _assert_eq("sum #1", sum_fn(1, 2), 3)
    _assert_eq("sum #2", sum_fn(0, 0), 0)
    _assert_eq("sum #3", sum_fn(-1, 5), 4)
    _assert_eq("sum #4", sum_fn(-10, -7), -17)
    _assert_eq("sum #5", sum_fn(123, 456), 579)

    # 5 test cases for subtract
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

