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

const DEMO_SUBSTANCE_ID_KEY = 'demoSubstanceId';
const DEMO_BANNER_DISMISSED_KEY = 'demoBannerDismissed';

/**
 * Id de la sustancia que cargó el seed. Sirve para saber si los datos de
 * ejemplo siguen presentes: mientras esa sustancia exista, el aviso de "esto
 * es de ejemplo" tiene sentido.
 */
export const getDemoSubstanceId = () => getSetting<number | null>(DEMO_SUBSTANCE_ID_KEY, null);

export const setDemoSubstanceId = (id: number) => setSetting(DEMO_SUBSTANCE_ID_KEY, id);

export const isDemoBannerDismissed = () => getSetting<boolean>(DEMO_BANNER_DISMISSED_KEY, false);

export const dismissDemoBanner = () => setSetting(DEMO_BANNER_DISMISSED_KEY, true);
