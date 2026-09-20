import { db } from '../db/db';
import { getHrThreshold, setHrThreshold } from '../db/repositories';
import type { Contact, DailyLog, ListItem, Substance } from '../db/types';
import { toDateKey } from './dates';

export interface AnclaExport {
  version: 1;
  exportedAt: string;
  substances: Substance[];
  dailyLogs: DailyLog[];
  contacts: Contact[];
  habits: ListItem[];
  triggers: ListItem[];
  hrThreshold: number;
}

function isValidExport(data: unknown): data is AnclaExport {
  if (typeof data !== 'object' || data === null) return false;
  const candidate = data as Record<string, unknown>;
  return (
    candidate.version === 1 &&
    Array.isArray(candidate.substances) &&
    Array.isArray(candidate.dailyLogs) &&
    Array.isArray(candidate.contacts) &&
    Array.isArray(candidate.habits) &&
    Array.isArray(candidate.triggers)
  );
}

async function buildExport(): Promise<AnclaExport> {
  const [substances, dailyLogs, contacts, habits, triggers, hrThreshold] = await Promise.all([
    db.substances.toArray(),
    db.dailyLogs.toArray(),
    db.contacts.toArray(),
    db.habits.toArray(),
    db.triggers.toArray(),
    getHrThreshold(),
  ]);

  return { version: 1, exportedAt: new Date().toISOString(), substances, dailyLogs, contacts, habits, triggers, hrThreshold };
}

function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function exportJson(): Promise<void> {
  const data = await buildExport();
  downloadBlob(JSON.stringify(data, null, 2), `ancla-datos-${data.exportedAt.slice(0, 10)}.json`, 'application/json');
}

function csvEscape(value: unknown): string {
  const str = value === undefined || value === null ? '' : String(value);
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

const CSV_COLUMNS = [
  'fecha',
  'lpm_reposo',
  'lpm_min',
  'lpm_max',
  'equipo',
  'craving',
  'horas_sueno',
  'calidad_sueno',
  'minutos_actividad',
  'tipo_actividad',
  'energia',
  'animo',
  'disparadores',
  'habitos',
  'notas',
];

export async function exportCsv(): Promise<void> {
  const [dailyLogs, habits, triggers] = await Promise.all([
    db.dailyLogs.orderBy('date').toArray(),
    db.habits.toArray(),
    db.triggers.toArray(),
  ]);

  const habitNames = new Map(habits.map((habit) => [habit.id, habit.name]));
  const triggerNames = new Map(triggers.map((trigger) => [trigger.id, trigger.name]));

  const rows = dailyLogs.map((log) => [
    log.date,
    log.restingHeartRate ?? '',
    log.minHeartRate ?? '',
    log.maxHeartRate ?? '',
    log.deviceUsed ?? '',
    log.craving,
    log.sleepHours ?? '',
    log.sleepQuality,
    log.activityMinutes ?? '',
    log.activityType ?? '',
    log.energy,
    log.mood,
    log.triggerIds.map((id) => triggerNames.get(id)).filter(Boolean).join('; '),
    log.habitIds.map((id) => habitNames.get(id)).filter(Boolean).join('; '),
    log.notes ?? '',
  ]);

  const csv = [CSV_COLUMNS, ...rows].map((row) => row.map(csvEscape).join(',')).join('\n');
  downloadBlob(csv, `ancla-registros-${toDateKey(new Date())}.csv`, 'text/csv');
}

/** Reemplaza TODOS los datos actuales por los del archivo — es una restauración, no un merge. */
export async function importJson(file: File): Promise<void> {
  const text = await file.text();
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('El archivo no es un JSON válido.');
  }

  if (!isValidExport(data)) {
    throw new Error('El archivo no tiene el formato esperado de un respaldo de Ancla.');
  }

  await db.transaction(
    'rw',
    [db.substances, db.dailyLogs, db.contacts, db.habits, db.triggers, db.settings],
    async () => {
      await Promise.all([
        db.substances.clear(),
        db.dailyLogs.clear(),
        db.contacts.clear(),
        db.habits.clear(),
        db.triggers.clear(),
      ]);
      await Promise.all([
        db.substances.bulkAdd(data.substances),
        db.dailyLogs.bulkAdd(data.dailyLogs),
        db.contacts.bulkAdd(data.contacts),
        db.habits.bulkAdd(data.habits),
        db.triggers.bulkAdd(data.triggers),
      ]);
      await setHrThreshold(data.hrThreshold ?? 100);
    },
  );
}
