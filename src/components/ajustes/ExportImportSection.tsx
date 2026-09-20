import { type ChangeEvent, useRef, useState } from 'react';
import { exportCsv, exportJson, importJson } from '../../lib/exportImport';

export function ExportImportSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    const confirmed = window.confirm(
      'Importar va a REEMPLAZAR todos tus datos actuales (sustancias, registros, contactos, listas) por los del archivo. Esto no se puede deshacer. ¿Continuar?',
    );
    if (!confirmed) return;

    try {
      await importJson(file);
      setMessage('Datos importados correctamente.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo importar el archivo.');
    }
  };

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-ink dark:text-ink-dark">Exportar / importar datos</h2>
      <p className="mb-3 text-sm text-ink/60 dark:text-ink-dark/60">
        Tus datos viven solo en este navegador. Exportá seguido para tener un respaldo.
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => exportJson()}
          className="rounded-lg border border-ink/15 px-4 py-2 text-sm text-ink dark:border-ink-dark/15 dark:text-ink-dark"
        >
          Exportar JSON (respaldo completo)
        </button>
        <button
          type="button"
          onClick={() => exportCsv()}
          className="rounded-lg border border-ink/15 px-4 py-2 text-sm text-ink dark:border-ink-dark/15 dark:text-ink-dark"
        >
          Exportar CSV (registros diarios)
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg border border-warning/40 px-4 py-2 text-sm text-warning"
        >
          Importar JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {message && <p className="mt-2 text-sm text-ink/70 dark:text-ink-dark/70">{message}</p>}
    </section>
  );
}
