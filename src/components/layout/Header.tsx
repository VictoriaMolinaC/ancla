import type { Theme } from '../../app/theme';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onMenuClick: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ onMenuClick, theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-ink/10 bg-base/90 px-4 py-3 backdrop-blur dark:border-ink-dark/10 dark:bg-base-dark/90">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Abrir menú"
        className="rounded-md p-2 text-ink hover:bg-ink/5 dark:text-ink-dark dark:hover:bg-ink-dark/10"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v13M8 12H4a8 8 0 0 0 8 8 8 8 0 0 0 8-8h-4M9 5H7M17 5h-2" />
      </svg>
      <span className="text-lg font-semibold text-ink dark:text-ink-dark">Ancla</span>

      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  );
}
