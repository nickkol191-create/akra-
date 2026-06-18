/**
 * AKRA mark — an Art-Deco demi-sunburst (rising sun over a horizon).
 * Simple geometric SVG: the "light against the dark" motif behind the brand.
 */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      >
        {/* rays */}
        <line x1="24" y1="33" x2="24" y2="11" />
        <line x1="24" y1="33" x2="34" y2="15.7" />
        <line x1="24" y1="33" x2="41.3" y2="23" />
        <line x1="24" y1="33" x2="14" y2="15.7" />
        <line x1="24" y1="33" x2="6.7" y2="23" />
        {/* crowning arc */}
        <path d="M4 33 A20 20 0 0 1 44 33" opacity="0.55" />
        {/* horizon */}
        <line x1="2" y1="33" x2="46" y2="33" strokeWidth="1.4" />
      </g>
    </svg>
  );
}
