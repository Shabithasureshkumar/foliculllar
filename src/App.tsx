import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CalendarCard } from './components/CalendarCard';
import { FollicularSection } from './components/FollicularSection';
import { WellnessMetricsCard } from './components/WellnessMetricsCard';
import { UserProfileCard } from './components/sidebar/UserProfileCard';
import { CycleSummaryCard } from './components/sidebar/CycleSummaryCard';
import { InsightsCard } from './components/sidebar/InsightsCard';
import { PersonalNotesCard } from './components/sidebar/PersonalNotesCard';
import { ConnectedDevicesCard } from './components/sidebar/ConnectedDevicesCard';
import { QuickLogCard } from './components/sidebar/QuickLogCard';
import { LogActivityModal } from './components/modals/LogActivityModal';
import { EditWellnessModal } from './components/modals/EditWellnessModal';
import { QuickLogModal } from './components/modals/QuickLogModal';
import { CalendarMonthModal } from './components/modals/CalendarMonthModal';
import { Toast } from './components/Toast';

import {
  INITIAL_DAYS,
  INITIAL_BODY_CHANGES,
  INITIAL_ACTIVITIES,
  INITIAL_WELLNESS_METRICS,
  INITIAL_CONNECTED_DEVICES,
  INITIAL_FERTILITY_STATE,
} from './data/mockData';
import type {
  CycleDay,
  BodyChangesState,
  ActivityLog,
  WellnessMetricsState,
  ConnectedDevice,
  QuickLogCategory,
  ToastMessage,
  FertilityTrackingState,
} from './types';

