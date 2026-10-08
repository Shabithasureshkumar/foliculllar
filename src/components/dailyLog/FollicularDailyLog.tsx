import React from 'react';
import { CycleDaySelectorStrip } from './CycleDaySelectorStrip';
import { AiWellnessInsightBanner } from './AiWellnessInsightBanner';
import { BbtAndMedicationSection } from './BbtAndMedicationSection';
import { MoodAndEnergySection } from './MoodAndEnergySection';
import { CervicalMucusSection } from './CervicalMucusSection';
import { IntercourseSection } from './IntercourseSection';
import { LhAndLibidoSection } from './LhAndLibidoSection';
import { formatLongDate } from '../../utils/calendarUtils';
import { PHASE_CONTENT } from '../../data/phaseContent';
import type { CycleDay, FollicularDailyLogData, PhaseType } from '../../types';

interface FollicularDailyLogProps {
  days: CycleDay[];
  selectedDate: Date;
  todayKey: string;
  cycleDay: number;
  phase: PhaseType;
  phaseLabel: string;
  logData: FollicularDailyLogData;
  onSelectDay: (day: CycleDay) => void;
  onPrevDay: () => void;
  onNextDay: () => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onTodayClick: () => void;
  onUpdateLog: (updated: Partial<FollicularDailyLogData>) => void;
  onSaveLog: () => void;
  onAddMedication: () => void;
}

export const FollicularDailyLog: React.FC<FollicularDailyLogProps> = ({
  days,
  selectedDate,
  todayKey,
  cycleDay,
  phase,
  phaseLabel,
  logData,
  onSelectDay,
  onPrevDay,
  onNextDay,
  onPrevMonth,
  onNextMonth,
  onTodayClick,
  onUpdateLog,
  onSaveLog,
  onAddMedication,
}) => {
  // Clicking the active status again clears it back to "not marked"
  const handleToggleMedStatus = (medId: string, status: 'taken' | 'skipped') => {
    const updated = logData.medications.map((m) =>
      m.id === medId ? { ...m, status: m.status === status ? ('pending' as const) : status } : m
    );
    onUpdateLog({ medications: updated });
  };

  const isToday = days.some((d) => d.isSelected && d.id === todayKey);
  const content = PHASE_CONTENT[phase];

  return (
    <main className="w-full max-w-none flex flex-col gap-4 sm:gap-5 animate-enter">
      {/* 1. Cycle Day Header & Date Selector Strip */}
      <CycleDaySelectorStrip
        days={days}
        selectedDate={selectedDate}
        cycleDay={cycleDay}
        phaseLabel={phaseLabel}
        todayKey={todayKey}
        onSelectDay={onSelectDay}
        onPrevDay={onPrevDay}
        onNextDay={onNextDay}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        onTodayClick={onTodayClick}
      />

      {/* 2. Dynamic Phase Title Header */}
      <div className="flex flex-col text-left px-0.5 pt-1">
        <h2 className="text-page-title font-bold text-[#17152B]">{phaseLabel}</h2>
        <p className="text-body text-[#68708A] mt-0.5">
          {isToday ? 'Today, ' : ''}
          {formatLongDate(selectedDate)}
        </p>
      </div>

      {/* 3. AI Wellness Insight Banner */}
      <AiWellnessInsightBanner text={content.insight.text} chips={content.insight.chips} />

      {/* 4. BBT & Medication Section */}
      <BbtAndMedicationSection
        bbtTempC={logData.bbtTempC}
        bbtTime={logData.bbtTime}
        bbtDevice={logData.bbtDevice}
        bbtManualNotes={logData.bbtManualNotes}
        medications={logData.medications}
        onUpdateBbtTemp={(temp) => onUpdateLog({ bbtTempC: temp })}
        onUpdateBbtTime={(time) => onUpdateLog({ bbtTime: time })}
        onUpdateBbtDevice={(device) => onUpdateLog({ bbtDevice: device })}
        onUpdateBbtNotes={(notes) => onUpdateLog({ bbtManualNotes: notes })}
        onToggleMedicationStatus={handleToggleMedStatus}
        onAddMedication={onAddMedication}
      />

      {/* 5. Mood & Energy Level Section */}
      <MoodAndEnergySection
        selectedMood={logData.mood}
        selectedEnergy={logData.energyLevel}
        onSelectMood={(mood) => onUpdateLog({ mood })}
        onSelectEnergy={(energyLevel) => onUpdateLog({ energyLevel })}
      />

      {/* 6. Cervical Mucus & Discharge Section */}
      <CervicalMucusSection
        phaseBadge={content.badge}
        selectedMucus={logData.cervicalMucus}
        onSelectMucus={(cervicalMucus) => onUpdateLog({ cervicalMucus })}
      />

      {/* 7. LH / Ovulation Test & Libido Section */}
      <LhAndLibidoSection
        selectedLh={logData.lhTest}
        selectedLibido={logData.libido}
        onSelectLh={(lhTest) => onUpdateLog({ lhTest })}
        onSelectLibido={(libido) => onUpdateLog({ libido })}
      />

      {/* 8. Intercourse */}
      <IntercourseSection
        intercourse={logData.intercourse}
        protectionMethod={logData.protectionMethod}
        additionalDetails={logData.additionalDetails}
        onUpdate={onUpdateLog}
      />

      {/* 9. Bottom Save Action Button */}
      <div className="flex items-center justify-end pt-1 pb-6">
        <button
          type="button"
          data-testid="save-log-button"
          onClick={onSaveLog}
          className="w-full sm:w-auto px-10 sm:px-12 py-3 rounded-full bg-[#F472B6] hover:bg-[#EC4899] text-white font-semibold text-[15px] sm:text-[16px] shadow-[0_6px_18px_rgba(244,114,182,0.35)] transition-all active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-200"
        >
          Save log
        </button>
      </div>
    </main>
  );
};
