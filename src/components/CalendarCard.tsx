import React from 'react';
import { ChevronLeft, ChevronRight, Droplets } from 'lucide-react';
import type { CycleDay } from '../types';

interface CalendarCardProps {
  days: CycleDay[];
  selectedDayId: string;
  onSelectDay: (day: CycleDay) => void;
  onOpenMonthPicker: () => void;
  onPrevPeriod: () => void;
  onNextPeriod: () => void;
  onTodayClick: () => void;
}

export const CalendarCard: React.FC<CalendarCardProps> = ({
  days,
  selectedDayId,
  onSelectDay,
  onOpenMonthPicker,
  onPrevPeriod,
  onNextPeriod,
  onTodayClick,
}) => {
  return (
    <section
      aria-label="Cycle Calendar Bar"
      className="bg-white rounded-[clamp(1rem,2vw,1.2rem)] p-[clamp(0.875rem,1.8vw,1.2rem)] border border-[#F3F4F6] shadow-card w-full min-w-0"
    >
      {/* Header Row */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
        <button
          type="button"
          onClick={onOpenMonthPicker}
          className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none focus:ring-2 focus:ring-brand-pink/30 rounded-xl p-1 -m-1 transition-all min-h-[44px]"
          aria-label="Open Calendar Month Picker"
        >
          <div className="w-6 h-6 rounded-full bg-[#EF4486] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
            <div className="w-3 h-3 rounded-full bg-white" />
          </div>
          <span className="text-[#1F2937] font-bold text-[clamp(0.95rem,1.3vw,1.05rem)] leading-[1.5] group-hover:text-[#EF4486] transition-colors">
            Calender
          </span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <button
            type="button"
            onClick={onPrevPeriod}
            className="w-[clamp(32px,2.5vw,36px)] h-[clamp(32px,2.5vw,36px)] min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 rounded-[9.6px] flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-pink/30"
            aria-label="Previous day range"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onTodayClick}
            className="h-[clamp(32px,2.5vw,36.4px)] px-[clamp(0.6rem,1.2vw,0.9rem)] rounded-[18px] bg-[#FAF5FF] hover:bg-[#F3E8FF] transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-rose/40 active:scale-95 min-h-[44px] sm:min-h-0"
          >
            <span className="text-[clamp(0.8rem,1vw,0.9rem)] font-semibold leading-[1.5] text-gradient-pink select-none">
              Today
            </span>
          </button>

          <button
            type="button"
            onClick={onNextPeriod}
            className="w-[clamp(32px,2.5vw,36px)] h-[clamp(32px,2.5vw,36px)] min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 rounded-[9.6px] flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-pink/30"
            aria-label="Next day range"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Date Carousel Strip */}
      <div className="flex items-center gap-1 sm:gap-2 my-1">
        <button
          type="button"
          onClick={onPrevPeriod}
          className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-brand-pink/30 min-h-[44px] sm:min-h-0"
          aria-label="Previous cycle week"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-7 gap-1 sm:gap-2 flex-1 w-full min-w-0">
          {days.map((day) => {
            const isSelected = day.id === selectedDayId;
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => onSelectDay(day)}
                className={`flex flex-col items-center justify-between py-1.5 sm:py-2.5 px-0.5 sm:px-1 rounded-[clamp(0.6rem,1.2vw,0.9rem)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple/40 min-w-0 min-h-[44px] ${
                  isSelected
                    ? 'selected-day-card border border-[#955BE3]'
                    : 'bg-transparent hover:bg-gray-50 border border-transparent'
                }`}
                aria-pressed={isSelected}
                aria-label={`Cycle Day ${day.cycleDay}, ${day.month} ${day.dayNumber}`}
              >
                <span
                  className={`text-[clamp(0.65rem,0.9vw,0.825rem)] font-medium leading-tight truncate ${
                    isSelected ? 'text-[#AF71F4]' : 'text-[#9CA3AF]'
                  }`}
                >
                  {day.month}
                </span>
                <span
                  className={`text-[clamp(0.9rem,1.3vw,1.125rem)] font-bold leading-tight my-0.5 ${
                    isSelected ? 'text-[#955BE3]' : 'text-[#374151]'
                  }`}
                >
                  {day.dayNumber}
                </span>
                <span
                  className={`text-[clamp(0.6rem,0.85vw,0.75rem)] leading-tight mb-1 truncate ${
                    isSelected ? 'text-[#955BE3] font-medium' : 'text-[#9CA3AF]'
                  }`}
                >
                  CD {day.cycleDay}
                </span>

                {/* Day status indicator */}
                <div className="h-4 sm:h-5 flex items-center justify-center">
                  {day.indicatorType === 'droplet' ? (
                    <Droplets
                      className="w-3 sm:w-3.5 h-3 sm:h-3.5"
                      style={{ color: day.indicatorColor || '#F87171' }}
                    />
                  ) : day.indicatorType === 'circle' ? (
                    <div
                      className="w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full border-2"
                      style={{ borderColor: day.indicatorColor || '#93C5FD' }}
                    />
                  ) : (
                    <div
                      className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full"
                      style={{
                        backgroundColor: isSelected
                          ? '#955BE3'
                          : day.indicatorColor || '#E5E7EB',
                      }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onNextPeriod}
          className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-brand-pink/30 min-h-[44px] sm:min-h-0"
          aria-label="Next cycle week"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-[clamp(0.75rem,1.5vw,1.25rem)] gap-y-1.5 pt-3 mt-2 border-t border-gray-100 text-[clamp(0.65rem,0.85vw,0.75rem)] leading-[1.5] text-[#6B7280]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F87171] shrink-0" />
          <span>Menstruation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#93C5FD] shrink-0" />
          <span>Fertile Window</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] shrink-0" />
          <span>Ovulation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C084FC] shrink-0" />
          <span>Luteal Phase</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D1D5DB] shrink-0" />
          <span>Logged</span>
        </div>
      </div>
    </section>
  );
};
