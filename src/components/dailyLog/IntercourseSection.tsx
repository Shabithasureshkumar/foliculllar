import React from 'react';
import { Heart, Pill, ShieldCheck, Ban, MoreHorizontal } from 'lucide-react';
import { ADDITIONAL_DETAILS_MAX } from '../../services/cycleStore';
import type { FollicularDailyLogData, IntercourseAnswer, ProtectionMethod } from '../../types';

interface IntercourseSectionProps {
  intercourse: IntercourseAnswer | null;
  protectionMethod: ProtectionMethod | null;
  additionalDetails: string;
  onUpdate: (updated: Partial<FollicularDailyLogData>) => void;
}

const PROTECTION_OPTIONS: Array<{ value: ProtectionMethod; label: string; icon: React.ReactNode }> = [
  { value: 'pill', label: 'Pill', icon: <Pill className="w-5 h-5 text-pink-400" /> },
  { value: 'condom', label: 'Condom', icon: <ShieldCheck className="w-5 h-5 text-sky-400" /> },
  { value: 'none', label: 'None', icon: <Ban className="w-5 h-5 text-[#F43F8F]" /> },
  { value: 'other', label: 'Other', icon: <MoreHorizontal className="w-5 h-5 text-gray-400" /> },
];

const ROW = 'mt-4 grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-2.5 sm:gap-4 items-center';

export const IntercourseSection: React.FC<IntercourseSectionProps> = ({
  intercourse,
  protectionMethod,
  additionalDetails,
  onUpdate,
}) => {
  const answer = (value: IntercourseAnswer) => {
    if (value === intercourse) return;
    // Any answer change resets the intercourse-specific selections
    onUpdate({ intercourse: value, protectionMethod: null, additionalDetails: '' });
  };

  const selectMethod = (value: ProtectionMethod) => {
    if (value === protectionMethod) return;
    // Details only belong to "Other", so leaving it discards the text
    onUpdate({ protectionMethod: value, additionalDetails: '' });
  };

  const choiceClass = (selected: boolean) =>
    `flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[13px] font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
      selected
        ? 'bg-[#F43F8F] border-[#F43F8F] text-white shadow-2xs'
        : 'bg-white border-gray-200/80 text-[#68708A] hover:bg-gray-50'
    }`;

  return (
    <section
      aria-labelledby="intercourse-title"
      className="w-full bg-white rounded-[24px] p-4 sm:p-5 border border-[#F1DDE8]/70 shadow-sm text-left"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center shrink-0">
          <Heart className="w-4 h-4 fill-[#F43F8F]" />
        </div>
        <div className="min-w-0">
          <h3 id="intercourse-title" className="text-card-title font-semibold text-[#17152B]">
            Intercourse
          </h3>
          <p className="text-[11px] sm:text-[12px] text-[#68708A] mt-0.5">
            Log your sexual activity to track your fertile window and understand your cycle better.
          </p>
        </div>
      </div>

      <div className={ROW}>
        <span id="intercourse-question" className="text-[13px] font-semibold text-[#17152B]">
          Did you have intercourse today?
        </span>
        <div role="group" aria-labelledby="intercourse-question" className="grid grid-cols-2 gap-3">
          <button
            type="button"
            aria-pressed={intercourse === 'yes'}
            data-testid="intercourse-yes"
            onClick={() => answer('yes')}
            className={choiceClass(intercourse === 'yes')}
          >
            <Heart className={`w-4 h-4 ${intercourse === 'yes' ? 'fill-white' : ''}`} />
            Yes
          </button>
          <button
            type="button"
            aria-pressed={intercourse === 'no'}
            data-testid="intercourse-no"
            onClick={() => answer('no')}
            className={choiceClass(intercourse === 'no')}
          >
            <Heart className="w-4 h-4" />
            No
          </button>
        </div>
      </div>

      {intercourse === 'yes' && (
        <div className={ROW}>
          <span id="protection-label" className="text-[13px] font-semibold text-[#17152B]">
            Protection method
          </span>
          <div role="group" aria-labelledby="protection-label" className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {PROTECTION_OPTIONS.map((opt) => {
              const selected = protectionMethod === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={selected}
                  data-testid={`protection-${opt.value}`}
                  onClick={() => selectMethod(opt.value)}
                  className={`min-h-[68px] p-2.5 rounded-[16px] border flex flex-col items-center justify-center gap-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
                    selected ? 'bg-[#FFF0F6] border-[#F43F8F] shadow-2xs' : 'bg-white hover:bg-gray-50 border-gray-200/80'
                  }`}
                >
                  {opt.icon}
                  <span className={`text-[12px] font-medium ${selected ? 'text-[#F43F8F]' : 'text-[#68708A]'}`}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {intercourse === 'yes' && protectionMethod === 'other' && (
        <div className="mt-4">
          <label htmlFor="intercourse-details" className="text-[13px] font-semibold text-[#17152B] block mb-2">
            Additional details (optional)
          </label>
          <textarea
            id="intercourse-details"
            data-testid="intercourse-details"
            value={additionalDetails}
            maxLength={ADDITIONAL_DETAILS_MAX}
            rows={3}
            onChange={(e) => onUpdate({ additionalDetails: e.target.value })}
            placeholder="Add any notes (e.g., time, how you felt, etc.)"
            className="w-full resize-none rounded-xl border border-[#F1DDE8] bg-white px-3 py-2.5 text-[12.5px] text-[#17152B] placeholder:text-[#A0A6B8] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
          />
          <div className="text-right text-[10.5px] text-[#68708A] mt-1">
            {additionalDetails.length}/{ADDITIONAL_DETAILS_MAX}
          </div>
        </div>
      )}
    </section>
  );
};
