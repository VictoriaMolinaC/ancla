import { db } from '../db';
import type { Contact } from '../types';

export const addContact = (data: Omit<Contact, 'id' | 'createdAt'>) =>
  db.contacts.add({ ...data, createdAt: new Date().toISOString() });

export const updateContact = (id: number, changes: Partial<Omit<Contact, 'id'>>) =>
  db.contacts.update(id, changes);

export const deleteContact = (id: number) => db.contacts.delete(id);

export const getContacts = () => db.contacts.toArray();
