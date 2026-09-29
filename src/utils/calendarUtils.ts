import type { CycleDay, PhaseType } from '../types';
import { PATIENT_PROFILE } from '../data/mockData';

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const MONTH_FULL_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const WEEKDAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const DATE_KEY_PATTERN = /^day-(\d{4})-(\d{2})-(\d{2})$/;

// Returns the exact number of days in a month (1-indexed day count)
const getDaysInMonth = (year: number, monthIndex: number): number => {
  return new Date(year, monthIndex + 1, 0).getDate();
};

// Local calendar date with the time stripped
const startOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const getToday = (): Date => startOfDay(new Date());

export const addDays = (date: Date, amount: number): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);

// Moves by whole months, clamping the day so e.g. Mar 31 - 1 month = Feb 28/29 (never an invalid date)
export const addMonthsClamped = (date: Date, amount: number): Date => {
  const target = new Date(date.getFullYear(), date.getMonth() + amount, 1);
  const maxDay = getDaysInMonth(target.getFullYear(), target.getMonth());
  return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), maxDay));
};

// Storage / identity key for a calendar day, e.g. "day-2026-09-29"
export const toDateKey = (date: Date): string =>
  `day-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export const parseDateKey = (key: string): Date | null => {
  const match = DATE_KEY_PATTERN.exec(key);
  if (!match) return null;
  const [, y, m, d] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  // Reject rollovers such as day-2026-06-31 -> July 1
  return toDateKey(date) === key ? date : null;
};

// "29 Sep 2026"
export const formatShortDate = (date: Date): string =>
  `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;

// "Sep 29, 2026"
export const formatMonthDayYear = (date: Date): string =>
  `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

// "29 September 2026"
export const formatLongDate = (date: Date): string =>
  `${date.getDate()} ${MONTH_FULL_NAMES[date.getMonth()]} ${date.getFullYear()}`;

export const PHASE_LABELS: Record<PhaseType, string> = {
  menstruation: 'Menstrual Phase',
  follicular: 'Follicular Phase',
  fertile: 'Fertile Window',
  ovulation: 'Ovulation Phase',
  luteal: 'Luteal Phase',
};

// Phase boundaries (inclusive cycle days) for a 28-day reference cycle
export const PHASE_RANGES: Array<{ phase: PhaseType; start: number; end: number }> = [
  { phase: 'menstruation', start: 1, end: 5 },
  { phase: 'follicular', start: 6, end: 11 },
  { phase: 'fertile', start: 12, end: 13 },
  { phase: 'ovulation', start: 14, end: 15 },
  { phase: 'luteal', start: 16, end: 28 },
];

export const calculateCycleInfo = (
  date: Date
): { cycleDay: number; phase: PhaseType; phaseLabel: string } => {
  const cycleLength = PATIENT_PROFILE.cycleLengthDays;
  const anchor = PATIENT_PROFILE.lastPeriodStart;
  // Compare as UTC midnights so DST changes never skew the day delta
  const utcD = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const utcRef = Date.UTC(anchor.getFullYear(), anchor.getMonth(), anchor.getDate());
  const diffDays = Math.round((utcD - utcRef) / MS_PER_DAY);
  const cycleDay = (((diffDays % cycleLength) + cycleLength) % cycleLength) + 1;

  const phase = PHASE_RANGES.find((r) => cycleDay >= r.start && cycleDay <= r.end)?.phase ?? 'luteal';
  return { cycleDay, phase, phaseLabel: PHASE_LABELS[phase] };
};

/**
 * Builds a strip of `count` consecutive real calendar days centred on `center`.
 * Uses Date arithmetic, so month/year boundaries roll over naturally and no invalid
 * dates (e.g. 31 June) can ever be produced.
 */
export const generateDaysAround = (
  center: Date,
  count: number,
  loggedKeys: ReadonlySet<string>
): CycleDay[] => {
  const half = Math.floor(count / 2);
  return Array.from({ length: count }, (_, i) => {
    const date = addDays(center, i - half);
    const { cycleDay, phase } = calculateCycleInfo(date);
    const id = toDateKey(date);
    return {
      id,
      month: MONTH_NAMES[date.getMonth()],
      dayNumber: date.getDate(),
      cycleDay,
      phase,
      isSelected: i === half,
      isLogged: loggedKeys.has(id),
    };
  });
};
