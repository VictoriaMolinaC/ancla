import { useLiveQuery } from 'dexie-react-hooks';
import { type FormEvent, useState } from 'react';
import { DateField } from '../components/forms/DateField';
import { addSubstance, getSubstances } from '../db/repositories';
import { formatDateDisplay, toDateKey } from '../lib/dates';
import { getStreakDays } from '../lib/streak';

export function SustanciasScreen() {
  const substances = useLiveQuery(() => getSubstances());
  const today = toDateKey(new Date());
  const [name, setName] = useState('');
  const [lastUseDate, setLastUseDate] = useState(today);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName || !lastUseDate) return;

    await addSubstance({ name: trimmedName, lastUseDate });
    setName('');
    setLastUseDate(today);
  };

  return (
    <div className="px-4 py-6">
      <h1 className="mb-4 text-xl font-semibold text-ink dark:text-ink-dark">Sustancias</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-6 flex flex-col gap-3 rounded-2xl bg-ink/[0.03] p-4 dark:bg-ink-dark/[0.05]"
      >
        <label className="flex flex-col gap-1 text-sm text-ink/80 dark:text-ink-dark/80">
          Nombre
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ej: Alcohol, Tabaco, Cannabis"
            required
            className="rounded-lg border border-ink/15 bg-base px-3 py-2 text-ink dark:border-ink-dark/15 dark:bg-base-dark dark:text-ink-dark"
          />
        </label>

        <DateField label="Última vez" value={lastUseDate} onChange={setLastUseDate} max={today} required />

        <button
          type="submit"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
        >
          Agregar sustancia
        </button>
      </form>

      {substances && substances.length > 0 && (
        <ul className="flex flex-col gap-2">
          {substances.map((substance) => (
            <li
              key={substance.id}
              className="flex items-center justify-between rounded-lg border border-ink/10 px-4 py-3 dark:border-ink-dark/10"
            >
              <div>
                <p className="font-medium text-ink dark:text-ink-dark">{substance.name}</p>
                <p className="text-sm text-ink/60 dark:text-ink-dark/60">
                  Última vez: {formatDateDisplay(substance.lastUseDate)}
                </p>
              </div>
              <span className="text-sm font-medium text-primary">{getStreakDays(substance.lastUseDate)} días</span>
            </li>
          ))}
        </ul>
      )}

      {substances && substances.length === 0 && (
        <p className="text-center text-ink/60 dark:text-ink-dark/60">Todavía no agregaste ninguna sustancia.</p>
      )}
    </div>
  );
}
