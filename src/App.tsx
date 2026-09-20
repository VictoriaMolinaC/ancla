import { useState } from 'react';
import type { ScreenId } from './app/navigation';
import { useTheme } from './app/theme';
import { Drawer } from './components/layout/Drawer';
import { Header } from './components/layout/Header';
import { PlaceholderScreen } from './components/layout/PlaceholderScreen';
import { SupportButton } from './components/layout/SupportButton';
import { SupportSheet } from './components/layout/SupportSheet';
import { InicioScreen } from './screens/InicioScreen';
import { ProgresoScreen } from './screens/ProgresoScreen';
import { RegistroScreen } from './screens/RegistroScreen';
import { SustanciasScreen } from './screens/SustanciasScreen';

const PLACEHOLDER_MESSAGES: Record<Exclude<ScreenId, 'inicio' | 'sustancias' | 'registro' | 'progreso'>, string> = {
  ajustes: 'Contactos, listas editables y umbral de LPM (más adelante).',
};

function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('inicio');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [registroDate, setRegistroDate] = useState<string | undefined>();
  const { theme, toggleTheme } = useTheme();

  const handleSelectScreen = (screen: ScreenId) => {
    setActiveScreen(screen);
    setDrawerOpen(false);
  };

  const handleRegistrarHoy = () => {
    setRegistroDate(undefined);
    setActiveScreen('registro');
  };

  const handleEditDate = (date: string) => {
    setRegistroDate(date);
    setActiveScreen('registro');
  };

  return (
    <div className="min-h-screen bg-base dark:bg-base-dark">
      <Header onMenuClick={() => setDrawerOpen(true)} theme={theme} onToggleTheme={toggleTheme} />
      <Drawer
        open={drawerOpen}
        activeScreen={activeScreen}
        onSelect={handleSelectScreen}
        onClose={() => setDrawerOpen(false)}
      />
      <main>
        {activeScreen === 'inicio' && <InicioScreen onRegistrarHoy={handleRegistrarHoy} />}
        {activeScreen === 'sustancias' && <SustanciasScreen />}
        {activeScreen === 'registro' && <RegistroScreen initialDate={registroDate} />}
        {activeScreen === 'progreso' && <ProgresoScreen onEditDate={handleEditDate} />}
        {activeScreen === 'ajustes' && <PlaceholderScreen message={PLACEHOLDER_MESSAGES.ajustes} />}
      </main>
      <SupportButton onClick={() => setSupportOpen(true)} />
      <SupportSheet open={supportOpen} onClose={() => setSupportOpen(false)} />
    </div>
  );
}

export default App;
