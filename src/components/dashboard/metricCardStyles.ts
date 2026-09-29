import type React from 'react';

// Shared card styling/behaviour for the Overview metric cards (all phases)
export const CARD =
  'w-full min-w-0 bg-white rounded-[22px] p-4 sm:p-5 border border-[#F1DDE8]/70 shadow-2xs relative flex flex-col overflow-hidden text-left min-h-[168px]';

// Whole-card shortcut to the Daily Log, reachable by keyboard (Enter/Space)
export const clickableProps = (onActivate: () => void, label: string) => ({
  role: 'button' as const,
  tabIndex: 0,
  'aria-label': label,
  onClick: onActivate,
  onKeyDown: (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate();
    }
  },
});

export const CLICKABLE =
  'cursor-pointer transition-all hover:border-pink-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300';
