import React from 'react';
import { Thermometer, Activity, Smile, Zap, TrendingUp, TrendingDown, Minus, BatteryLow, BatteryMedium, BatteryFull } from 'lucide-react';
import moodHappy from '../../assets/mood_happy.png';
import moodCalm from '../../assets/mood_calm.png';
import moodNeutral from '../../assets/mood_neutral.png';
import moodIrritable from '../../assets/mood_irritable.png';
import moodSad from '../../assets/mood_sad.png';
import type { FollicularDailyLogData, FollicularEnergy, FollicularMood } from '../../types';
import { CARD, CLICKABLE, clickableProps } from './metricCardStyles';
import { CardHeader } from './MetricCardHeader';

interface LutealMetricCardsProps {
  /** Tracked values are null when nothing is logged for the day */
  bbtTempC: number | null;
  bbtBaseline: number | null;
  bbtPrevious: number | null;
  isToday: boolean;
  mood: FollicularMood | null;
  energyLevel: FollicularEnergy | null;
  periodLog?: FollicularDailyLogData['periodLog'];
  onOpenDailyLog: () => void;
}

const MOOD_INFO: Record<FollicularMood, { img: string; subtitle: string; badge: string }> = {
  Happy: { img: moodHappy, subtitle: 'Feeling positive today', badge: 'Balanced' },
  Calm: { img: moodCalm, subtitle: 'Progesterone can feel calming', badge: 'Balanced' },
  Neutral: { img: moodNeutral, subtitle: 'Steady and even today', badge: 'Balanced' },
  Irritable: { img: moodIrritable, subtitle: 'Common as your period nears', badge: 'PMS sign' },
  Sad: { img: moodSad, subtitle: 'Hormone dip can lower mood', badge: 'PMS sign' },
};

const ENERGY_INFO: Record<FollicularEnergy, { title: string; subtitle: string; level: number; Icon: typeof BatteryLow; color: string }> = {
  Low: { title: 'High Fatigue', subtitle: 'Rest and steady meals help', level: 1, Icon: BatteryLow, color: '#F43F5E' },
  Moderate: { title: 'Mild Fatigue', subtitle: 'Energy is steady for this phase', level: 2, Icon: BatteryMedium, color: '#F59E0B' },
  High: { title: 'Low Fatigue', subtitle: 'Well rested today', level: 3, Icon: BatteryFull, color: '#16A34A' },
};

// Soft round "illustration" slot so icon-based cards line up with the image-based ones
const IconArt: React.FC<{ children: React.ReactNode; bg: string }> = ({ children, bg }) => (
  <span
    aria-hidden="true"
    className={`absolute right-4 bottom-4 w-[clamp(64px,28%,96px)] aspect-square rounded-full flex items-center justify-center ${bg}`}
  >
    {children}
  </span>
);

/**
 * Luteal-phase Overview metrics. Same card system and grid as the follicular cards,
 * but every value is derived from the day's saved log (BBT, mood, energy, period log).
 */
