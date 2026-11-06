import { db } from "@/db";
import { attempts, attemptQuestions } from "@/db/schema";
import { eq, desc, sql, and } from "drizzle-orm";
import { FrozenQuestionSnapshot } from "../exam/snapshot";
import { CategoryId, SUBTOPICS } from "@/config/subtopics";
import { EXAM_CONFIG } from "@/config/exam";

export interface SubtopicPerformance {
  subtopicId: string;
  subtopicName: string;
  category: CategoryId;
  totalAnswered: number;
  correctCount: number;
  accuracy: number; // percentage (0..100)
  averagePoints: number; // for TKP
  hasEnoughData: boolean;
  scorePercentage: number;
}

export interface ScoreTrendPoint {
  attemptId: string;
  date: string;
  formattedDate: string;
  mode: string;
  scoreTwk: number;
  scoreTiu: number;
  scoreTkp: number;
  scoreTotal: number;
  isPassed: boolean | null;
}

export function getSubtopicAnalytics(modeFilter?: "full" | "practice"): SubtopicPerformance[] {
  let query = db
    .select({
      attemptMode: attempts.mode,
      snapshotJson: attemptQuestions.questionSnapshotJson,
      selectedOptionSnapshotId: attemptQuestions.selectedOptionSnapshotId,
      pointsAwarded: attemptQuestions.pointsAwarded,
    })
    .from(attemptQuestions)
    .innerJoin(attempts, eq(attemptQuestions.attemptId, attempts.id))
    .where(eq(attempts.status, "finished"));

  const records = query.all();

  const statsMap = new Map<
    string,
    {
      total: number;
      correct: number;
      totalPoints: number;
      category: CategoryId;
    }
  >();

  for (const r of records) {
    if (modeFilter && r.attemptMode !== modeFilter) continue;
    if (!r.selectedOptionSnapshotId) continue; // Skip unanswered

    const snapshot: FrozenQuestionSnapshot = JSON.parse(r.snapshotJson);
    const subtopic = snapshot.subtopic;
    const cat = snapshot.category;

    const current = statsMap.get(subtopic) || {
      total: 0,
      correct: 0,
      totalPoints: 0,
      category: cat,
    };

    current.total++;
    const pts = r.pointsAwarded ?? 0;
    current.totalPoints += pts;
    if (cat === "TWK" || cat === "TIU") {
      if (pts === 5) current.correct++;
    }

    statsMap.set(subtopic, current);
  }

  const result: SubtopicPerformance[] = [];

  for (const sub of SUBTOPICS) {
    const stat = statsMap.get(sub.id) || {
      total: 0,
      correct: 0,
      totalPoints: 0,
      category: sub.category,
    };

    const hasEnoughData = stat.total >= EXAM_CONFIG.minSampleSizeForAnalysis;
    let accuracy = 0;
    let averagePoints = 0;
    let scorePercentage = 0;

    if (stat.total > 0) {
      if (sub.category === "TWK" || sub.category === "TIU") {
        accuracy = Math.round((stat.correct / stat.total) * 100);
        scorePercentage = accuracy;
      } else {
        averagePoints = Number((stat.totalPoints / stat.total).toFixed(2));
        scorePercentage = Math.round((averagePoints / 5) * 100);
        accuracy = scorePercentage;
      }
    }

    result.push({
      subtopicId: sub.id,
      subtopicName: sub.name,
      category: sub.category,
      totalAnswered: stat.total,
      correctCount: stat.correct,
      accuracy,
      averagePoints,
      hasEnoughData,
      scorePercentage,
    });
  }

  // Sort by weakest first among those with enough data
  return result.sort((a, b) => {
    if (a.hasEnoughData && !b.hasEnoughData) return -1;
    if (!a.hasEnoughData && b.hasEnoughData) return 1;
    return a.scorePercentage - b.scorePercentage;
  });
}

export function getScoreTrend(limit = 20): ScoreTrendPoint[] {
  const completedAttempts = db
    .select()
    .from(attempts)
    .where(eq(attempts.status, "finished"))
    .orderBy(desc(attempts.startedAt))
    .limit(limit)
    .all();

  // Return chronologically for chart
  return completedAttempts.reverse().map((att) => {
    const d = new Date(att.startedAt);
    const formattedDate = `${d.getDate()}/${d.getMonth() + 1} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    return {
      attemptId: att.id,
      date: att.startedAt,
      formattedDate,
      mode: att.mode,
      scoreTwk: att.scoreTwk || 0,
      scoreTiu: att.scoreTiu || 0,
      scoreTkp: att.scoreTkp || 0,
      scoreTotal: att.scoreTotal || 0,
      isPassed: att.isPassed,
    };
  });
}
