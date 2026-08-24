import React, { useEffect } from 'react';
import { X, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarMonthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (day: number) => void;
}

export const CalendarMonthModal: React.FC<CalendarMonthModalProps> = ({
  isOpen,
  onClose,
  onSelectDate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const daysInJune = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendar-picker-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-[28px] max-w-sm w-full p-6 shadow-2xl border border-purple-100 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <h3 id="calendar-picker-title" className="text-lg font-bold text-gray-900">
              June 2026
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-pink"
            aria-label="Close calendar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-1">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>

        {/* 30 Days Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {daysInJune.map((d) => {
            const isToday = d === 21;
            return (
              <button
                key={d}
                type="button"
                onClick={() => {
                  onSelectDate(d);
                  onClose();
                }}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-medium transition-all min-h-[36px] min-w-[36px] ${
                  isToday
                    ? 'bg-[#955BE3] text-white shadow-sm font-bold scale-105'
                    : 'text-gray-700 hover:bg-pink-50 hover:text-brand-pink'
                }`}
                aria-label={`Select June ${d}, 2026`}
              >
                {d}
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-center text-gray-400 mt-2">
          Click any date in June 2026 to view its daily cycle logs.
        </p>
      </div>
    </div>
  );
};
