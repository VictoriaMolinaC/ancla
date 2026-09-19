import type { EntityTable } from 'dexie';
import { db } from '../db';
import type { ListItem } from '../types';

/**
 * Hábitos y disparadores son listas editables con la misma forma (nombre + activo).
 * Se desactivan en vez de borrarse para no perder el histórico de días que los usaron.
 */
function createListItemRepository(table: EntityTable<ListItem, 'id'>) {
  return {
    add: (name: string) => table.add({ name, active: true, createdAt: new Date().toISOString() }),
    rename: (id: number, name: string) => table.update(id, { name }),
    setActive: (id: number, active: boolean) => table.update(id, { active }),
    remove: (id: number) => table.delete(id),
    getAll: () => table.toArray(),
    getActive: async () => (await table.toArray()).filter((item) => item.active),
  };
}

export const habitsRepo = createListItemRepository(db.habits);
export const triggersRepo = createListItemRepository(db.triggers);
