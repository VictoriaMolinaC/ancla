import Dexie, { type EntityTable } from 'dexie';
import type { Substance, DailyLog, Contact, ListItem, Settings } from './types';

const db = new Dexie('AnclaDB') as Dexie & {
  substances: EntityTable<Substance, 'id'>;
  dailyLogs: EntityTable<DailyLog, 'id'>;
  contacts: EntityTable<Contact, 'id'>;
  habits: EntityTable<ListItem, 'id'>;
  triggers: EntityTable<ListItem, 'id'>;
  settings: EntityTable<Settings, 'key'>;
};

db.version(1).stores({
  substances: '++id, name, lastUseDate',
  dailyLogs: '++id, &date',
  contacts: '++id, name',
  habits: '++id, active',
  triggers: '++id, active',
  settings: 'key',
});

export { db };
