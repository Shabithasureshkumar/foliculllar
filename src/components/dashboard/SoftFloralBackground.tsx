import React from 'react';

const PETAL_ANGLES_6 = [0, 60, 120, 180, 240, 300];
const PETAL_ANGLES_5 = [0, 72, 144, 216, 288];

/**
 * Soft pink/lavender gradient with a few translucent petals and a small water drop, drawn behind a
 * card's content. Purely decorative: the parent must be `relative overflow-hidden` with content at z-10.
 * The artwork keeps its aspect ratio and hugs the bottom-right corner, so it stays small on wide cards.
 */
export const SoftFloralBackground: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    aria-hidden="true"
    className={`absolute inset-0 pointer-events-none select-none bg-gradient-to-br from-[#FFF4FA] via-[#FCE9F5] to-[#EFE4FC] ${className}`}
  >
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 170" preserveAspectRatio="xMaxYMax meet" fill="none">
      <defs>
        <linearGradient id="floral-petal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#F9A8D4" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="floral-drop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#D8C7FA" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <g transform="translate(150 128)">
        {PETAL_ANGLES_6.map((deg) => (
          <ellipse key={deg} cx="0" cy="-20" rx="9" ry="20" fill="url(#floral-petal)" transform={`rotate(${deg})`} />
        ))}
      </g>
      <g transform="translate(178 30) scale(0.7)">
        {PETAL_ANGLES_5.map((deg) => (
          <ellipse key={deg} cx="0" cy="-16" rx="7" ry="16" fill="url(#floral-petal)" transform={`rotate(${deg})`} />
        ))}
      </g>
      <path d="M104 62 C114 80 120 88 120 98 a16 16 0 0 1 -32 0 C88 88 94 80 104 62 Z" fill="url(#floral-drop)" />
    </svg>
  </div>
);
