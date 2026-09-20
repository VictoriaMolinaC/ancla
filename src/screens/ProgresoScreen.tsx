import { useState } from 'react';
import { PlaceholderScreen } from '../components/layout/PlaceholderScreen';
import { HistorialList } from '../components/progreso/HistorialList';

type ProgresoTab = 'historial' | 'calendario' | 'graficas' | 'correlaciones';

const TABS: { id: ProgresoTab; label: string }[] = [
  { id: 'historial', label: 'Historial' },
  { id: 'calendario', label: 'Calendario' },
  { id: 'graficas', label: 'Gráficas' },
  { id: 'correlaciones', label: 'Qué te ayuda' },
];

const PLACEHOLDER_MESSAGES: Record<Exclude<ProgresoTab, 'historial'>, string> = {
  calendario: 'Vista de calendario (más adelante).',
  graficas: 'Gráficas de LPM en reposo, sueño y actividad (más adelante).',
  correlaciones: 'Panel de correlaciones simples (más adelante).',
};

interface ProgresoScreenProps {
  onEditDate: (date: string) => void;
}

export function ProgresoScreen({ onEditDate }: ProgresoScreenProps) {
  const [tab, setTab] = useState<ProgresoTab>('historial');

  return (
    <div className="px-4 py-6">
      <h1 className="mb-4 text-xl font-semibold text-ink dark:text-ink-dark">Progreso</h1>

      <div className="mb-4 flex gap-1 overflow-x-auto border-b border-ink/10 dark:border-ink-dark/10">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`shrink-0 border-b-2 px-3 py-2 text-sm font-medium ${
              tab === t.id ? 'border-primary text-primary' : 'border-transparent text-ink/60 dark:text-ink-dark/60'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'historial' ? (
        <HistorialList onEdit={onEditDate} />
      ) : (
        <PlaceholderScreen message={PLACEHOLDER_MESSAGES[tab]} />
      )}
    </div>
  );
}
