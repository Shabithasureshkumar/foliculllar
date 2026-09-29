import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import { TopNavigation } from './components/dashboard/TopNavigation';
import { CycleTrackerHeader } from './components/dashboard/CycleTrackerHeader';
import { TrackerTabs, type TrackerTabType } from './components/dashboard/TrackerTabs';
import { TRACKER_PANEL_ID, tabElementId } from './components/dashboard/trackerTabIds';
import { CyclePhaseStatus } from './components/dashboard/CyclePhaseStatus';
import { PhaseDescription } from './components/dashboard/PhaseDescription';
import { VitalMetricCards } from './components/dashboard/VitalMetricCards';
import { LutealMetricCards } from './components/dashboard/LutealMetricCards';
import { AiRecommendation } from './components/dashboard/AiRecommendation';
import { MedicationHistory } from './components/dashboard/MedicationHistory';
import { CycleInsights } from './components/dashboard/CycleInsights';
import { FollicularDailyLog } from './components/dailyLog/FollicularDailyLog';
import { LogPeriodModal } from './components/modals/LogPeriodModal';
import { AddMedicationModal } from './components/modals/AddMedicationModal';
import { AskAvaModal } from './components/modals/AskAvaModal';
import { Toast } from './components/Toast';

import { PATIENT_PROFILE } from './data/mockData';
import { PHASE_CONTENT } from './data/phaseContent';
import {
  addDays,
  addMonthsClamped,
  calculateCycleInfo,
  formatLongDate,
  generateDaysAround,
  getToday,
  toDateKey,
} from './utils/calendarUtils';
import { cycleStore, getBbtContext, getMedicationHistory } from './services/cycleStore';
import type { AvaContext } from './services/avaAssistant';
import type {
  CycleDay,
  ToastMessage,
  CervicalMucusType,
  FollicularDailyLogData,
  PeriodLogData,
  MedicationEntry,
} from './types';

// Tab to Route Path Mapping
const TAB_ROUTES: Record<TrackerTabType, string> = {
  Overview: '/overview',
  Calendar: '/calendar',
  'Daily Log': '/daily-log',
  Insights: '/insights',
  Settings: '/settings',
};

const ROUTE_TABS: Record<string, TrackerTabType> = {
  '/overview': 'Overview',
  '/calendar': 'Calendar',
  '/daily-log': 'Daily Log',
  '/insights': 'Insights',
  '/settings': 'Settings',
  'overview': 'Overview',
  'calendar': 'Calendar',
  'daily-log': 'Daily Log',
  'insights': 'Insights',
  'settings': 'Settings',
};

const getInitialTabFromLocation = (): TrackerTabType => {
  if (typeof window === 'undefined') return 'Overview';
  const pathname = window.location.pathname.toLowerCase();
  const hash = window.location.hash.replace('#', '').toLowerCase();

  if (ROUTE_TABS[pathname]) return ROUTE_TABS[pathname];
  if (ROUTE_TABS[hash]) return ROUTE_TABS[hash];

  return 'Overview';
};

const STRIP_LENGTH = 7;

