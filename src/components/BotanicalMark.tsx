type BotanicalMarkProps = {
  className?: string;
  size?: number;
};

export function BotanicalMark({ className = "", size = 10 }: BotanicalMarkProps) {
  return (
    <svg
      viewBox="0 0 8 18"
      width={size}
      height={size * 1.8}
      aria-hidden="true"
      className={`shrink-0 select-none pointer-events-none ${className}`}
    >
      <line x1="4" y1="17" x2="4" y2="1" stroke="currentColor" strokeWidth="0.65" strokeLinecap="round" />
      <line x1="4" y1="14" x2="1.2" y2="11.2" stroke="currentColor" strokeWidth="0.55" strokeLinecap="round" />
      <line x1="4" y1="14" x2="6.8" y2="11.2" stroke="currentColor" strokeWidth="0.55" strokeLinecap="round" />
      <line x1="4" y1="9.5" x2="1.2" y2="6.7"  stroke="currentColor" strokeWidth="0.55" strokeLinecap="round" />
      <line x1="4" y1="9.5" x2="6.8" y2="6.7"  stroke="currentColor" strokeWidth="0.55" strokeLinecap="round" />
      <line x1="4" y1="5.5" x2="2.4" y2="3.2"  stroke="currentColor" strokeWidth="0.5"  strokeLinecap="round" />
      <line x1="4" y1="5.5" x2="5.6" y2="3.2"  stroke="currentColor" strokeWidth="0.5"  strokeLinecap="round" />
    </svg>
  );
}

export function InkDot({ className = "", size = 4 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 8 8"
      width={size}
      height={size}
      aria-hidden="true"
      className={`shrink-0 select-none pointer-events-none ${className}`}
    >
      <circle cx="4" cy="4" r="2.8" fill="currentColor" />
    </svg>
  );
}
