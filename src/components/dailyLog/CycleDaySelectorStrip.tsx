import React from 'react';
import { ChevronLeft, ChevronRight, Droplet } from 'lucide-react';
import type { CycleDay } from '../../types';
import { MONTH_FULL_NAMES, PHASE_LABELS, WEEKDAY_NAMES, parseDateKey } from '../../utils/calendarUtils';

interface CycleDaySelectorStripProps {
  /** Consecutive days centred on the selected date */
  days: CycleDay[];
  selectedDate: Date;
  cycleDay: number;
  phaseLabel: string;
  todayKey: string;
  onSelectDay: (day: CycleDay) => void;
  onPrevDay: () => void;
  onNextDay: () => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onTodayClick: () => void;
}

const LEGEND = [
  { label: 'Follicular Phase', dot: 'border-2 border-[#E5E7EB]' },
  { label: 'Logged', dot: 'bg-[#D1D5DB]' },
];

const PhaseIndicator: React.FC<{ day: CycleDay; selected: boolean }> = ({ day, selected }) => {
  if (day.phase === 'menstruation') {
    return <Droplet className={`w-3 h-3 ${selected ? 'text-white' : 'text-[#F87171]'}`} strokeWidth={2.4} />;
  }
  const base = 'w-2.5 h-2.5 rounded-full';
  if (selected) return <span className={`${base} bg-white/90`} />;
  if (day.phase === 'fertile') return <span className={`${base} border-2 border-[#60A5FA]`} />;
  if (day.phase === 'ovulation') return <span className={`${base} bg-[#4ADE80]`} />;
  if (day.phase === 'luteal') return <span className={`${base} bg-[#C084FC]`} />;
  return <span className={`${base} ${day.isLogged ? 'bg-[#D1D5DB]' : 'border-2 border-[#E5E7EB]'}`} />;
};

const ArrowButton: React.FC<{ onClick: () => void; label: string; dir: 'left' | 'right'; size?: 'sm' | 'md' }> = ({
  onClick,
  label,
  dir,
  size = 'md',
}) => {
  const Icon = dir === 'left' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`${size === 'sm' ? 'w-8 h-8' : 'w-6 h-9 sm:w-9'} shrink-0 rounded-full text-[#9CA3AF] hover:bg-[#FFF0F6] hover:text-[#F43F8F] flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
};

export const CycleDaySelectorStrip: React.FC<CycleDaySelectorStripProps> = ({
  days,
  selectedDate,
  cycleDay,
  phaseLabel,
  todayKey,
  onSelectDay,
  onPrevDay,
  onNextDay,
  onPrevMonth,
  onNextMonth,
  onTodayClick,
}) => {
  const weekdayName = WEEKDAY_NAMES[selectedDate.getDay()];
  const monthFullName = MONTH_FULL_NAMES[selectedDate.getMonth()];
  const selectedKey = days.find((d) => d.isSelected)?.id;
  const isToday = selectedKey === todayKey;
  const lastIndex = days.length - 1;

  return (
    <section
      aria-label="Select log date"
      className="w-full bg-white rounded-[22px] px-3 py-4 sm:p-5 border border-[#F1DDE8]/70 shadow-2xs text-left"
    >
      {/* Top Row: Title & Subtitle + Month/Today Navigation */}
      <div className="flex items-start justify-between gap-2.5 mb-3 sm:mb-4 px-1 sm:px-0">
        <div className="min-w-0">
          <h2 className="text-section-title font-bold text-[#17152B]">
            Cycle Day <span className="text-[#F472B6]">{cycleDay}</span>
          </h2>
          <p className="text-caption text-[#68708A] mt-1" aria-live="polite">
            {isToday ? 'Today · ' : ''}
            {weekdayName}, {monthFullName} {selectedDate.getDate()}, {selectedDate.getFullYear()} · {phaseLabel}
          </p>
        </div>

        {/* Month navigation with Today in between */}
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          <ArrowButton onClick={onPrevMonth} label="Previous month" dir="left" size="sm" />
          <button
            type="button"
            onClick={onTodayClick}
            aria-pressed={isToday}
            className={`px-3.5 py-1.5 rounded-full text-[12px] sm:text-[13px] font-medium transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
              isToday ? 'bg-[#FFF0F6] text-[#F43F8F]' : 'bg-white border border-[#F1DDE8] text-[#F43F8F] hover:bg-[#FFF0F6]'
            }`}
          >
            Today
          </button>
          <ArrowButton onClick={onNextMonth} label="Next month" dir="right" size="sm" />
        </div>
      </div>

      {/* Day strip: 5 cells on phones, 7 from sm up */}
      <div className="flex items-center gap-1 sm:gap-2 w-full">
        <ArrowButton onClick={onPrevDay} label="Previous day" dir="left" />

        <div className="grid gap-0.5 sm:gap-2 flex-1 min-w-0" style={{ gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))` }}>
          {days.map((day, index) => {
            const isSelected = !!day.isSelected;
            const date = parseDateKey(day.id);
            const edgeCell = index === 0 || index === lastIndex;
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => onSelectDay(day)}
                aria-pressed={isSelected}
                aria-current={day.id === todayKey ? 'date' : undefined}
                aria-label={`${date ? `${WEEKDAY_NAMES[date.getDay()]}, ${MONTH_FULL_NAMES[date.getMonth()]} ${day.dayNumber}` : day.id}, cycle day ${day.cycleDay}, ${PHASE_LABELS[day.phase]}`}
                className={`${edgeCell ? 'hidden sm:flex' : 'flex'} mx-auto w-full max-w-[92px] sm:aspect-square min-h-[80px] sm:min-h-0 flex-col items-center justify-center gap-0.5 py-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-1 ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#FF6FB5] to-[#F43F8F] text-white shadow-[0_6px_18px_rgba(244,63,143,0.35)]'
                    : 'hover:bg-[#FFF5FA]'
                }`}
              >
                <span className={`text-[10px] sm:text-[11px] font-medium ${isSelected ? 'text-white/90' : 'text-[#9CA3AF]'}`}>
                  {day.month}
                </span>
                <span className={`text-[16px] sm:text-[18px] leading-tight font-semibold ${isSelected ? 'text-white' : 'text-[#17152B]'}`}>
                  {day.dayNumber}
                </span>
                <span className={`text-[9px] sm:text-[10px] font-medium uppercase ${isSelected ? 'text-white/90' : 'text-[#9CA3AF]'}`}>
                  CD {day.cycleDay}
                </span>
                <span className="mt-1 h-3 flex items-center justify-center" aria-hidden="true">
                  <PhaseIndicator day={day} selected={isSelected} />
                </span>
              </button>
            );
          })}
        </div>

        <ArrowButton onClick={onNextDay} label="Next day" dir="right" />
      </div>

      {/* Legend */}
      <ul className="flex items-center gap-x-4 gap-y-1.5 pt-3 mt-2 px-1 sm:px-0 text-[10.5px] sm:text-[11px] text-[#68708A] flex-wrap">
        {LEGEND.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${item.dot}`} aria-hidden="true" />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
