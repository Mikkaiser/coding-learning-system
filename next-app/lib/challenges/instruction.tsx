import type { ReactNode } from "react";

const codeBox =
  "rounded-md border border-border bg-bg px-2 py-1.5 font-mono text-sm text-fg";
const codeInline =
  "rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg";

/** Inline snippet for use inside a goal sentence (e.g. `\n`, escape sequences). */
export function inlineCode(text: string): ReactNode {
  return <code className={codeInline}>{text}</code>;
}

/**
 * Beginner-friendly instruction: one short goal sentence, then expected stdout
 * as stacked <code> blocks (one per line). Omits code blocks for sentinel `expected` values.
 */
export function instructionBlock(opts: {
  goal: ReactNode;
  expectedOutput?: string;
}): ReactNode {
  const { goal, expectedOutput } = opts;
  const show =
    expectedOutput != null &&
    expectedOutput !== "" &&
    !expectedOutput.startsWith("__");

  const lines = show ? expectedOutput.split("\n") : [];

  return (
    <div className="space-y-3">
      <div className="text-base leading-relaxed text-muted [&_code]:text-fg">{goal}</div>
      {lines.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          {lines.map((line, i) => (
            <code key={i} className={`block w-fit max-w-full break-all ${codeBox}`}>
              {line.length === 0 ? (
                <span className="italic text-muted">(blank line)</span>
              ) : (
                line
              )}
            </code>
          ))}
        </div>
      ) : null}
    </div>
  );
}
