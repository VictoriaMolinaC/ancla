import { useLiveQuery } from 'dexie-react-hooks';
import { ContactsSection } from '../components/ajustes/ContactsSection';
import { EditableListSection } from '../components/ajustes/EditableListSection';
import { HrThresholdSection } from '../components/ajustes/HrThresholdSection';
import { habitsRepo, triggersRepo } from '../db/repositories';

export function AjustesScreen() {
  const habits = useLiveQuery(() => habitsRepo.getAll());
  const triggers = useLiveQuery(() => triggersRepo.getAll());

  return (
    <div className="flex flex-col gap-8 px-4 py-6">
      <h1 className="text-xl font-semibold text-ink dark:text-ink-dark">Ajustes</h1>
      <ContactsSection />
      <EditableListSection
        title="Hábitos de apoyo"
        items={habits}
        onAdd={(name) => habitsRepo.add(name)}
        onRename={(id, name) => habitsRepo.rename(id, name)}
        onToggleActive={(id, active) => habitsRepo.setActive(id, active)}
      />
      <EditableListSection
        title="Disparadores"
        items={triggers}
        onAdd={(name) => triggersRepo.add(name)}
        onRename={(id, name) => triggersRepo.rename(id, name)}
        onToggleActive={(id, active) => triggersRepo.setActive(id, active)}
      />
      <HrThresholdSection />
    </div>
  );
}
