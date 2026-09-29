import React, { useRef, useState } from 'react';
import { X, Calendar } from 'lucide-react';
import type { PeriodFlowType, CrampsLevelType, PeriodLogData } from '../../types';
import { ToggleSwitch } from '../ToggleSwitch';
import { useModalA11y } from '../../hooks/useModalA11y';

interface LogPeriodModalProps {
  isOpen: boolean;
  initialData?: PeriodLogData;
  dateLabel?: string;
  onClose: () => void;
  onSave: (data: PeriodLogData) => void;
}

export const LogPeriodModal: React.FC<LogPeriodModalProps> = ({
  isOpen,
  initialData,
  dateLabel = 'Today',
  onClose,
  onSave,
}) => {
  const [flow, setFlow] = useState<PeriodFlowType>(() => initialData?.flow || 'Light');
  const [cramps, setCramps] = useState<CrampsLevelType>(() => initialData?.cramps || 'None');
  const [clots, setClots] = useState<boolean>(() => initialData?.clots ?? false);
  const [notes, setNotes] = useState<string>(() => initialData?.notes || '');
  const dialogRef = useRef<HTMLDivElement>(null);
  useModalA11y(isOpen, onClose, dialogRef);

  if (!isOpen) return null;

  const flowOptions: PeriodFlowType[] = ['Spotting', 'Light', 'Medium', 'Heavy'];
  const crampsOptions: CrampsLevelType[] = ['None', 'Mild', 'Moderate', 'Severe'];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      flow,
      cramps,
      clots,
      notes,
      dateStr: dateLabel,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/35 backdrop-blur-[2px] animate-fade"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="log-period-title"
        tabIndex={-1}
        className="bg-white rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 md:p-7 border border-[#F1DDE8]/80 shadow-2xl w-full max-w-[480px] max-h-[92vh] overflow-y-auto relative text-left box-border font-sans transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <div>
            <h2 id="log-period-title" className="text-[18px] sm:text-[20px] font-bold text-[#17152B] leading-tight">
              Log Period
            </h2>
            <p className="text-[11.5px] sm:text-[12px] text-[#68708A] font-normal mt-0.5">
              Record your period details for this day.
            </p>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close log period modal"
            className="w-7 h-7 rounded-full bg-[#FFF0F6] text-[#EC4899] hover:bg-[#FFE4EE] flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-pink-300 shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Date Bar */}
        <div className="w-full bg-[#FFF0F6] rounded-full px-4 py-2.5 flex items-center gap-2 mb-4 mt-3 select-none">
          <Calendar className="w-3.5 h-3.5 text-[#EC4899] shrink-0" />
          <span className="text-[12px] font-semibold text-[#17152B] leading-none">
            {dateLabel}
          </span>
        </div>

        <form onSubmit={handleSave}>
          {/* 1. Flow Selection */}
          <div className="mb-4">
            <p id="period-flow-label" className="text-[12px] sm:text-[12.5px] font-bold text-[#17152B] mb-2 block">
              How is your flow today?
            </p>
            <div role="radiogroup" aria-labelledby="period-flow-label" className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {flowOptions.map((opt) => {
                const isSelected = flow === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setFlow(opt)}
                    className={`py-2 sm:py-2.5 px-3 rounded-full text-[12px] font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-pink-300 cursor-pointer ${
                      isSelected
                        ? 'border-2 border-[#EC4899] bg-[#FFF0F6] text-[#EC4899] font-bold shadow-2xs'
                        : 'border border-gray-200 bg-white hover:bg-gray-50 text-[#17152B]'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Cramps Level */}
          <div className="mb-4">
            <p id="period-cramps-label" className="text-[12px] sm:text-[12.5px] font-bold text-[#17152B] mb-2 block">
              Cramps Level
            </p>
            <div role="radiogroup" aria-labelledby="period-cramps-label" className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {crampsOptions.map((opt) => {
                const isSelected = cramps === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setCramps(opt)}
                    className={`py-2 sm:py-2.5 px-3 rounded-full text-[12px] font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-pink-300 cursor-pointer ${
                      isSelected
                        ? 'border-2 border-[#EC4899] bg-[#FFF0F6] text-[#EC4899] font-bold shadow-2xs'
                        : 'border border-gray-200 bg-white hover:bg-gray-50 text-[#17152B]'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Clots Present Toggle */}
          <ToggleSwitch
            id="clots-present-switch"
            checked={clots}
            onChange={setClots}
            label="Clots Present"
            className="border border-gray-200 rounded-full px-4 py-2 sm:py-2.5 mb-4"
          />

          {/* 4. Notes Textarea */}
          <div className="mb-5">
            <label htmlFor="period-notes" className="text-[12px] sm:text-[12.5px] font-bold text-[#17152B] mb-1.5 block">
              Notes
            </label>
            <textarea
              id="period-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a note..."
              className="w-full h-20 sm:h-24 rounded-[18px] border border-gray-200 p-3 text-xs text-[#17152B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none font-sans bg-white"
            />
          </div>

          {/* 5. Bottom Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-[#EC4899] hover:bg-[#DB2777] text-white font-bold text-xs sm:text-sm px-8 py-2.5 rounded-full shadow-sm active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-pink-300 cursor-pointer"
            >
              Save Log
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-xs sm:text-[12.5px] font-semibold text-[#68708A] hover:text-[#17152B] transition-all focus:outline-none cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
