import React from 'react';
import { Heart } from 'lucide-react';
import { PROTECTION_LABELS, PROTECTION_OPTIONS } from '../../data/intercourse';
import { ADDITIONAL_DETAILS_MAX } from '../../services/cycleStore';
import type { FollicularDailyLogData, IntercourseAnswer, ProtectionMethod } from '../../types';

interface IntercourseSectionProps {
  intercourse: IntercourseAnswer | null;
  protectionMethod: ProtectionMethod | null;
  additionalDetails: string;
  onUpdate: (updated: Partial<FollicularDailyLogData>) => void;
}

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

  const pill = (selected: boolean, extra = '') =>
    `rounded-full border text-[13px] font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${extra} ${
      selected
        ? 'bg-[#F43F8F] border-[#F43F8F] text-white shadow-2xs'
        : 'bg-white border-[#F1DDE8] text-[#17152B] hover:bg-gray-50'
    }`;

  return (
    <section
      aria-labelledby="intercourse-title"
      className="w-full bg-white rounded-[24px] p-4 sm:p-5 border border-[#F1DDE8]/70 shadow-sm text-left"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center shrink-0">
          <Heart className="w-5 h-5 fill-[#F43F8F]" />
        </div>
        <div className="min-w-0">
          <h3 id="intercourse-title" className="text-card-title font-bold text-[#17152B] leading-tight">
            Intercourse
          </h3>
          <p className="text-[12px] text-[#68708A] mt-0.5">Log your activity to better understand your fertile window</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
        <span id="intercourse-question" className="text-[13px] font-medium text-[#17152B]">
          Did you have intercourse today?
        </span>
        <div role="group" aria-labelledby="intercourse-question" className="flex gap-2">
          <button
            type="button"
            aria-pressed={intercourse === 'yes'}
            data-testid="intercourse-yes"
            onClick={() => answer('yes')}
            className={pill(intercourse === 'yes', 'px-6 py-2')}
          >
            Yes
          </button>
          <button
            type="button"
            aria-pressed={intercourse === 'no'}
            data-testid="intercourse-no"
            onClick={() => answer('no')}
            className={pill(intercourse === 'no', 'px-6 py-2')}
          >
            No
          </button>
        </div>
      </div>

      {intercourse === 'yes' && (
        <div className="mt-4">
          <span id="protection-label" className="text-[13px] font-medium text-[#17152B] block mb-2.5">
            Protection / contraception method
          </span>
          <div role="group" aria-labelledby="protection-label" className="flex flex-wrap gap-2">
            {PROTECTION_OPTIONS.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={protectionMethod === value}
                data-testid={`protection-${value}`}
                onClick={() => selectMethod(value)}
                className={pill(protectionMethod === value, 'px-5 py-2')}
              >
                {PROTECTION_LABELS[value]}
              </button>
            ))}
          </div>
        </div>
      )}

      {intercourse === 'yes' && protectionMethod === 'other' && (
        <div className="mt-4">
          <label htmlFor="intercourse-details" className="text-[13px] font-medium text-[#17152B] block mb-2">
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
