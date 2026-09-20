import { ContactsSection } from '../components/ajustes/ContactsSection';

export function AjustesScreen() {
  return (
    <div className="flex flex-col gap-8 px-4 py-6">
      <h1 className="text-xl font-semibold text-ink dark:text-ink-dark">Ajustes</h1>
      <ContactsSection />
    </div>
  );
}
