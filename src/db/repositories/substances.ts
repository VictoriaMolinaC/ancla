import { db } from '../db';
import type { Substance } from '../types';

export const addSubstance = (data: Omit<Substance, 'id' | 'createdAt'>) =>
  db.substances.add({ ...data, createdAt: new Date().toISOString() });

export const updateSubstance = (id: number, changes: Partial<Omit<Substance, 'id'>>) =>
  db.substances.update(id, changes);

export const deleteSubstance = (id: number) => db.substances.delete(id);

export const getSubstances = () => db.substances.toArray();

export const getSubstance = (id: number) => db.substances.get(id);