export const App: React.FC = () => {
  // State
  const [days, setDays] = useState<CycleDay[]>(INITIAL_DAYS);
  const [selectedDayId, setSelectedDayId] = useState<string>('day-21');
  const [bodyChanges, setBodyChanges] = useState<BodyChangesState>(INITIAL_BODY_CHANGES);
  const [activities, setActivities] = useState<ActivityLog[]>(INITIAL_ACTIVITIES);
  const [wellnessMetrics, setWellnessMetrics] = useState<WellnessMetricsState>(INITIAL_WELLNESS_METRICS);
  const [devices, setDevices] = useState<ConnectedDevice[]>(INITIAL_CONNECTED_DEVICES);
  const [fertilityState, setFertilityState] = useState<FertilityTrackingState>(INITIAL_FERTILITY_STATE);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals state
  const [isLogActivityOpen, setIsLogActivityOpen] = useState(false);
  const [isEditWellnessOpen, setIsEditWellnessOpen] = useState(false);
  const [isCalendarMonthOpen, setIsCalendarMonthOpen] = useState(false);
  const [activeQuickLogCategory, setActiveQuickLogCategory] = useState<QuickLogCategory | null>(null);

  // Toast Helper
  const addToast = (title: string, description?: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Day selection
  const handleSelectDay = (day: CycleDay) => {
    setSelectedDayId(day.id);
    setDays((prev) =>
      prev.map((d) => ({
        ...d,
        isSelected: d.id === day.id,
      }))
    );
    addToast('Day Selected', `Viewing details for ${day.month} ${day.dayNumber} (CD ${day.cycleDay})`, 'info');
  };

  const handleTodayClick = () => {
    const today = days.find((d) => d.dayNumber === 21) || days[3];
    handleSelectDay(today);
  };

  const handleShiftPeriod = (direction: 'prev' | 'next') => {
    setDays((prev) =>
      prev.map((d) => {
        const delta = direction === 'next' ? 7 : -7;
        const newDayNum = d.dayNumber + delta;
        const newCycleDay = ((d.cycleDay + delta - 1 + 30) % 30) + 1;
        return {
          ...d,
          dayNumber: newDayNum > 0 ? newDayNum : 30 + newDayNum,
          cycleDay: newCycleDay,
        };
      })
    );
    addToast(direction === 'next' ? 'Next Cycle Week' : 'Previous Cycle Week', undefined, 'info');
  };

  // Body changes update
  const handleUpdateBodyChanges = (newChanges: Partial<BodyChangesState>) => {
    setBodyChanges((prev) => ({ ...prev, ...newChanges }));
    addToast('Body Changes Updated', undefined, 'success');
  };

  // Fertility update
  const handleUpdateFertility = (newFertility: Partial<FertilityTrackingState>) => {
    setFertilityState((prev) => ({ ...prev, ...newFertility }));
    addToast('Fertility Biomarkers Updated', undefined, 'success');
  };

  // Add Activity
  const handleSaveActivity = (newActivity: Omit<ActivityLog, 'id'>) => {
    const actId = `act-${Date.now()}`;
    setActivities((prev) => {
      const existsIndex = prev.findIndex((a) => a.type === newActivity.type);
      if (existsIndex !== -1) {
        const updated = [...prev];
        updated[existsIndex] = {
          ...updated[existsIndex],
          durationMin: updated[existsIndex].durationMin + newActivity.durationMin,
          targetMin: newActivity.targetMin,
        };
        return updated;
      }
      return [...prev, { ...newActivity, id: actId }];
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    addToast('Activity Logged', `${newActivity.name} (+${newActivity.durationMin} min)`, 'success');
  };

  // Wellness Metrics Update
  const handleSaveWellness = (updated: WellnessMetricsState) => {
    setWellnessMetrics(updated);
    addToast('Wellness Metrics Saved', 'Your daily health log has been updated', 'success');
  };

  // Sync Device
  const handleSyncDevice = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === deviceId
          ? { ...d, lastSyncedText: 'Synced · just now', isSynced: true }
          : d
      )
    );
    addToast('Device Synced', 'Data successfully synchronized with health sensors', 'success');
  };

  // Save Note
  const handleSaveNote = (noteText: string) => {
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
    });
    addToast('Personal Note Saved', noteText.slice(0, 45) + (noteText.length > 45 ? '...' : ''), 'success');
  };

  // Quick Log Complete
  const handleQuickLogComplete = (
    msg: string,
    metricUpdate?: Partial<WellnessMetricsState>,
    fertilityUpdate?: Partial<FertilityTrackingState>
  ) => {
    if (metricUpdate) {
      setWellnessMetrics((prev) => ({ ...prev, ...metricUpdate }));
    }
    if (fertilityUpdate) {
      setFertilityState((prev) => ({ ...prev, ...fertilityUpdate }));
    }
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
    });
    addToast('Quick Log Saved', msg, 'success');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1F2937] flex flex-col items-center justify-start py-[clamp(1rem,2vw,1.7rem)] px-[clamp(0.75rem,2vw,1.875rem)] w-full overflow-x-hidden">
      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Main Responsive Grid Layout (Independent Column Heights) */}
      <main className="w-full max-w-[1380px] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_clamp(17.5rem,22vw,20.5rem)] items-start gap-[clamp(1.25rem,2vw,1.56rem)]">
        {/* Left / Main Content Column */}
        <div
          className="flex flex-col gap-[clamp(1.25rem,2vw,1.56rem)] w-full min-w-0"
          role="region"
          aria-label="Main Daily Health & Cycle Log"
        >
          {/* Daily Log Header & Top Calendar Section */}
          <div className="flex flex-col gap-2.5 w-full min-w-0">
            <h1 className="text-[clamp(1.5rem,2.2vw,1.8rem)] font-bold leading-tight text-[#111827] tracking-tight">
              Daily Log
            </h1>

            {/* Top Calendar Navigation Card */}
            <CalendarCard
              days={days}
              selectedDayId={selectedDayId}
              onSelectDay={handleSelectDay}
              onOpenMonthPicker={() => setIsCalendarMonthOpen(true)}
              onPrevPeriod={() => handleShiftPeriod('prev')}
              onNextPeriod={() => handleShiftPeriod('next')}
              onTodayClick={handleTodayClick}
            />
          </div>

          {/* Follicular Phase Pink Container Section (with Cervical Mucus, BBT & BBT Trend, LH & Libido) */}
          <FollicularSection
            bodyChanges={bodyChanges}
            activities={activities}
            fertilityState={fertilityState}
            onOpenLogActivity={() => setIsLogActivityOpen(true)}
            onUpdateBodyChanges={handleUpdateBodyChanges}
            onUpdateFertility={handleUpdateFertility}
          />

          {/* Wellness Metrics Bottom Card */}
          <WellnessMetricsCard
            metrics={wellnessMetrics}
            onOpenEditLog={() => setIsEditWellnessOpen(true)}
            onQuickLogMetric={(metricKey) => {
              if (metricKey === 'waterCurrentL') setActiveQuickLogCategory('water');
              else if (metricKey === 'sleepHours') setActiveQuickLogCategory('sleep');
              else if (metricKey === 'weightKg') setActiveQuickLogCategory('weight');
              else if (metricKey === 'mood') setActiveQuickLogCategory('mood');
              else setIsEditWellnessOpen(true);
            }}
          />
        </div>

        {/* Right Sidebar Column */}
        <aside
          className="w-full flex flex-col gap-[clamp(1.25rem,2vw,1.5rem)] lg:border-l lg:border-[#F3F4F6] lg:pl-[clamp(1rem,1.8vw,1.5rem)] pt-1 lg:pt-0 min-w-0 self-start"
          aria-label="User Profile & Quick Actions Sidebar"
        >
          {/* 1. User Profile Card */}
          <UserProfileCard />

          {/* 2. Cycle Summary */}
          <CycleSummaryCard
            onSelectPhase={(phase) =>
              addToast(phase, 'Viewing phase predictions and hormonal guidance', 'info')
            }
          />

          {/* 3. Today's Insights */}
          <InsightsCard />

          {/* 4. Personal Notes */}
          <PersonalNotesCard onSaveNote={handleSaveNote} />

          {/* 5. Connected Devices */}
          <ConnectedDevicesCard
            devices={devices}
            onSyncDevice={handleSyncDevice}
          />

          {/* 6. Quick Log Actions */}
          <QuickLogCard
            onSelectCategory={(cat) => setActiveQuickLogCategory(cat)}
          />
        </aside>
      </main>

      {/* Interactive Modals */}
      <LogActivityModal
        isOpen={isLogActivityOpen}
        onClose={() => setIsLogActivityOpen(false)}
        onSaveActivity={handleSaveActivity}
      />

      <EditWellnessModal
        isOpen={isEditWellnessOpen}
        initialMetrics={wellnessMetrics}
        onClose={() => setIsEditWellnessOpen(false)}
        onSave={handleSaveWellness}
      />

      <QuickLogModal
        category={activeQuickLogCategory}
        currentMetrics={wellnessMetrics}
        currentFertility={fertilityState}
        onClose={() => setActiveQuickLogCategory(null)}
        onLogComplete={handleQuickLogComplete}
      />

      <CalendarMonthModal
        isOpen={isCalendarMonthOpen}
        onClose={() => setIsCalendarMonthOpen(false)}
        onSelectDate={(d) => {
          const matchedDay = days.find((day) => day.dayNumber === d);
          if (matchedDay) {
            handleSelectDay(matchedDay);
          } else {
            addToast('Selected June ' + d, 'Viewing logs for selected date', 'info');
          }
        }}
      />
    </div>
  );
};

export default App;
