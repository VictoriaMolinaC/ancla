interface InicioScreenProps {
  onRegistrarHoy: () => void;
}

export function InicioScreen({ onRegistrarHoy }: InicioScreenProps) {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-10 text-center">
      <p className="text-ink/60 dark:text-ink-dark/60">Acá va a vivir la racha de cada sustancia (próximo paso).</p>
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
