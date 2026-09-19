import { db } from '../db';
import type { DailyLog } from '../types';

export type DailyLogInput = Omit<DailyLog, 'id' | 'createdAt' | 'updatedAt'>;

/** Crea el registro del día, o lo actualiza si ya existía uno para esa fecha (una entrada por día). */
export async function upsertDailyLog(input: DailyLogInput): Promise<number> {
  const now = new Date().toISOString();
  const existing = await db.dailyLogs.where('date').equals(input.date).first();

  if (existing) {
    await db.dailyLogs.update(existing.id, { ...input, updatedAt: now });
    return existing.id;
  }

  return db.dailyLogs.add({ ...input, createdAt: now, updatedAt: now });
}

export const deleteDailyLog = (id: number) => db.dailyLogs.delete(id);

export const getDailyLogs = () => db.dailyLogs.orderBy('date').reverse().toArray();

export const getDailyLogByDate = (date: string) => db.dailyLogs.where('date').equals(date).first();
