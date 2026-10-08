import React from 'react';
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

const SIZE = 160;
const STROKE = 16;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Four-stage tracker under the status text; the fertile window leads into ovulation
const STAGES = ['Period', 'Follicular', 'Ovulation', 'Luteal'] as const;
const STAGE_INDEX: Record<PhaseType, number> = { menstruation: 0, follicular: 1, fertile: 2, ovulation: 2, luteal: 3 };
const PINK = '#F43F8F';
const PURPLE = '#8B5CF6';

/**
 * Continuous cycle ring: the arc covers the share of the cycle that has elapsed (cycleDay / cycleLength),
 * so progress always reflects the real cycle day. Below it sits the Period → Ovulation → Luteal tracker.
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
  const stage = STAGE_INDEX[phase];
  const day = Math.min(Math.max(cycleDay, 1), cycleLength);
  const progress = (day / cycleLength) * CIRCUMFERENCE;

  return (
    <div
      className="relative overflow-hidden rounded-[26px] p-4 sm:p-5 lg:px-[clamp(1.25rem,2vw,2rem)] border border-white/70 shadow-[0_8px_24px_rgba(236,72,153,0.14)] flex items-center max-[359px]:flex-col max-[359px]:items-start gap-[clamp(1rem,1.8vw,1.75rem)] w-full max-w-none min-w-0 h-full lg:min-h-[clamp(172px,15vw,230px)]"
      style={{ '--ring': 'clamp(92px, 11vw, 168px)' } as React.CSSProperties}
    >
      <SoftFloralBackground />

      {/* Cycle ring (tap for the AI summary) */}
      <button
        type="button"
        onClick={onSummaryClick}
        aria-label={`Cycle day ${day} of ${cycleLength}, ${phaseName}. Show AI summary`}
        className="relative z-10 shrink-0 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
        style={{ width: 'var(--ring)', height: 'var(--ring)' }}
      >
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
          <defs>
            <linearGradient id="ring-gradient" gradientUnits="userSpaceOnUse" x1="0" y1={SIZE} x2={SIZE} y2="0">
              <stop offset="0" stopColor={PINK} />
              <stop offset="1" stopColor={PURPLE} />
            </linearGradient>
          </defs>
          <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS - STROKE / 2} fill="#FFFFFF" fillOpacity="0.72" />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={isFollicular ? '#E7D3F7' : accent.track}
            strokeWidth={STROKE}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={isFollicular ? 'url(#ring-gradient)' : accent.ring}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${progress} ${CIRCUMFERENCE}`}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center" aria-hidden="true">
          <span className="font-bold text-[#17152B] leading-none" style={{ fontSize: 'calc(var(--ring) * 0.3)' }}>
            {day}
          </span>
          <span
            className="font-semibold uppercase tracking-[0.12em] text-[#4B4A68] mt-[6%]"
            style={{ fontSize: 'max(8px, calc(var(--ring) * 0.075))' }}
          >
            Cycle Day
          </span>
        </div>
      </button>

      {/* Status text with the phase tracker underneath */}
      <div className="relative z-10 flex flex-col justify-center text-left min-w-0 flex-1 max-[359px]:w-full">
        <span className="text-[10px] sm:text-[11px] lg:text-[clamp(0.7rem,0.9vw,0.85rem)] font-medium uppercase tracking-[0.16em] text-[#6B6A85] leading-tight">
          Status
        </span>
        <h3 className="text-[clamp(1.05rem,1.7vw,1.6rem)] font-bold text-[#17152B] leading-tight mt-1 truncate">{phaseName}</h3>
        <span
          className="text-[clamp(0.95rem,1.4vw,1.35rem)] font-semibold leading-tight mt-0.5"
          style={{ color: isFollicular ? PINK : accent.text }}
        >
          {statusText}
        </span>

        {/* Phase progress: Period → Follicular → Ovulation → Luteal */}
        <ol aria-label="Cycle phase progress" className="relative grid grid-cols-4 w-full list-none m-0 p-0 mt-[clamp(0.75rem,1.4vw,1.5rem)]">
          <span aria-hidden="true" className="absolute top-[8px] left-[12.5%] right-[12.5%] h-[4px] -mt-[2px] rounded-full bg-[#E4D3F6]" />
          <span
            aria-hidden="true"
            className="absolute top-[8px] left-[12.5%] h-[4px] -mt-[2px] rounded-full"
            style={{ width: `${(stage / 3) * 75}%`, background: `linear-gradient(90deg, ${PINK}, ${PURPLE})` }}
          />
          {STAGES.map((label, i) => {
            const isCurrent = i === stage;
            const reached = i < stage;
            return (
              <li key={label} className="relative flex flex-col items-center min-w-0" aria-current={isCurrent ? 'step' : undefined}>
                <span
                  aria-hidden="true"
                  className="relative block rounded-full"
                  style={{
                    width: 16,
                    height: 16,
                    background: isCurrent ? '#FFFFFF' : reached ? PINK : '#B79BF3',
                    border: isCurrent ? `4px solid ${PINK}` : '2px solid #FFFFFF',
                    boxShadow: isCurrent ? '0 0 0 3px rgba(244,63,143,0.16)' : '0 1px 3px rgba(139,92,246,0.25)',
                  }}
                />
                <span
                  className={`mt-1.5 text-[9.5px] sm:text-[10.5px] lg:text-[clamp(0.65rem,0.85vw,0.8rem)] leading-tight truncate max-w-full ${
                    isCurrent ? 'font-bold text-[#17152B]' : 'font-medium text-[#7A7894]'
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
