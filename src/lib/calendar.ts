import { toDateKey } from './dates';

export interface CalendarDay {
  date: Date;
  dateKey: string;
  inCurrentMonth: boolean;
}

/**
 * Grilla de un mes en semanas completas (lunes a domingo), incluyendo los
 * días del mes anterior/siguiente necesarios para llenar la primera y
 * última semana.
 */
export function getMonthGrid(year: number, month: number): CalendarDay[] {
  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = (firstOfMonth.getDay() + 6) % 7; // lunes=0 ... domingo=6
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const gridStart = new Date(year, month, 1 - startWeekday);
  const totalCells = Math.ceil((startWeekday + daysInMonth) / 7) * 7;

  const days: CalendarDay[] = [];
  for (let i = 0; i < totalCells; i++) {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    days.push({ date, dateKey: toDateKey(date), inCurrentMonth: date.getMonth() === month });
  }

  return days;
}
