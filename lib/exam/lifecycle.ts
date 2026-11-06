import { db, sqliteDb } from "@/db";
import { attempts, attemptQuestions, questions, options, examProfiles } from "@/db/schema";
import { eq, and, sql, desc, inArray } from "drizzle-orm";
import { ExamProfile, BASELINE_EXAM_PROFILE } from "@/config/exam-profiles";
import { CategoryId } from "@/config/subtopics";
import {
  createQuestionSnapshot,
  FrozenQuestionSnapshot,
  sanitizeQuestionForClient,
  ClientSanitizedQuestion,
} from "./snapshot";
import { selectQuestionsForFullSimulation, selectQuestionsForPractice, CandidateQuestion } from "./selector";
import { calculateAttemptScore, AttemptScoreResult } from "../scoring";
import { isDeadlineExpired } from "./timer";

export interface StartAttemptOptions {
  mode: "full" | "practice";
  examProfileId?: string;
  categoryFilter?: CategoryId;
  subtopicsFilter?: string[];
  difficulty?: number;
  questionCount?: number;
  enableTimer?: boolean;
}

export function startNewAttempt(opts: StartAttemptOptions) {
  // 1. Fetch active profile
  const profileRow = db
    .select()
    .from(examProfiles)
    .where(eq(examProfiles.id, opts.examProfileId || BASELINE_EXAM_PROFILE.id))
    .get();

  const profile: ExamProfile = profileRow
    ? {
        ...JSON.parse(profileRow.rulesJson),
        id: profileRow.id,
        name: profileRow.name,
        year: profileRow.year,
        examType: profileRow.examType,
        description: profileRow.description,
        referenceStatus: profileRow.referenceStatus,
        durationSeconds: profileRow.durationSeconds,
      }
    : BASELINE_EXAM_PROFILE;

  // 2. Fetch all active questions with options
  const rawQuestions = db
    .select()
    .from(questions)
    .where(sql`${questions.deletedAt} IS NULL`)
    .all();

  const rawOptions = db.select().from(options).all();
  const optionsMap = new Map<string, typeof rawOptions>();
  for (const opt of rawOptions) {
    const list = optionsMap.get(opt.questionId) || [];
    list.push(opt);
    optionsMap.set(opt.questionId, list);
  }

  const candidatePool: CandidateQuestion[] = rawQuestions.map((q) => ({
    id: q.id,
    category: q.category as CategoryId,
    subtopic: q.subtopic,
    difficulty: q.difficulty,
    stem: q.stem,
    imagePath: q.imagePath,
    explanation: q.explanation,
    sourceNote: q.sourceNote,
    sourceReference: q.sourceReference,
    options: (optionsMap.get(q.id) || []).map((o) => ({
      id: o.id,
      label: o.label,
      text: o.text,
      points: o.points,
    })),
  }));

  // 3. Select questions based on mode
  let chosenQuestions: CandidateQuestion[] = [];
  const randomSeed = Math.random();

  if (opts.mode === "full") {
    // Gather question usage statistics from recent attempts
    const recentUsage = db
      .select({
        questionId: attemptQuestions.questionId,
        lastUsedAt: attempts.startedAt,
      })
      .from(attemptQuestions)
      .innerJoin(attempts, eq(attemptQuestions.attemptId, attempts.id))
      .all();

    const usageMap = new Map<string, { lastUsedAt: string; usageCount: number }>();
    for (const r of recentUsage) {
      if (!r.questionId) continue;
      const existing = usageMap.get(r.questionId);
      if (!existing) {
        usageMap.set(r.questionId, { lastUsedAt: r.lastUsedAt, usageCount: 1 });
      } else {
        existing.usageCount++;
        if (new Date(r.lastUsedAt) > new Date(existing.lastUsedAt)) {
          existing.lastUsedAt = r.lastUsedAt;
        }
      }
    }

    chosenQuestions = selectQuestionsForFullSimulation(candidatePool, usageMap, randomSeed);
  } else {
    // Practice mode
    if (!opts.categoryFilter) {
      throw new Error("Mode latihan wajib memilih kategori (TWK, TIU, atau TKP).");
    }
    chosenQuestions = selectQuestionsForPractice(
      candidatePool,
      {
        category: opts.categoryFilter,
        subtopics: opts.subtopicsFilter,
        difficulty: opts.difficulty,
        count: opts.questionCount || 10,
      },
      randomSeed
    );
  }

  // 4. Calculate timing
  const now = new Date();
  const startedAt = now.toISOString();
  let durationSec = opts.mode === "full" ? profile.durationSeconds : (opts.questionCount || 10) * 60;
  let deadlineAt: string | null = null;

  if (opts.mode === "full" || opts.enableTimer !== false) {
    const deadline = new Date(now.getTime() + durationSec * 1000);
    deadlineAt = deadline.toISOString();
  } else {
    durationSec = 0; // untimed practice
  }

  const attemptId = `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  // 5. Save in atomic transaction
  const insertTransaction = sqliteDb.transaction(() => {
    db.insert(attempts)
      .values({
        id: attemptId,
        mode: opts.mode,
        examProfileId: profile.id,
        examProfileSnapshotJson: JSON.stringify(profile),
        categoryFilter: opts.categoryFilter || null,
        subtopicFilterJson: opts.subtopicsFilter ? JSON.stringify(opts.subtopicsFilter) : null,
        startedAt,
        deadlineAt,
        durationSecSnapshot: durationSec,
        status: "in_progress",
        questionCountSnapshot: chosenQuestions.length,
        randomSeed: Math.floor(randomSeed * 1000000),
        createdAt: startedAt,
        updatedAt: startedAt,
      })
      .run();

    for (let i = 0; i < chosenQuestions.length; i++) {
      const q = chosenQuestions[i];
      const snapshot = createQuestionSnapshot(q, randomSeed + i);

      db.insert(attemptQuestions)
        .values({
          id: `aq_${attemptId}_${i + 1}`,
          attemptId,
          questionId: q.id,
          position: i + 1,
          questionSnapshotJson: JSON.stringify(snapshot),
          selectedOptionSnapshotId: null,
          flagged: false,
          pointsAwarded: null,
          version: 1,
          createdAt: startedAt,
          updatedAt: startedAt,
        })
        .run();
    }
  });

  insertTransaction();
  return { attemptId, questionCount: chosenQuestions.length };
}

/**
 * Autosave answer with version concurrency control
 */
export function autosaveAnswer(
  attemptId: string,
  position: number,
  selectedOptionSnapshotId: string | null,
  clientVersion?: number
) {
  const attempt = db.select().from(attempts).where(eq(attempts.id, attemptId)).get();
  if (!attempt) {
    throw new Error("Attempt tidak ditemukan.");
  }

  // Check if expired
  if (attempt.deadlineAt && isDeadlineExpired(attempt.deadlineAt)) {
    finalizeAttempt(attemptId, "expired");
    return { status: "expired", message: "Waktu ujian telah habis." };
  }

  if (attempt.status !== "in_progress") {
    return { status: attempt.status, message: "Ujian telah selesai." };
  }

  const aq = db
    .select()
    .from(attemptQuestions)
    .where(and(eq(attemptQuestions.attemptId, attemptId), eq(attemptQuestions.position, position)))
    .get();

  if (!aq) {
    throw new Error(`Soal nomor ${position} tidak ditemukan dalam attempt ini.`);
  }

  // Version check (guard against stale requests)
  if (clientVersion !== undefined && clientVersion < aq.version) {
    return {
      status: "rejected_stale",
      currentVersion: aq.version,
      selectedOptionSnapshotId: aq.selectedOptionSnapshotId,
    };
  }

  const snapshot: FrozenQuestionSnapshot = JSON.parse(aq.questionSnapshotJson);

  // Validate that option belongs to this question
  let pointsAwarded: number | null = null;
  if (selectedOptionSnapshotId) {
    const matchedOpt = snapshot.options.find((o) => o.snapshotOptionId === selectedOptionSnapshotId);
    if (!matchedOpt) {
      throw new Error("Pilihan jawaban tidak valid untuk soal ini.");
    }
    pointsAwarded = matchedOpt.points;
  }

  const nowIso = new Date().toISOString();
  const nextVersion = aq.version + 1;

  db.update(attemptQuestions)
    .set({
      selectedOptionSnapshotId,
      pointsAwarded,
      answeredAt: nowIso,
      version: nextVersion,
      updatedAt: nowIso,
    })
    .where(eq(attemptQuestions.id, aq.id))
    .run();

  return {
    status: "saved",
    version: nextVersion,
    position,
    selectedOptionSnapshotId,
  };
}

/**
 * Toggle flagged status for a question
 */
export function toggleFlag(attemptId: string, position: number, flagged: boolean) {
  const aq = db
    .select()
    .from(attemptQuestions)
    .where(and(eq(attemptQuestions.attemptId, attemptId), eq(attemptQuestions.position, position)))
    .get();

  if (!aq) throw new Error("Soal tidak ditemukan.");

  const nowIso = new Date().toISOString();
  db.update(attemptQuestions)
    .set({
      flagged,
      updatedAt: nowIso,
    })
    .where(eq(attemptQuestions.id, aq.id))
    .run();

  return { position, flagged };
}

/**
 * Finalize attempt (atomic & idempotent)
 */
export function finalizeAttempt(attemptId: string, forcedStatus: "finished" | "expired" = "finished") {
  const attempt = db.select().from(attempts).where(eq(attempts.id, attemptId)).get();
  if (!attempt) throw new Error("Attempt tidak ditemukan.");

  if (attempt.status === "finished" || attempt.status === "expired") {
    // Already finalized
    return { status: attempt.status, alreadyFinalized: true };
  }

  const profile: ExamProfile = JSON.parse(attempt.examProfileSnapshotJson);
  const aqList = db
    .select()
    .from(attemptQuestions)
    .where(eq(attemptQuestions.attemptId, attemptId))
    .orderBy(attemptQuestions.position)
    .all();

  // Evaluate points for all questions
  const scoringInput = aqList.map((aq) => {
    const snapshot: FrozenQuestionSnapshot = JSON.parse(aq.questionSnapshotJson);
    let pts: number | null = null;
    if (aq.selectedOptionSnapshotId) {
      const opt = snapshot.options.find((o) => o.snapshotOptionId === aq.selectedOptionSnapshotId);
      if (opt) pts = opt.points;
    }
    return {
      category: snapshot.category,
      pointsAwarded: pts,
    };
  });

  const scoreResult = calculateAttemptScore(profile, scoringInput);
  const nowIso = new Date().toISOString();

  // Update in transaction
  const finalizeTx = sqliteDb.transaction(() => {
    // 1. Update points_awarded on each attempt_question
    for (let i = 0; i < aqList.length; i++) {
      const aq = aqList[i];
      const pts = scoringInput[i].pointsAwarded || 0;
      db.update(attemptQuestions)
        .set({
          pointsAwarded: pts,
          updatedAt: nowIso,
        })
        .where(eq(attemptQuestions.id, aq.id))
        .run();
    }

    // 2. Update attempts row
    db.update(attempts)
      .set({
        status: forcedStatus,
        finishedAt: nowIso,
        scoreTwk: scoreResult.scoreTwk,
        scoreTiu: scoreResult.scoreTiu,
        scoreTkp: scoreResult.scoreTkp,
        scoreTotal: scoreResult.scoreTotal,
        isPassed: attempt.mode === "full" ? scoreResult.isPassed : null,
        summaryJson: JSON.stringify(scoreResult),
        updatedAt: nowIso,
      })
      .where(eq(attempts.id, attemptId))
      .run();
  });

  finalizeTx();
  return { status: forcedStatus, scoreResult };
}

/**
 * Fetch attempt details (sanitized during in_progress, full during review)
 */
export function getAttemptDetail(attemptId: string) {
  const attempt = db.select().from(attempts).where(eq(attempts.id, attemptId)).get();
  if (!attempt) return null;

  // Auto-finalize if deadline passed
  if (attempt.status === "in_progress" && attempt.deadlineAt && isDeadlineExpired(attempt.deadlineAt)) {
    finalizeAttempt(attemptId, "expired");
    return getAttemptDetail(attemptId);
  }

  const aqList = db
    .select()
    .from(attemptQuestions)
    .where(eq(attemptQuestions.attemptId, attemptId))
    .orderBy(attemptQuestions.position)
    .all();

  const isCompleted = attempt.status === "finished" || attempt.status === "expired";

  if (!isCompleted) {
    // Sanitized client questions (NO answers, points, or explanations)
    const sanitizedQuestions: ClientSanitizedQuestion[] = aqList.map((aq) => {
      const snapshot: FrozenQuestionSnapshot = JSON.parse(aq.questionSnapshotJson);
      return sanitizeQuestionForClient(
        snapshot,
        aq.position,
        aq.selectedOptionSnapshotId,
        Boolean(aq.flagged)
      );
    });

    return {
      attempt: {
        id: attempt.id,
        mode: attempt.mode,
        examProfileId: attempt.examProfileId,
        startedAt: attempt.startedAt,
        deadlineAt: attempt.deadlineAt,
        status: attempt.status,
        questionCount: attempt.questionCountSnapshot,
      },
      questions: sanitizedQuestions,
      isCompleted: false,
    };
  }

  // Completed exam: full review with snapshot explanations, answers, and points
  const reviewQuestions = aqList.map((aq) => {
    const snapshot: FrozenQuestionSnapshot = JSON.parse(aq.questionSnapshotJson);
    return {
      position: aq.position,
      category: snapshot.category,
      subtopic: snapshot.subtopic,
      stem: snapshot.stem,
      imagePath: snapshot.imagePath,
      explanation: snapshot.explanation,
      difficulty: snapshot.difficulty,
      sourceNote: snapshot.sourceNote,
      sourceReference: snapshot.sourceReference,
      options: snapshot.options, // includes visualLabel, text, points, isCorrect
      selectedOptionSnapshotId: aq.selectedOptionSnapshotId,
      flagged: Boolean(aq.flagged),
      pointsAwarded: aq.pointsAwarded ?? 0,
    };
  });

  return {
    attempt: {
      id: attempt.id,
      mode: attempt.mode,
      examProfileId: attempt.examProfileId,
      startedAt: attempt.startedAt,
      deadlineAt: attempt.deadlineAt,
      finishedAt: attempt.finishedAt,
      status: attempt.status,
      questionCount: attempt.questionCountSnapshot,
      scoreTwk: attempt.scoreTwk,
      scoreTiu: attempt.scoreTiu,
      scoreTkp: attempt.scoreTkp,
      scoreTotal: attempt.scoreTotal,
      isPassed: attempt.isPassed,
      summary: attempt.summaryJson ? JSON.parse(attempt.summaryJson) : null,
      examProfile: JSON.parse(attempt.examProfileSnapshotJson),
    },
    questions: reviewQuestions,
    isCompleted: true,
  };
}
