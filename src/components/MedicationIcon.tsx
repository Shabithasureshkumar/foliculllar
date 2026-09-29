import React from 'react';

/**
 * The single generic capsule icon used for every medication UI
 * (Daily Log, Overview history, Add Medication modal).
 */
export const MedicationIcon: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => (
  <span
    aria-hidden="true"
    className={`rounded-full bg-[#FFF0F6] border border-[#FDE2EC] flex items-center justify-center shrink-0 ${
      size === 'sm' ? 'w-9 h-9' : 'w-10 h-10'
    }`}
  >
    <svg viewBox="0 0 24 24" className={size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'} fill="none">
      <g transform="rotate(-45 12 12)">
        <path d="M12 4.5h0a4 4 0 0 1 4 4V12H8V8.5a4 4 0 0 1 4-4z" fill="#F43F8F" />
        <path d="M8 12h8v3.5a4 4 0 0 1-4 4h0a4 4 0 0 1-4-4z" fill="#C4B5FD" />
        <rect x="8" y="4.5" width="8" height="15" rx="4" stroke="#BE185D" strokeWidth="1.2" />
        <path d="M10 7.5c.4-.9 1-1.3 1.8-1.4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity=".8" />
      </g>
    </svg>
  </span>
);
