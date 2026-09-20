import { db } from '../db';

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  const row = await db.settings.get(key);
  return row ? (row.value as T) : fallback;
}

export const setSetting = (key: string, value: unknown) => db.settings.put({ key, value });

const HR_THRESHOLD_KEY = 'hrThreshold';
const DEFAULT_HR_THRESHOLD = 100;

/** Umbral de LPM en reposo contra el que se compara al guardar el registro diario. */
export const getHrThreshold = () => getSetting<number>(HR_THRESHOLD_KEY, DEFAULT_HR_THRESHOLD);

export const setHrThreshold = (value: number) => setSetting(HR_THRESHOLD_KEY, value);