// Seed today's record once, before first render, so Overview and Daily Log read the same data
const initialToday = getToday();
cycleStore.ensureSeeded(toDateKey(initialToday));

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TrackerTabType>(getInitialTabFromLocation);

  // Single source of truth for the date being viewed; everything else is derived from it
  const [selectedDate, setSelectedDate] = useState<Date>(initialToday);
  const [todayKey, setTodayKey] = useState(() => toDateKey(initialToday));
  const dateKey = toDateKey(selectedDate);

  const [log, setLogState] = useState<FollicularDailyLogData>(() => cycleStore.getFollicularLog(dateKey));
  // Latest log, so several updates in the same tick merge instead of overwriting each other
  const latestLog = useRef(log);
  const setLog = useCallback((next: FollicularDailyLogData) => {
    latestLog.current = next;
    setLogState(next);
  }, []);
  // Snapshot of every saved day; history, strip dots and BBT baseline are derived from it
  const [savedLogs, setSavedLogs] = useState(() => cycleStore.getAllLogs());

  const [isLogPeriodOpen, setIsLogPeriodOpen] = useState(false);
  const [isAddMedicationOpen, setIsAddMedicationOpen] = useState(false);
  const [isAskAvaOpen, setIsAskAvaOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const toastTimers = useRef(new Map<string, number>());

  // Toast Helper
  const removeToast = useCallback((id: string) => {
    window.clearTimeout(toastTimers.current.get(id));
    toastTimers.current.delete(id);
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (title: string, description?: string, type: 'success' | 'info' = 'success') => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
      setToasts((prev) => [...prev.slice(-2), { id, title, description, type }]);
      toastTimers.current.set(id, window.setTimeout(() => removeToast(id), 3500));
    },
    [removeToast]
  );

  useEffect(() => {
    const timers = toastTimers.current;
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  // Keep "today" correct if the app stays open past midnight
  useEffect(() => {
    const timer = window.setInterval(() => {
      const key = toDateKey(getToday());
      setTodayKey((prev) => (prev === key ? prev : key));
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  // Sync Route with Tab
  const handleTabChange = useCallback((tab: TrackerTabType) => {
    setActiveTab(tab);
    const path = TAB_ROUTES[tab];
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
  }, []);

  // Listen for browser back/forward history navigation
  useEffect(() => {
    const handlePopState = () => setActiveTab(getInitialTabFromLocation());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Another tab edited the same data: reload the visible log
  useEffect(() => {
    const handleStorage = () => {
      setLog(cycleStore.getFollicularLog(dateKey));
      setSavedLogs(cycleStore.getAllLogs());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [dateKey, setLog]);

  // ---- Derived data ----
  const { cycleDay, phase, phaseLabel } = calculateCycleInfo(selectedDate);
  const phaseContent = PHASE_CONTENT[phase];

  const savedKeys = useMemo(() => new Set(Object.keys(savedLogs)), [savedLogs]);
  const days = useMemo(() => generateDaysAround(selectedDate, STRIP_LENGTH, savedKeys), [selectedDate, savedKeys]);
  const medicationHistory = useMemo(() => getMedicationHistory(savedLogs), [savedLogs]);
  const bbtContext = useMemo(() => getBbtContext(savedLogs, selectedDate), [savedLogs, selectedDate]);

  const isTodaySelected = dateKey === todayKey;
  const dateLabel = isTodaySelected ? `Today · ${formatLongDate(selectedDate)}` : formatLongDate(selectedDate);

  // ---- Date navigation ----
  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setLog(cycleStore.getFollicularLog(toDateKey(date)));
  }, [setLog]);

  const handleSelectDay = (day: CycleDay) => {
    const [, y, m, d] = day.id.split('-').map(Number);
    selectDate(new Date(y, m - 1, d));
  };

  // ---- Log persistence (every edit is written immediately, so nothing is lost on refresh) ----
  const commitLog = (next: FollicularDailyLogData): boolean => {
    setLog(next);
    const ok = cycleStore.saveFollicularLog(dateKey, next);
    setSavedLogs(ok ? cycleStore.getAllLogs() : (prev) => ({ ...prev, [dateKey]: next }));
    if (!ok) addToast('Could not save', 'Browser storage is unavailable or full. Changes are kept until you reload.', 'info');
    return ok;
  };

  const handleUpdateLog = (updated: Partial<FollicularDailyLogData>) => {
    commitLog({ ...latestLog.current, ...updated });
  };

  const handleSaveLog = () => {
    if (!commitLog(latestLog.current)) return;
    confetti({ particleCount: 55, spread: 70, origin: { y: 0.75 } });
    addToast('Daily Log Saved', `Your ${formatLongDate(selectedDate)} log is saved and shown on Overview.`, 'success');
    handleTabChange('Overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavePeriodLog = (periodData: PeriodLogData) => {
    commitLog({ ...latestLog.current, periodLog: periodData });
    setIsLogPeriodOpen(false);
    confetti({ particleCount: 55, spread: 70, origin: { y: 0.6 } });
    addToast('Period Log Saved', `Flow: ${periodData.flow} · Cramps: ${periodData.cramps}`, 'success');
  };

  const handleSaveMedication = (newMed: MedicationEntry) => {
    commitLog({ ...latestLog.current, medications: [...latestLog.current.medications, newMed] });
    setIsAddMedicationOpen(false);
    confetti({ particleCount: 45, spread: 60, origin: { y: 0.65 } });
    addToast('Medication Added', `${newMed.name} (${newMed.dosage}) added to ${formatLongDate(selectedDate)}`, 'success');
  };

  const handleSelectMucus = (mucus: CervicalMucusType | null) => {
    handleUpdateLog({ cervicalMucus: mucus });
    addToast('Cervical Mucus Updated', mucus ? `Logged: ${mucus.replace('_', ' ')}` : 'Entry cleared for this day', 'success');
  };

  const avaContext: AvaContext = {
    phase,
    phaseLabel,
    cycleDay,
    dateLabel: isTodaySelected ? 'today' : formatLongDate(selectedDate),
    log,
    daysUntilPeriod: PATIENT_PROFILE.cycleLengthDays - cycleDay + 1,
  };

  const loggedSummary = [
    log.bbtTempC !== null ? `BBT ${log.bbtTempC.toFixed(2)}°C` : null,
    log.cervicalMucus !== null ? `${log.cervicalMucus.replace('_', ' ')} mucus` : null,
    log.lhTest !== null ? `LH ${log.lhTest}` : null,
    log.mood !== null ? `mood ${log.mood.toLowerCase()}` : null,
  ].filter(Boolean);
  const aiSummary = `CD ${cycleDay} · ${phaseLabel}: ${loggedSummary.length ? `${loggedSummary.join(', ')}.` : 'nothing logged for this day yet.'}`;

  const phaseRow = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 w-full max-w-none items-stretch">
      <div className="lg:col-span-4 w-full min-w-0">
        <CyclePhaseStatus
          cycleDay={cycleDay}
          cycleLength={PATIENT_PROFILE.cycleLengthDays}
          phaseName={phaseLabel}
          statusText="Healthy"
          accent={phaseContent.accent}
          onSummaryClick={() => addToast('AI Summary', aiSummary, 'info')}
        />
      </div>
      <div className="lg:col-span-8 w-full min-w-0">
        <PhaseDescription
          title={phaseContent.heroTitle}
          text={phaseContent.heroText}
          illustration={phaseContent.illustration}
          onLogPeriodClick={() => setIsLogPeriodOpen(true)}
          onViewTipsClick={() => addToast(`${phaseContent.badge} Phase Tips`, phaseContent.tips, 'info')}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-[#17152B] flex flex-col items-stretch justify-start py-[clamp(0.75rem,1.2vw,1.25rem)] px-[clamp(1rem,2.6vw,3rem)] w-full font-sans antialiased selection:bg-pink-100 selection:text-pink-700">
      <Toast toasts={toasts} onDismiss={removeToast} />

      <div className="w-full max-w-[2560px] mx-auto flex flex-col gap-[clamp(0.75rem,1.1vw,1.125rem)]">
        {/* 1. TOP NAVIGATION */}
        <TopNavigation onDashboardClick={() => handleTabChange('Overview')} onSettingsClick={() => handleTabChange('Settings')} />

        {/* 2. CYCLE TRACKER HEADER */}
        <CycleTrackerHeader />

        {/* 3. SECONDARY TAB NAVIGATION */}
        <TrackerTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Single tab panel, labelled by whichever tab is active */}
        <div role="tabpanel" id={TRACKER_PANEL_ID} aria-labelledby={tabElementId(activeTab)} className="w-full min-w-0">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'Overview' && (
            <main className="w-full max-w-none flex flex-col gap-[clamp(0.75rem,1.1vw,1.125rem)] animate-enter">
              {phaseRow}

              {/* Metric cards read the same saved log the Daily Log writes; luteal days get luteal metrics */}
              {phase === 'luteal' ? (
                <LutealMetricCards
                  bbtTempC={log.bbtTempC}
                  bbtBaseline={bbtContext.baseline}
                  bbtPrevious={bbtContext.previous}
                  isToday={isTodaySelected}
                  mood={log.mood}
                  energyLevel={log.energyLevel}
                  periodLog={log.periodLog}
                  onOpenDailyLog={() => handleTabChange('Daily Log')}
                />
              ) : (
              <VitalMetricCards
                bbtTempC={log.bbtTempC}
                bbtBaseline={bbtContext.baseline}
                bbtPrevious={bbtContext.previous}
                bbtPhaseNote={phaseContent.bbtNote}
                isToday={isTodaySelected}
                selectedMucus={log.cervicalMucus}
                lhTest={log.lhTest}
                libido={log.libido}
                onSelectMucus={handleSelectMucus}
                onOpenDailyLog={() => handleTabChange('Daily Log')}
              />
              )}

              <AiRecommendation
                text={phaseContent.recommendation.text}
                chips={phaseContent.recommendation.chips}
                onAskAvaClick={() => setIsAskAvaOpen(true)}
                onChipClick={(chip) => addToast(`Recommendation: ${chip}`, 'Added to today’s goals', 'success')}
              />

              <MedicationHistory medications={medicationHistory} onAddMedication={() => setIsAddMedicationOpen(true)} />

              <CycleInsights energyLevel={log.energyLevel} mood={log.mood} hormone={phaseContent.hormone} />
            </main>
          )}

          {/* TAB 2: CALENDAR (intentionally blank for now) */}
          {activeTab === 'Calendar' && <main className="w-full" aria-label="Calendar" />}

          {/* TAB 3: DAILY LOG */}
          {activeTab === 'Daily Log' && (
            <FollicularDailyLog
              days={days}
              selectedDate={selectedDate}
              todayKey={todayKey}
              cycleDay={cycleDay}
              phase={phase}
              phaseLabel={phaseLabel}
              logData={log}
              onSelectDay={handleSelectDay}
              onPrevDay={() => selectDate(addDays(selectedDate, -1))}
              onNextDay={() => selectDate(addDays(selectedDate, 1))}
              onPrevMonth={() => selectDate(addMonthsClamped(selectedDate, -1))}
              onNextMonth={() => selectDate(addMonthsClamped(selectedDate, 1))}
              onTodayClick={() => selectDate(getToday())}
              onUpdateLog={handleUpdateLog}
              onSaveLog={handleSaveLog}
              onAddMedication={() => setIsAddMedicationOpen(true)}
            />
          )}

          {/* TAB 4: INSIGHTS (intentionally blank for now) */}
          {activeTab === 'Insights' && <main className="w-full" aria-label="Insights" />}

          {/* TAB 5: SETTINGS (intentionally blank for now) */}
          {activeTab === 'Settings' && <main className="w-full" aria-label="Settings" />}
        </div>

        {/* Modals are keyed by open state + date so each opening starts fresh for the viewed day */}
        <LogPeriodModal
          key={`period-${dateKey}-${isLogPeriodOpen}`}
          isOpen={isLogPeriodOpen}
          initialData={log.periodLog}
          dateLabel={dateLabel}
          onClose={() => setIsLogPeriodOpen(false)}
          onSave={handleSavePeriodLog}
        />

        <AddMedicationModal
          key={`med-${dateKey}-${isAddMedicationOpen}`}
          isOpen={isAddMedicationOpen}
          defaultDate={selectedDate}
          onClose={() => setIsAddMedicationOpen(false)}
          onSave={handleSaveMedication}
        />

        <AskAvaModal
          key={`ava-${isAskAvaOpen}`}
          isOpen={isAskAvaOpen}
          context={avaContext}
          onClose={() => setIsAskAvaOpen(false)}
        />
      </div>
    </div>
  );
};

export default App;
