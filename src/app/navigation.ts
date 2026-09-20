export type ScreenId = 'inicio' | 'registro' | 'progreso' | 'sustancias' | 'habitos' | 'disparadores' | 'ajustes';

export interface NavItem {
  id: ScreenId;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'registro', label: 'Registro' },
  { id: 'progreso', label: 'Progreso' },
  { id: 'sustancias', label: 'Sustancias' },
  { id: 'habitos', label: 'Hábitos' },
  { id: 'disparadores', label: 'Disparadores' },
  { id: 'ajustes', label: 'Ajustes' },
];
