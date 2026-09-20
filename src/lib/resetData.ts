import { db } from '../db/db';

/**
 * Borra todos los datos personales: sustancias, registros diarios, contactos,
 * hábitos y disparadores.
 *
 * No toca la tabla `settings` a propósito: ahí vive la marca de que los datos
 * de ejemplo ya se cargaron una vez. Si la borráramos, el seed volvería a
 * correr en el próximo arranque y repondría la persona ficticia — justo lo
 * contrario de "empezar de cero".
 */
export async function deleteAllData(): Promise<void> {
  await db.transaction('rw', [db.substances, db.dailyLogs, db.contacts, db.habits, db.triggers], async () => {
    await Promise.all([
      db.substances.clear(),
      db.dailyLogs.clear(),
      db.contacts.clear(),
      db.habits.clear(),
      db.triggers.clear(),
    ]);
  });
}
