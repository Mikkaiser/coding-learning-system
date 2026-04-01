export type ChallengeId = 1 | 2;

export type ChallengeTestCase = {
  name: string;
  passed: boolean;
  expected?: string;
  got?: string;
};

export type JudgeResult = {
  stdout: string;
  stderr: string;
  status: { id: number; description?: string };
  correct: boolean;
  tests?: ChallengeTestCase[];
};

