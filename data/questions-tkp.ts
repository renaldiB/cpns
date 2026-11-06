import { RawQuestionDef } from "../scripts/seed-builder-helpers";
import { TKP_PART1_QUESTIONS } from "./questions-tkp-part1";
import { TKP_PART2_QUESTIONS } from "./questions-tkp-part2";

export const TKP_QUESTIONS: RawQuestionDef[] = [
  ...TKP_PART1_QUESTIONS,
  ...TKP_PART2_QUESTIONS,
];
