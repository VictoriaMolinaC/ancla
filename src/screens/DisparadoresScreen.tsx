import { useLiveQuery } from 'dexie-react-hooks';
import { EditableListSection } from '../components/ajustes/EditableListSection';
import { triggersRepo } from '../db/repositories';

export function DisparadoresScreen() {
  const triggers = useLiveQuery(() => triggersRepo.getAll());

  return (
    <div className="flex flex-col gap-8 px-4 py-6">
      <h1 className="text-xl font-semibold text-ink dark:text-ink-dark">Disparadores</h1>

      <EditableListSection
        title="Gestionar disparadores"
        items={triggers}
        onAdd={(name) => triggersRepo.add(name)}
        onRename={(id, name) => triggersRepo.rename(id, name)}
        onToggleActive={(id, active) => triggersRepo.setActive(id, active)}
      />
    </div>
  );
}