export const LutealMetricCards: React.FC<LutealMetricCardsProps> = ({
  bbtTempC,
  bbtBaseline,
  bbtPrevious,
  isToday,
  mood,
  energyLevel,
  periodLog,
  onOpenDailyLog,
}) => {
  // --- BBT: after ovulation readings should sit above the follicular baseline ---
  const delta = bbtTempC !== null && bbtBaseline !== null ? bbtTempC - bbtBaseline : null;
  const trendDiff = bbtTempC !== null && bbtPrevious !== null ? bbtTempC - bbtPrevious : null;
  const trend = trendDiff === null ? null : trendDiff > 0.04 ? 'Rising' : trendDiff < -0.04 ? 'Falling' : 'Stable';
  const TrendIcon = trend === 'Rising' ? TrendingUp : trend === 'Falling' ? TrendingDown : Minus;
  const elevated = delta !== null ? delta >= 0.2 : bbtTempC !== null && bbtTempC >= 36.5;
  const inNormalRange = bbtTempC !== null && bbtTempC >= 35.8 && bbtTempC <= 37.3;

  // --- PMS symptoms: counted only from what was actually logged ---
  const loggedAnything = mood !== null || energyLevel !== null || !!periodLog;
  const symptoms: string[] = [];
  if (mood === 'Irritable' || mood === 'Sad') symptoms.push('Mood changes');
  if (energyLevel === 'Low') symptoms.push('Fatigue');
  if (periodLog && periodLog.cramps !== 'None') symptoms.push(`${periodLog.cramps} cramps`);
  const pmsTitle = loggedAnything ? ['None', 'Mild', 'Moderate', 'Noticeable'][symptoms.length] : 'Not logged';

  const moodInfo = mood !== null ? MOOD_INFO[mood] : null;
  const energy = energyLevel !== null ? ENERGY_INFO[energyLevel] : null;

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
              ? 'Not logged'
              : delta !== null
                ? `${delta < 0 ? '−' : '+'}${Math.abs(delta).toFixed(2)}°`
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
            <>No temperature logged {isToday ? 'today' : 'for this day'}. </>
          ) : delta !== null ? (
            <>
              {isToday ? "Today's" : "This day's"} reading is{' '}
              <strong className="text-[#17152B] font-semibold">{Math.abs(delta).toFixed(2)}°C</strong>{' '}
              {delta >= 0 ? 'above' : 'below'} your recent baseline.{' '}
            </>
          ) : (
            <>
              {isToday ? "Today's" : "This day's"} reading is{' '}
              <strong className="text-[#17152B] font-semibold">{bbtTempC?.toFixed(2)}°C</strong>.{' '}
            </>
          )}
          {elevated
            ? 'Progesterone keeps temperature raised after ovulation.'
            : 'A drop back to baseline often signals your period is near.'}
        </p>

        <div className={`mt-auto pt-3 ${bbtTempC === null ? 'hidden' : ''}`}>
          <span
            className={`text-[11px] sm:text-[12px] font-semibold px-3 py-1 rounded-full inline-block ${
              !inNormalRange ? 'bg-amber-50 text-amber-700' : elevated ? 'bg-[#FCE7F3] text-[#BE185D]' : 'bg-[#DCFCE7] text-[#15803D]'
            }`}
          >
            {!inNormalRange ? 'Check Reading' : elevated ? 'Luteal Rise' : 'Normal Range'}
          </span>
        </div>
      </div>

      {/* 2. PMS symptoms */}
      <div {...clickableProps(onOpenDailyLog, `PMS symptoms: ${pmsTitle}. Open Daily Log to update`)} className={`${CARD} ${CLICKABLE}`}>
        <div className="relative z-10">
          <CardHeader
            icon={<Activity className="w-3.5 h-3.5 stroke-[2.3]" />}
            iconBg="bg-[#FFF0F6] text-[#F43F8F]"
            title="PMS Symptoms"
          />
        </div>

        <div className="relative z-10 mt-3 max-w-[62%]">
          <span className="text-metric font-bold text-[#17152B] block">{pmsTitle}</span>
          <p className="text-body text-[#68708A] mt-1">
            {symptoms.length ? symptoms.join(' · ') : loggedAnything ? 'No PMS signs logged' : 'Add mood & energy in the Daily Log'}
          </p>
        </div>

        <p className="relative z-10 mt-auto pt-3 text-caption text-[#9CA3AF] max-w-[62%]">From logged mood, energy &amp; cramps</p>

        <IconArt bg="bg-gradient-to-br from-[#FFF0F6] to-[#FCE7F3]">
          <Activity className="w-1/2 h-1/2 text-[#EC4899]" strokeWidth={1.8} />
        </IconArt>
      </div>

      {/* 3. Mood */}
      <div {...clickableProps(onOpenDailyLog, `Mood: ${mood ?? 'not logged'}. Open Daily Log to update`)} className={`${CARD} ${CLICKABLE}`}>
        <div className="relative z-10 flex items-center justify-between gap-2">
          <CardHeader
            icon={<Smile className="w-3.5 h-3.5 stroke-[2.3]" />}
            iconBg="bg-[#F3E8FF] text-[#8B5CF6]"
            title="Mood"
          />
          {moodInfo && (
            <span className="bg-[#F3E8FF] text-[#8B5CF6] text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
              {moodInfo.badge}
            </span>
          )}
        </div>

        <div className="relative z-10 mt-3 max-w-[58%]">
          <span className="text-metric font-bold text-[#17152B] block">{mood ?? 'Not logged'}</span>
          <p className="text-body text-[#68708A] mt-1">{moodInfo ? moodInfo.subtitle : 'Add it in the Daily Log'}</p>
        </div>

        {moodInfo && (
          <img
            src={moodInfo.img}
            alt=""
            width={275}
            height={275}
            className="absolute right-4 bottom-4 w-[clamp(64px,28%,96px)] aspect-square rounded-full object-cover pointer-events-none select-none"
          />
        )}
      </div>

      {/* 4. Energy / fatigue */}
      <div
        {...clickableProps(onOpenDailyLog, `Fatigue level: ${energy?.title ?? 'not logged'}. Open Daily Log to update`)}
        className={`${CARD} ${CLICKABLE}`}
      >
        <div className="relative z-10">
          <CardHeader
            icon={<Zap className="w-3.5 h-3.5 stroke-[2.3]" />}
            iconBg="bg-[#FFF7ED] text-[#F59E0B]"
            title="Fatigue Level"
          />
        </div>

        <div className="relative z-10 mt-3 max-w-[62%]">
          <span className="text-metric font-bold text-[#17152B] block">{energy?.title ?? 'Not logged'}</span>
          <p className="text-body text-[#68708A] mt-1">{energy?.subtitle ?? 'Add your energy in the Daily Log'}</p>
        </div>

        {/* 3-step energy meter, mirrors the LH strip position on the follicular card */}
        <div className="relative z-10 mt-auto pt-3 flex items-center gap-1.5" aria-hidden="true">
          {[1, 2, 3].map((step) => (
            <span
              key={step}
              className="h-2 w-8 sm:w-9 rounded-full"
              style={{ backgroundColor: energy && step <= energy.level ? energy.color : '#F3F4F6' }}
            />
          ))}
        </div>

        <IconArt bg="bg-gradient-to-br from-[#FFF7ED] to-[#FEF3C7]">
          {energy ? (
            <energy.Icon className="w-1/2 h-1/2" style={{ color: energy.color }} strokeWidth={1.8} />
          ) : (
            <BatteryMedium className="w-1/2 h-1/2 text-[#D1D5DB]" strokeWidth={1.8} />
          )}
        </IconArt>
      </div>
    </div>
  );
};
