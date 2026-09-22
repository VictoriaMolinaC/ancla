import { useState } from 'react';
import type { Theme } from '../../app/theme';
import { ThemeToggle } from '../layout/ThemeToggle';

interface WelcomeTourProps {
  onFinish: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

interface TourCard {
  title: string;
  body: string;
}

const CARDS: TourCard[] = [
  {
    title: 'Bienvenida a Progreso Sobrio',
    body: 'Un día a la vez. Esta app te ayuda a llevar el registro de tu proceso, sin juzgar y sin diagnósticos. Te mostramos rápido cómo se organiza.',
  },
  {
    title: 'Registro diario',
    body: 'En menos de 30 segundos anotás cómo estuvo tu día: LPM en reposo, sueño, craving, ánimo y los hábitos que cumpliste. Se accede desde "Registrar hoy" en Inicio, o desde el ítem "Registro" del menú.',
  },
  {
    title: 'Progreso',
    body: 'Ahí vive todo lo que registrás con el tiempo: historial, calendario, gráficas y observaciones simples sobre qué parece ayudarte más.',
  },
  {
    title: 'Tu red de apoyo, siempre a mano',
    body: 'El botón con el corazón, abajo a la derecha, abre tus contactos de confianza y la línea 1412 de SENDA gratuita, confidencial, las 24 horas.',
  },
];

/**
 * Tour de bienvenida, una sola vez después de confirmar la edad. Explica lo
 * que el drawer no explica por sí solo: qué diferencia a "Registro" de
 * "Progreso", y que el botón flotante no es solo un adorno.
 */
export function WelcomeTour({ onFinish, theme, onToggleTheme }: WelcomeTourProps) {
  const [step, setStep] = useState(0);
  const isLast = step === CARDS.length - 1;
  const card = CARDS[step];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-base p-4 dark:bg-base-dark">
      <div className="absolute top-4 right-4">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
      <div className="w-full max-w-sm rounded-2xl bg-ink/[0.03] p-6 shadow-[0_2px_8px_rgba(62,58,54,0.08)] dark:bg-ink-dark/[0.05] dark:shadow-none">
        <h2 className="text-lg font-semibold text-ink dark:text-ink-dark">{card.title}</h2>
        <p className="mt-3 text-sm text-ink/80 dark:text-ink-dark/80">{card.body}</p>

        <div className="mt-6 flex items-center justify-center gap-2">
          {CARDS.map((c, i) => (
            <span
              key={c.title}
              className={`h-1.5 w-1.5 rounded-full ${i === step ? 'bg-primary' : 'bg-ink/20 dark:bg-ink-dark/20'}`}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onFinish}
            className="text-sm text-ink/50 underline dark:text-ink-dark/50"
          >
            Saltar
          </button>
          <button
            type="button"
            onClick={() => (isLast ? onFinish() : setStep((s) => s + 1))}
            className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            {isLast ? 'Empezar' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
}
