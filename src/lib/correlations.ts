import type { DailyLog } from '../db/types';

const average = (nums: number[]) => nums.reduce((a, b) => a + b, 0) / nums.length;

/**
 * Compara el craving promedio entre días que cumplen una condición y días
 * que no. Devuelve null si no hay al menos 2 registros de cada lado —
 * comparar contra un solo día no dice nada confiable.
 */
export function compareCravingByCondition(logs: DailyLog[], predicate: (log: DailyLog) => boolean) {
  const withLogs = logs.filter(predicate);
  const withoutLogs = logs.filter((log) => !predicate(log));
  if (withLogs.length < 2 || withoutLogs.length < 2) return null;

  return {
    withAvg: average(withLogs.map((log) => log.craving)),
    withoutAvg: average(withoutLogs.map((log) => log.craving)),
  };
}

export interface Insight {
  text: string;
}

interface Habit {
  id: number;
  name: string;
}

/** Observaciones simples en lenguaje llano — descriptivas, nunca un diagnóstico. */
export function getInsights(logs: DailyLog[], habits: Habit[]): Insight[] {
  const insights: Insight[] = [];

  const exercise = compareCravingByCondition(logs, (log) => (log.activityMinutes ?? 0) > 0);
  if (exercise) {
    insights.push({
      text: `Los días que hiciste actividad física, tu craving promedio fue ${exercise.withAvg.toFixed(1)} (vs ${exercise.withoutAvg.toFixed(1)} los días que no).`,
    });
  }

  const goodSleep = compareCravingByCondition(logs, (log) => log.sleepQuality >= 4);
  if (goodSleep) {
    insights.push({
      text: `Los días que dormiste mejor, tu craving promedio fue ${goodSleep.withAvg.toFixed(1)} (vs ${goodSleep.withoutAvg.toFixed(1)} los días que dormiste peor).`,
    });
  }

  for (const habit of habits) {
    const comparison = compareCravingByCondition(logs, (log) => log.habitIds.includes(habit.id));
    if (comparison) {
      insights.push({
        text: `Los días que cumpliste "${habit.name}", tu craving promedio fue ${comparison.withAvg.toFixed(1)} (vs ${comparison.withoutAvg.toFixed(1)} los días que no).`,
      });
    }
  }

  return insights;
}
