import { addDays, toDateKey } from './dates';
import type { DailyLog } from '../db/types';

/**
 * Días consecutivos (hasta hoy hacia atrás) en que un hábito aparece marcado
 * como cumplido en el registro diario. Si todavía no hay registro de hoy no
 * corta la racha (no penaliza por no haber registrado todavía en el día) —
 * pero si hoy sí tiene registro y el hábito no está marcado, ahí sí corta.
 */
export function getHabitStreak(habitId: number, logs: DailyLog[], today: Date = new Date()): number {
  const logsByDate = new Map(logs.map((log) => [log.date, log]));
  let cursor = today;

  if (!logsByDate.has(toDateKey(cursor))) {
    cursor = addDays(cursor, -1);
  }

  let streak = 0;
  while (true) {
    const log = logsByDate.get(toDateKey(cursor));
    if (!log || !log.habitIds.includes(habitId)) break;
    streak++;
    cursor = addDays(cursor, -1);
  }

  return streak;
}
