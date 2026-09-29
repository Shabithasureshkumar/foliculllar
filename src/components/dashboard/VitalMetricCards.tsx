import React from 'react';
import { Thermometer, Droplet, TestTube, Heart, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import mucusFingers from '../../assets/cervical_mucus_fingers.png';
import lhTestStick from '../../assets/lh_test_device.png';
import libidoHeart from '../../assets/libido_heart.png';
import type { CervicalMucusType, LhTestResult, LibidoLevel } from '../../types';
import { CARD, CLICKABLE, clickableProps } from './metricCardStyles';
import { CardHeader } from './MetricCardHeader';

interface VitalMetricCardsProps {
  /** Tracked values are null when nothing is logged for the day */
  bbtTempC: number | null;
  /** Mean of recent earlier readings; null until there is history */
  bbtBaseline: number | null;
  /** Most recent earlier reading, for the trend badge */
  bbtPrevious: number | null;
  bbtPhaseNote: string;
  /** Whether the viewed date is today (affects wording only) */
  isToday: boolean;
  selectedMucus: CervicalMucusType | null;
  lhTest: LhTestResult | null;
  libido: LibidoLevel | null;
  /** Receives null when the selected pill is clicked again (clears it) */
  onSelectMucus: (mucus: CervicalMucusType | null) => void;
  onOpenDailyLog: () => void;
}

const MUCUS_OPTIONS: Array<{ type: CervicalMucusType; label: string; full: string }> = [
  { type: 'dry', label: 'Dry', full: 'Dry' },
  { type: 'sticky', label: 'Sticky', full: 'Sticky' },
  { type: 'creamy', label: 'Creamy', full: 'Creamy' },
  { type: 'watery', label: 'Watery', full: 'Watery' },
  { type: 'egg_white', label: 'EW', full: 'Egg white' },
];

const MUCUS_INFO: Record<CervicalMucusType, { title: string; subtitle: string; badge: string }> = {
  egg_white: { title: 'Egg white', subtitle: 'Stretchy, clear consistency', badge: 'Peak fertility' },
  creamy: { title: 'Creamy', subtitle: 'Lotion-like consistency', badge: 'Transitional' },
  watery: { title: 'Watery', subtitle: 'Clear & fluid consistency', badge: 'High fertility' },
  sticky: { title: 'Sticky', subtitle: 'Adhesive, tacky consistency', badge: 'Low fertility' },
  dry: { title: 'Dry', subtitle: 'Minimal moisture', badge: 'Low fertility' },
};

const LH_INFO: Record<LhTestResult, { title: string; subtitle: string; testLine: number }> = {
  negative: { title: 'Negative', subtitle: 'Low LH level', testLine: 0 },
  low: { title: 'Low', subtitle: '10–25 mIU level', testLine: 0.35 },
  high: { title: 'High', subtitle: '25–40 mIU surge', testLine: 0.7 },
  peak: { title: 'Peak', subtitle: '≥ 40 mIU peak LH', testLine: 1 },
};

const LIBIDO_INFO: Record<LibidoLevel, { title: string; subtitle: string }> = {
  low: { title: 'Low', subtitle: 'Calm & resting' },
  medium: { title: 'Moderate', subtitle: 'Normal for this phase' },
  high: { title: 'High', subtitle: 'Surging drive' },
};

// Shown instead of a value when the day has nothing logged for that metric
const NOT_LOGGED = { title: 'Not logged', subtitle: 'Add it in the Daily Log' };

export const VitalMetricCards: React.FC<VitalMetricCardsProps> = ({
  bbtTempC,
  bbtBaseline,
  bbtPrevious,
  bbtPhaseNote,
  isToday,
  selectedMucus,
  lhTest,
  libido,
  onSelectMucus,
  onOpenDailyLog,
}) => {
  const delta = bbtTempC !== null && bbtBaseline !== null ? bbtTempC - bbtBaseline : null;
  const trendDiff = bbtTempC !== null && bbtPrevious !== null ? bbtTempC - bbtPrevious : null;
  const trend =
    trendDiff === null ? null : trendDiff > 0.04 ? 'Rising' : trendDiff < -0.04 ? 'Falling' : 'Stable';
  const inNormalRange = bbtTempC !== null && bbtTempC >= 35.8 && bbtTempC <= 37.3;
  const shiftDetected = delta !== null && delta >= 0.3;

  const mucus = selectedMucus !== null ? MUCUS_INFO[selectedMucus] : null;
  const lh = lhTest !== null ? LH_INFO[lhTest] : { ...NOT_LOGGED, testLine: 0 };
  const lib = libido !== null ? LIBIDO_INFO[libido] : NOT_LOGGED;

  const TrendIcon = trend === 'Rising' ? TrendingUp : trend === 'Falling' ? TrendingDown : Minus;

  return (
    <div className="grid grid-cols-1 min-[560px]:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 w-full max-w-none items-stretch">
      {/* 1. Basal body temp */}
      <div {...clickableProps(onOpenDailyLog, 'Basal body temperature. Open Daily Log to update')} className={`${CARD} ${CLICKABLE}`}>
        <CardHeader
          icon={<Thermometer className="w-3.5 h-3.5 stroke-[2.3]" />}
          iconBg="bg-[#EFF6FF] text-[#3B82F6]"
          title="Basal body temp"
        />

        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-3">
          <span className="text-metric font-bold text-[#17152B]">
            {bbtTempC === null
              ? NOT_LOGGED.title
              : delta !== null
                ? `${delta < 0 ? '−' : ''}${Math.abs(delta).toFixed(2)}°`
                : `${bbtTempC.toFixed(2)}°`}
          </span>
          {trend && (
            <span
              className={`text-[11px] font-semibold flex items-center gap-0.5 ${
                trend === 'Rising' ? 'text-[#16A34A]' : trend === 'Falling' ? 'text-[#2563EB]' : 'text-[#68708A]'
              }`}
            >
              <TrendIcon className="w-3 h-3" /> {trend}
            </span>
          )}
        </div>

        <p className="text-caption text-[#68708A] mt-2">
          {bbtTempC === null ? (
            <>No temperature logged {isToday ? 'today' : 'for this day'}. Take it right after waking, before getting up.</>
          ) : delta !== null ? (
            <>
              Your body temperature is{' '}
              <strong className="text-[#17152B] font-semibold">{Math.abs(delta).toFixed(2)}°C</strong>{' '}
              {delta >= 0 ? 'above' : 'below'} your baseline.{' '}
              {shiftDetected ? 'A sustained shift like this may indicate ovulation has occurred.' : bbtPhaseNote}
            </>
          ) : (
            <>
              {isToday ? "Today's" : "This day's"} reading is <strong className="text-[#17152B] font-semibold">{bbtTempC.toFixed(2)}°C</strong>. Log a
              few more mornings to set your baseline. {bbtPhaseNote}
            </>
          )}
        </p>

        {bbtTempC !== null && (
          <div className="mt-auto pt-3">
            <span
              className={`text-[11px] sm:text-[12px] font-semibold px-3 py-1 rounded-full inline-block ${
                inNormalRange ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-amber-50 text-amber-700'
              }`}
            >
              {inNormalRange ? 'Normal Range' : 'Check Reading'}
            </span>
          </div>
        )}
      </div>

      {/* 2. Cervical mucus (pills select directly; they write to the same daily log) */}
      <div className={CARD}>
        <div className="flex items-center justify-between gap-2 relative z-10">
          <CardHeader
            icon={<Droplet className="w-3.5 h-3.5 stroke-[2.3]" />}
            iconBg="bg-[#FFF0F6] text-[#F43F8F]"
            title="Cervical mucus"
          />
          {mucus && (
            <span className="bg-[#F9A8D4]/60 text-[#BE185D] text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
              {mucus.badge}
            </span>
          )}
        </div>

        <div className="relative z-10 mt-3 max-w-[62%]">
          <span className="text-metric font-bold text-[#17152B] block">{(mucus ?? NOT_LOGGED).title}</span>
          <p className="text-caption text-[#68708A] mt-1">{mucus ? mucus.subtitle : 'Choose a type below'}</p>
        </div>

        <div
          role="group"
          aria-label="Cervical mucus type"
          className="relative z-10 flex flex-wrap items-center gap-1.5 mt-auto pt-3 max-w-[66%]"
        >
          {MUCUS_OPTIONS.map((opt) => {
            const isSelected = selectedMucus === opt.type;
            return (
              <button
                key={opt.type}
                type="button"
                aria-pressed={isSelected}
                aria-label={opt.full}
                onClick={() => onSelectMucus(isSelected ? null : opt.type)}
                className={`min-h-6 px-2 py-1 rounded-md text-[10.5px] font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
                  isSelected ? 'bg-[#F472B6] text-white shadow-2xs' : 'bg-[#F3F4F6] text-[#374151] hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <img
          src={mucusFingers}
          alt=""
          width={571}
          height={816}
          className="absolute right-0 bottom-0 w-[34%] max-w-[120px] h-auto max-h-[78%] object-contain object-right-bottom pointer-events-none select-none"
        />
      </div>

      {/* 3. LH Ovulation Test */}
      <div {...clickableProps(onOpenDailyLog, `LH ovulation test: ${lh.title}. Open Daily Log to update`)} className={`${CARD} ${CLICKABLE}`}>
        <div className="relative z-10">
          <CardHeader
            icon={<TestTube className="w-3.5 h-3.5 stroke-[2.3]" />}
            iconBg="bg-[#ECFEFF] text-[#06B6D4]"
            title="LH Ovulation Test"
          />
        </div>

        <div className="relative z-10 mt-3 max-w-[62%]">
          <span className="text-metric font-bold text-[#17152B] block">{lh.title}</span>
          <p className="text-body text-[#68708A] mt-1">{lh.subtitle}</p>
        </div>

        {/* Test strip: control line always visible, test line intensity follows the result */}
        <div
          className="relative z-10 mt-auto pt-3"
          aria-hidden="true"
        >
          <div className="w-24 sm:w-28 h-8 rounded-xl border-2 border-gray-200 bg-white flex items-center gap-3 px-3">
            <span className="w-2 h-5 rounded-full bg-[#F43F8F]" />
            <span className="w-2 h-5 rounded-full bg-[#F43F8F]" style={{ opacity: lh.testLine }} />
          </div>
        </div>

        <img
          src={lhTestStick}
          alt=""
          width={592}
          height={724}
          className="absolute right-1 bottom-1 w-[34%] max-w-[120px] h-auto max-h-[88%] object-contain object-right-bottom pointer-events-none select-none"
        />
      </div>

      {/* 4. Libido */}
      <div {...clickableProps(onOpenDailyLog, `Libido: ${lib.title}. Open Daily Log to update`)} className={`${CARD} ${CLICKABLE}`}>
        <div className="relative z-10">
          <CardHeader
            icon={<Heart className="w-3.5 h-3.5 fill-[#F43F8F] stroke-[2.3]" />}
            iconBg="bg-[#FFF0F6] text-[#F43F8F]"
            title="Libido"
          />
        </div>

        <div className="relative z-10 mt-3 max-w-[58%]">
          <span className="text-metric font-bold text-[#17152B] block">{lib.title}</span>
          <p className="text-body text-[#68708A] mt-1">{lib.subtitle}</p>
        </div>

        <img
          src={libidoHeart}
          alt=""
          width={624}
          height={544}
          className="absolute right-1 bottom-1 w-[42%] max-w-[150px] h-auto max-h-[80%] object-contain object-right-bottom pointer-events-none select-none"
        />
      </div>
    </div>
  );
};
