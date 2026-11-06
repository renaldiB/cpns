export interface TimerState {
  remainingSeconds: number;
  isExpired: boolean;
  formattedTime: string;
  isWarning: boolean; // < 10 mins (600s)
  isCritical: boolean; // < 5 mins (300s)
}

/**
 * Calculate remaining seconds from an ISO deadline string
 */
export function calculateRemainingSeconds(deadlineAt: string | null | undefined): number {
  if (!deadlineAt) return 0;
  const deadlineMs = new Date(deadlineAt).getTime();
  const nowMs = Date.now();
  const diffSec = Math.floor((deadlineMs - nowMs) / 1000);
  return Math.max(0, diffSec);
}

/**
 * Check if the deadline has expired
 */
export function isDeadlineExpired(deadlineAt: string | null | undefined): boolean {
  if (!deadlineAt) return false;
  return calculateRemainingSeconds(deadlineAt) <= 0;
}

/**
 * Format seconds into mm:ss or hh:mm:ss
 */
export function formatSeconds(totalSeconds: number): string {
  const safeSec = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSec / 3600);
  const minutes = Math.floor((safeSec % 3600) / 60);
  const seconds = safeSec % 60;

  if (hours > 0) {
    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  }

  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return `${mm}:${ss}`;
}

/**
 * Get comprehensive timer status
 */
export function getTimerState(deadlineAt: string | null | undefined): TimerState {
  const remainingSeconds = calculateRemainingSeconds(deadlineAt);
  const isExpired = remainingSeconds <= 0 && Boolean(deadlineAt);
  const formattedTime = formatSeconds(remainingSeconds);

  return {
    remainingSeconds,
    isExpired,
    formattedTime,
    isWarning: remainingSeconds <= 600 && remainingSeconds > 0,
    isCritical: remainingSeconds <= 300 && remainingSeconds > 0,
  };
}
