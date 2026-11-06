import { describe, it, expect, beforeAll } from "vitest";
import { runMigrations } from "@/db/migrate";
import { seedDatabase } from "@/db/seed";
import {
  startNewAttempt,
  autosaveAnswer,
  toggleFlag,
  finalizeAttempt,
  getAttemptDetail,
} from "@/lib/exam/lifecycle";
import { db } from "@/db";
import { attempts } from "@/db/schema";
import { eq } from "drizzle-orm";

describe("Exam Lifecycle Integration Tests", () => {
  beforeAll(() => {
    runMigrations();
    seedDatabase();
  });

  it("creates a full simulation attempt with exactly 110 questions (30 TWK, 35 TIU, 45 TKP)", () => {
    const { attemptId, questionCount } = startNewAttempt({ mode: "full" });
    expect(questionCount).toBe(110);

    const detail = getAttemptDetail(attemptId);
    expect(detail).not.toBeNull();
    expect(detail!.questions.length).toBe(110);
    expect(detail!.attempt.status).toBe("in_progress");

    // Check categories count
    const twkCount = detail!.questions.filter((q) => q.category === "TWK").length;
    const tiuCount = detail!.questions.filter((q) => q.category === "TIU").length;
    const tkpCount = detail!.questions.filter((q) => q.category === "TKP").length;

    expect(twkCount).toBe(30);
    expect(tiuCount).toBe(35);
    expect(tkpCount).toBe(45);

    // Verify sanitized payload: options MUST NOT have points or isCorrect
    for (const q of detail!.questions) {
      for (const opt of q.options) {
        expect((opt as any).points).toBeUndefined();
        expect((opt as any).isCorrect).toBeUndefined();
      }
    }
  });

  it("handles autosave, flag, and version concurrency safely", () => {
    const { attemptId } = startNewAttempt({ mode: "full" });
    const detail = getAttemptDetail(attemptId)!;
    const q1 = detail.questions[0];
    const optToSelect = q1.options[0].snapshotOptionId;

    // 1. Save answer
    const saveRes = autosaveAnswer(attemptId, 1, optToSelect, 1);
    expect(saveRes.status).toBe("saved");
    expect(saveRes.selectedOptionSnapshotId).toBe(optToSelect);

    // 2. Reject stale version
    const staleRes = autosaveAnswer(attemptId, 1, q1.options[1].snapshotOptionId, 1);
    expect(staleRes.status).toBe("rejected_stale");

    // 3. Toggle flag
    const flagRes = toggleFlag(attemptId, 1, true);
    expect(flagRes.flagged).toBe(true);

    const updatedDetail = getAttemptDetail(attemptId)!;
    expect(updatedDetail.questions[0].selectedOptionSnapshotId).toBe(optToSelect);
    expect(updatedDetail.questions[0].flagged).toBe(true);
  });

  it("finalizes attempt and computes server score accurately", () => {
    const { attemptId } = startNewAttempt({ mode: "full" });
    const detail = getAttemptDetail(attemptId)!;

    // Answer first 5 questions
    for (let i = 1; i <= 5; i++) {
      const q = detail.questions[i - 1];
      autosaveAnswer(attemptId, i, q.options[0].snapshotOptionId, 1);
    }

    // Finalize
    const finRes = finalizeAttempt(attemptId, "finished");
    expect(finRes.status).toBe("finished");
    expect(finRes.scoreResult).toBeDefined();

    // Check finished detail
    const finDetail = getAttemptDetail(attemptId)!;
    expect(finDetail.isCompleted).toBe(true);
    expect(finDetail.attempt.status).toBe("finished");
    expect(finDetail.attempt.scoreTotal).toBeDefined();

    // Review questions now have explanations and points
    expect((finDetail.questions[0] as any).explanation).toBeDefined();
    expect((finDetail.questions[0].options[0] as any).points).toBeDefined();

    // Cannot answer anymore
    const postSave = autosaveAnswer(attemptId, 1, "test", 10);
    expect(postSave.status).toBe("finished");
  });

  it("creates category practice attempt with requested parameters", () => {
    const { attemptId, questionCount } = startNewAttempt({
      mode: "practice",
      categoryFilter: "TIU",
      subtopicsFilter: ["verbal-sinonim", "verbal-antonim"],
      questionCount: 10,
      enableTimer: false,
    });

    expect(questionCount).toBe(10);
    const detail = getAttemptDetail(attemptId)!;
    expect(detail.attempt.mode).toBe("practice");
    expect(detail.attempt.deadlineAt).toBeNull();
    expect(detail.questions.length).toBe(10);
    expect(detail.questions.every((q) => q.category === "TIU")).toBe(true);
  });
});
