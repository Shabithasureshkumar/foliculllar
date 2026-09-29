import React from 'react';
import { Sparkles } from 'lucide-react';
import { PHASE_RANGES } from '../../utils/calendarUtils';

interface CyclePhaseStatusProps {
  cycleDay: number;
  cycleLength: number;
  phaseName: string;
  statusText?: string;
  /** Phase colours for the ring and status text */
  accent: { ring: string; track: string; text: string };
  onSummaryClick?: () => void;
}

const SIZE = 96;
const STROKE = 7;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
// Space reserved between phase arcs: covers both round caps (STROKE) plus a visible 5px gap
const GAP = STROKE + 5;

/**
 * Ring made of one arc per cycle phase (menstrual, follicular, fertile, ovulation, luteal),
 * each sized by its share of the cycle. Days already elapsed are drawn in the phase colour and
 * the remainder in its soft tint, so progress always reflects the real cycle day.
 */
export const CyclePhaseStatus: React.FC<CyclePhaseStatusProps> = ({
  cycleDay,
  cycleLength,
  phaseName,
  statusText = 'Healthy',
  accent,
  onSummaryClick,
}) => {
  const day = Math.min(Math.max(cycleDay, 1), cycleLength);
  const dayLen = CIRCUMFERENCE / cycleLength;

  const arcs = PHASE_RANGES.flatMap(({ phase, start, end }) => {
    const segStart = (start - 1) * dayLen;
    const segEnd = Math.min(end, cycleLength) * dayLen - GAP;
    const filledEnd = Math.min(segEnd, day * dayLen - (day >= end ? GAP : 0));
    const out = [{ key: `${phase}-track`, from: segStart, to: segEnd, color: accent.track }];
    if (filledEnd > segStart) out.push({ key: `${phase}-fill`, from: segStart, to: filledEnd, color: accent.ring });
    return out;
  });

  return (
    <div className="bg-white rounded-[22px] p-4 sm:p-5 border border-[#F1DDE8]/70 shadow-2xs flex items-center gap-4 sm:gap-5 w-full max-w-none min-w-0 h-full">
      {/* Segmented cycle ring */}
      <div
        className="relative w-[84px] h-[84px] sm:w-[96px] sm:h-[96px] shrink-0 flex items-center justify-center"
        role="img"
        aria-label={`Cycle day ${day} of ${cycleLength}, ${phaseName}`}
      >
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
          {arcs.map((a) => (
            <circle
              key={a.key}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={a.color}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={`${Math.max(a.to - a.from, 0.01)} ${CIRCUMFERENCE}`}
              strokeDashoffset={-a.from}
            />
          ))}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center" aria-hidden="true">
          <span className="text-[24px] sm:text-[28px] font-bold text-[#17152B] leading-none">{day}</span>
          <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wide text-[#68708A] mt-1">
            Cycle Day
          </span>
        </div>
      </div>

      {/* Right Status Information */}
      <div className="flex flex-col justify-center text-left min-w-0">
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#68708A] leading-tight">
          Status
        </span>
        <h3 className="text-section-title font-bold text-[#17152B] mt-1 truncate">
          {phaseName}
        </h3>
        <span className="text-section-title font-semibold leading-tight mt-0.5" style={{ color: accent.text }}>
          {statusText}
        </span>

        {/* AI Summary Ready Pill Button */}
        <button
          type="button"
          onClick={onSummaryClick}
          className="inline-flex items-center gap-1 mt-2.5 px-3 py-1 rounded-full bg-[#F5EEFF] border border-[#EDE4FF] text-[11px] sm:text-[12px] font-medium text-[#8B5CF6] hover:bg-[#EDE4FF] transition-all self-start focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
        >
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>AI Summary Ready</span>
        </button>
      </div>
    </div>
  );
};
