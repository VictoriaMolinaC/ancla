interface PlaceholderScreenProps {
  message: string;
}

/** Marcador temporal para pantallas que todavía no tienen contenido real (llega en próximos pasos). */
export function PlaceholderScreen({ message }: PlaceholderScreenProps) {
  return <div className="px-4 py-10 text-center text-ink/60 dark:text-ink-dark/60">{message}</div>;
}
