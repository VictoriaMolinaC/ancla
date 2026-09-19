import { useLiveQuery } from 'dexie-react-hooks';
import { StreakCard } from '../components/streak/StreakCard';
import { getSubstances } from '../db/repositories';
import { getStreakDays } from '../lib/streak';

interface InicioScreenProps {
  onRegistrarHoy: () => void;
}

export function InicioScreen({ onRegistrarHoy }: InicioScreenProps) {
  const substances = useLiveQuery(() => getSubstances());

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8">
      {substances && substances.length > 0 && (
        <div className="flex w-full flex-col items-center gap-4">
          {substances.map((substance) => (
            <StreakCard
              key={substance.id}
              substanceName={substance.name}
              streakDays={getStreakDays(substance.lastUseDate)}
            />
          ))}
        </div>
      )}

      {substances && substances.length === 0 && (
        <p className="text-center text-ink/60 dark:text-ink-dark/60">
          Todavía no agregaste ninguna sustancia. Vas a poder hacerlo desde Sustancias.
        </p>
      )}

      <button
        type="button"
        onClick={onRegistrarHoy}
        className="rounded-full bg-primary px-6 py-3 text-base font-medium text-white hover:bg-primary/90"
      >
        Registrar hoy
      </button>
    </div>
  );
}
