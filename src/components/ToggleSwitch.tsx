import React from 'react';

interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

/**
 * Accessible on/off switch. The thumb is moved with an explicit inline translateX
 * (not a utility-class variable chain) so it always slides to the right when ON.
 * The whole row is a <label>, so clicking the text toggles it too; Space/Enter work natively.
 */
export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  id,
  checked,
  onChange,
  label,
  description,
  className = '',
}) => (
  <label
    htmlFor={id}
    className={`flex items-center justify-between gap-3 bg-white cursor-pointer hover:bg-gray-50/60 transition-colors select-none ${className}`}
  >
    <span className="min-w-0">
      <span className="text-[12.5px] font-semibold text-[#17152B] block leading-tight">{label}</span>
      {description && (
        <span className="text-[10.5px] text-[#68708A] block leading-tight mt-0.5">{description}</span>
      )}
    </span>
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-1 ${
        checked ? 'bg-[#EC4899]' : 'bg-gray-200'
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out"
        style={{ transform: checked ? 'translateX(20px)' : 'translateX(0px)' }}
      />
    </button>
  </label>
);
