import { db } from '../db';

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  const row = await db.settings.get(key);
  return row ? (row.value as T) : fallback;
}

export const setSetting = (key: string, value: unknown) => db.settings.put({ key, value });
