import React from 'react';
import { PHASE_RANGES } from '../../utils/calendarUtils';
import type { PhaseType } from '../../types';
import { SoftFloralBackground } from './SoftFloralBackground';

interface CyclePhaseStatusProps {
  cycleDay: number;
  cycleLength: number;
  phaseName: string;
  phase: PhaseType;
  statusText?: string;
  /** Phase colours for the ring and status text (follicular uses the pink→purple gradient instead) */
  accent: { ring: string; track: string; text: string };
  onSummaryClick?: () => void;
}

const SIZE = 96;
const STROKE = 9;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
// Space reserved between phase arcs: covers both round caps (STROKE) plus a visible 4px gap
const GAP = STROKE + 4;

// Four-stage tracker under the ring; the fertile window leads into ovulation
const STAGES = ['Period', 'Follicular', 'Ovulation', 'Luteal'] as const;
const STAGE_INDEX: Record<PhaseType, number> = { menstruation: 0, follicular: 1, fertile: 2, ovulation: 2, luteal: 3 };
const PINK = '#F43F8F';
const PURPLE = '#8B5CF6';

/**
 * Ring made of one arc per cycle phase (menstrual, follicular, fertile, ovulation, luteal),
 * each sized by its share of the cycle. Days already elapsed are drawn in the phase colour and
 * the remainder in its soft tint, so progress always reflects the real cycle day.
 */
export const CyclePhaseStatus: React.FC<CyclePhaseStatusProps> = ({
  cycleDay,
  cycleLength,
  phaseName,
  phase,
  statusText = 'Healthy',
  accent,
  onSummaryClick,
}) => {
  const isFollicular = phase === 'follicular';
  const fillColor = isFollicular ? 'url(#ring-gradient)' : accent.ring;
  const trackColor = isFollicular ? '#EFE3FB' : accent.track;
  const stage = STAGE_INDEX[phase];
  const day = Math.min(Math.max(cycleDay, 1), cycleLength);
  const dayLen = CIRCUMFERENCE / cycleLength;

  const arcs = PHASE_RANGES.flatMap(({ phase: p, start, end }) => {
    const segStart = (start - 1) * dayLen;
    const segEnd = Math.min(end, cycleLength) * dayLen - GAP;
    const filledEnd = Math.min(segEnd, day * dayLen - (day >= end ? GAP : 0));
    const out = [{ key: `${p}-track`, from: segStart, to: segEnd, color: trackColor }];
    if (filledEnd > segStart) out.push({ key: `${p}-fill`, from: segStart, to: filledEnd, color: fillColor });
    return out;
  });

  return (
    <div className="relative overflow-hidden rounded-[22px] p-4 sm:p-5 border border-[#F1DDE8]/70 shadow-2xs flex items-center gap-4 sm:gap-5 w-full max-w-none min-w-0 h-full">
      <SoftFloralBackground />

        {/* Segmented cycle ring (tap for the AI summary) */}
        <button
          type="button"
          onClick={onSummaryClick}
          aria-label={`Cycle day ${day} of ${cycleLength}, ${phaseName}. Show AI summary`}
          className="relative z-10 w-[84px] h-[84px] sm:w-[96px] sm:h-[96px] shrink-0 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
        >
          <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
            <defs>
              <linearGradient id="ring-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={SIZE} y2={SIZE}>
                <stop offset="0" stopColor={PINK} />
                <stop offset="1" stopColor={PURPLE} />
              </linearGradient>
            </defs>
            <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS - STROKE / 2} fill="#FFFFFF" />
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
        </button>

        {/* Status text with the phase tracker underneath */}
        <div className="relative z-10 flex flex-col justify-center text-left min-w-0 flex-1">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B5CF6]/80 leading-tight">
            Status
          </span>
          <h3 className="text-section-title font-bold text-[#17152B] mt-1 truncate">{phaseName}</h3>
          <span className="text-card-title font-semibold leading-tight mt-0.5" style={{ color: isFollicular ? PINK : accent.text }}>
            {statusText}
          </span>

      {/* Phase progress: Period → Follicular → Ovulation → Luteal */}
      <ol aria-label="Cycle phase progress" className="grid grid-cols-4 w-full max-w-[300px] list-none m-0 p-0 mt-3.5">
        {STAGES.map((label, i) => {
          const isCurrent = i === stage;
          const reached = i <= stage;
          return (
            <li key={label} className="relative flex flex-col items-center min-w-0" aria-current={isCurrent ? 'step' : undefined}>
              {i < STAGES.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-[7px] left-1/2 w-full h-[2px] rounded-full"
                  style={{ background: i < stage ? `linear-gradient(90deg, ${PINK}, ${PURPLE})` : '#E4D7F5' }}
                />
              )}
              <span
                aria-hidden="true"
                className="relative z-10 block rounded-full"
                style={{
                  width: isCurrent ? 14 : 10,
                  height: isCurrent ? 14 : 10,
                  marginTop: isCurrent ? 0 : 2,
                  background: isCurrent ? '#FFFFFF' : reached ? PINK : '#C4B5FD',
                  border: isCurrent ? `3px solid ${PINK}` : 'none',
                  boxShadow: isCurrent ? '0 0 0 3px rgba(244,63,143,0.15)' : undefined,
                }}
              />
              <span
                className={`mt-1.5 text-[9px] sm:text-[10px] leading-tight truncate max-w-full ${
                  isCurrent ? 'font-bold text-[#17152B]' : 'font-medium text-[#8A8FA6]'
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
        </div>
    </div>
  );
};
