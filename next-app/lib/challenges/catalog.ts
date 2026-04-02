import { buildProgram, isCorrect } from "./grader";
import { ALL_MODULES } from "./modules";
import type {
  ChallengeDefinition,
  ChallengeId,
  ModuleDefinition,
  ModuleId
} from "./types";

/** First line of every challenge editor (real buffer text, not a UI placeholder). */
export const DEFAULT_CODE_STARTER = "#Write your code here:\n";

export const MODULES: readonly ModuleDefinition[] = ALL_MODULES;

export const CHALLENGES: readonly ChallengeDefinition[] = MODULES.flatMap(
  (m) => m.challenges
);

export function getModule(id: ModuleId): ModuleDefinition | undefined {
  return MODULES.find((m) => m.id === id);
}

export function getChallenge(id: ChallengeId): ChallengeDefinition | undefined {
  return CHALLENGES.find((c) => c.id === id);
}

export function getChallengesForModule(moduleId: ModuleId): ChallengeDefinition[] {
  return getModule(moduleId)?.challenges ?? [];
}

export function buildProgramForChallenge(id: ChallengeId, code: string): string {
  const c = getChallenge(id);
  if (!c) return code;
  return buildProgram(c, code);
}

export function isCorrectForChallenge(id: ChallengeId, stdout: string): boolean {
  const c = getChallenge(id);
  if (!c) return false;
  return isCorrect(c, stdout);
}
