import { daysBetween, toDateKey } from './dates';

/** Días completos de sobriedad desde la última vez registrada hasta hoy. */
export function getStreakDays(lastUseDate: string, today: Date = new Date()): number {
  return Math.max(0, daysBetween(lastUseDate, toDateKey(today)));
}
