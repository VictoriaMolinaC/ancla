interface SupportButtonProps {
  onClick: () => void;
}

/** Botón flotante, visible en cualquier pantalla — acceso rápido a la red de apoyo. */
export function SupportButton({ onClick }: SupportButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Red de apoyo"
      className="fixed bottom-5 right-5 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-lg hover:bg-secondary/90"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
    </button>
  );
}
