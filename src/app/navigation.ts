export type ScreenId = 'inicio' | 'registro' | 'progreso' | 'sustancias' | 'ajustes';

export interface NavItem {
  id: ScreenId;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'registro', label: 'Registro' },
  { id: 'progreso', label: 'Progreso' },
  { id: 'sustancias', label: 'Sustancias' },
  { id: 'ajustes', label: 'Ajustes' },
];
