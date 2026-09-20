import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
}

/** Una sola serie no necesita leyenda propia — el título ya dice qué se está mostrando. */
export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="shadow-[0_2px_8px_rgba(62,58,54,0.08)] dark:shadow-none rounded-2xl bg-ink/[0.03] p-4 dark:bg-ink-dark/[0.05]">
      <h2 className="mb-2 text-sm font-medium text-ink/80 dark:text-ink-dark/80">{title}</h2>
      {children}
    </div>
  );
}
