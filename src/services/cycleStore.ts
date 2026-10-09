import type {
  CervicalMucusType,
  CrampsLevelType,
  FollicularDailyLogData,
  FollicularEnergy,
  FollicularMood,
  IntercourseAnswer,
  ProtectionMethod,
  LhTestResult,
  LibidoLevel,
  MedicationEntry,
  PeriodFlowType,
  PeriodLogData,
  PhaseType,
} from '../types';
import { INITIAL_FOLLICULAR_LOG } from '../data/mockData';
import { KNOWN_SYMPTOM_IDS, OTHER_SYMPTOM_ID, OTHER_SYMPTOM_MAX } from '../data/symptoms';
import { addDays, calculateCycleInfo, formatLongDate, parseDateKey, toDateKey } from '../utils/calendarUtils';

const STORAGE_KEY_PREFIX = 'cycle_tracker_follicular_log_';

const MOODS: readonly FollicularMood[] = ['Happy', 'Calm', 'Neutral', 'Irritable', 'Sad'];
const ENERGIES: readonly FollicularEnergy[] = ['Low', 'Moderate', 'High'];
const MUCUS_TYPES: readonly CervicalMucusType[] = ['dry', 'sticky', 'creamy', 'watery', 'egg_white'];
const LH_RESULTS: readonly LhTestResult[] = ['negative', 'low', 'high', 'peak'];
const LIBIDO_LEVELS: readonly LibidoLevel[] = ['low', 'medium', 'high'];
const MED_STATUSES: readonly MedicationEntry['status'][] = ['taken', 'skipped', 'pending'];
const INTERCOURSE_ANSWERS: readonly IntercourseAnswer[] = ['yes', 'no'];
const PROTECTION_METHODS: readonly ProtectionMethod[] = ['pill', 'condom', 'none', 'other'];
export const ADDITIONAL_DETAILS_MAX = 200;
const FLOWS: readonly PeriodFlowType[] = ['Spotting', 'Light', 'Medium', 'Heavy'];
const CRAMPS: readonly CrampsLevelType[] = ['None', 'Mild', 'Moderate', 'Severe'];

export const BBT_MIN = 35.0;
export const BBT_MAX = 38.5;

export interface MedicationHistoryItem extends MedicationEntry {
  dateKey: string;
  date: Date;
  phase: PhaseType;
}

type UnknownRecord = Record<string, unknown>;

const isRecord = (v: unknown): v is UnknownRecord => typeof v === 'object' && v !== null && !Array.isArray(v);

const pick = <T extends string, F extends T | null>(value: unknown, allowed: readonly T[], fallback: F): T | F =>
  typeof value === 'string' && (allowed as readonly string[]).includes(value) ? (value as T) : fallback;

const str = (value: unknown, fallback = ''): string => (typeof value === 'string' ? value : fallback);

const storage = (): Storage | null => {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
};

const createEmptyLog = (date: Date): FollicularDailyLogData => ({
  cycleDay: calculateCycleInfo(date).cycleDay,
  dateStr: formatLongDate(date),
  bbtTempC: null,
  bbtTime: '07:30 AM',
  bbtDevice: 'Connected Thermometer',
  bbtManualNotes: '',
  mood: null,
  energyLevel: null,
  cervicalMucus: null,
  lhTest: null,
  libido: null,
  medications: [],
  intercourse: null,
  protectionMethod: null,
  additionalDetails: '',
  symptoms: [],
  noSymptoms: false,
  otherSymptomText: '',
  symptomSeverity: null,
});

const normalizeMedication = (raw: unknown, index: number): MedicationEntry | null => {
  if (!isRecord(raw)) return null;
  const name = str(raw.name).trim();
  if (!name) return null;
  return {
    id: str(raw.id) || `med-restored-${index}`,
    name,
    dosage: str(raw.dosage),
    status: pick(raw.status, MED_STATUSES, 'pending'),
    time: str(raw.time) || undefined,
    type: str(raw.type) || undefined,
    frequency: str(raw.frequency) || undefined,
    startDate: str(raw.startDate) || undefined,
    endDate: str(raw.endDate) || undefined,
    reminder: typeof raw.reminder === 'boolean' ? raw.reminder : undefined,
  };
};

// Keeps only fields that apply to the answer, so stale values can never reappear
const normalizeIntercourse = (raw: UnknownRecord) => {
  const intercourse = pick(raw.intercourse, INTERCOURSE_ANSWERS, null);
  const protectionMethod = intercourse === 'yes' ? pick(raw.protectionMethod, PROTECTION_METHODS, null) : null;
  const additionalDetails =
    protectionMethod === 'other' ? str(raw.additionalDetails).slice(0, ADDITIONAL_DETAILS_MAX) : '';
  return { intercourse, protectionMethod, additionalDetails };
};

// "No symptoms" and a symptom list are mutually exclusive; the custom text and severity only apply to a real selection
const normalizeSymptoms = (raw: UnknownRecord) => {
  const ids = Array.isArray(raw.symptoms)
    ? [...new Set(raw.symptoms.filter((v): v is string => typeof v === 'string' && KNOWN_SYMPTOM_IDS.has(v)))]
    : [];
  const noSymptoms = ids.length === 0 && raw.noSymptoms === true;
  const otherSymptomText = ids.includes(OTHER_SYMPTOM_ID) ? str(raw.otherSymptomText).slice(0, OTHER_SYMPTOM_MAX) : '';
  const sev = typeof raw.symptomSeverity === 'number' ? raw.symptomSeverity : Number.NaN;
  const symptomSeverity = ids.length > 0 && Number.isInteger(sev) && sev >= 0 && sev <= 10 ? sev : null;
  return { symptoms: ids, noSymptoms, otherSymptomText, symptomSeverity };
};

const normalizePeriodLog = (raw: unknown): PeriodLogData | undefined => {
  if (!isRecord(raw)) return undefined;
  return {
    flow: pick(raw.flow, FLOWS, 'Light'),
    cramps: pick(raw.cramps, CRAMPS, 'None'),
    clots: raw.clots === true,
    notes: str(raw.notes),
    dateStr: str(raw.dateStr) || undefined,
  };
};

// Coerces any stored JSON (old schema, partial, or hand-edited) into a valid log for `date`
const normalizeLog = (raw: unknown, date: Date): FollicularDailyLogData => {
  const base = createEmptyLog(date);
  if (!isRecord(raw)) return base;

  const temp = typeof raw.bbtTempC === 'number' ? raw.bbtTempC : Number.NaN;
  const meds = Array.isArray(raw.medications) ? raw.medications : [];
  const seenIds = new Set<string>();

  return {
    ...base,
    bbtTempC: Number.isFinite(temp) && temp >= BBT_MIN && temp <= BBT_MAX ? Math.round(temp * 100) / 100 : base.bbtTempC,
    bbtTime: str(raw.bbtTime, base.bbtTime) || base.bbtTime,
    bbtDevice: str(raw.bbtDevice, base.bbtDevice) || base.bbtDevice,
    bbtManualNotes: str(raw.bbtManualNotes),
    mood: pick(raw.mood, MOODS, base.mood),
    energyLevel: pick(raw.energyLevel, ENERGIES, base.energyLevel),
    cervicalMucus: pick(raw.cervicalMucus, MUCUS_TYPES, base.cervicalMucus),
    lhTest: pick(raw.lhTest, LH_RESULTS, base.lhTest),
    libido: pick(raw.libido, LIBIDO_LEVELS, base.libido),
    medications: meds
      .map(normalizeMedication)
      .filter((m): m is MedicationEntry => m !== null)
      // Duplicate ids would break React keys and status toggles
      .map((m, i) => {
        const id = seenIds.has(m.id) ? `${m.id}-${i}` : m.id;
        seenIds.add(id);
        return { ...m, id };
      }),
    periodLog: normalizePeriodLog(raw.periodLog),
    ...normalizeIntercourse(raw),
    ...normalizeSymptoms(raw),
  };
};

const reportedCorruptKeys = new Set<string>();

const readRaw = (dateKey: string): unknown => {
  const store = storage();
  if (!store) return undefined;
  try {
    const stored = store.getItem(`${STORAGE_KEY_PREFIX}${dateKey}`);
    return stored ? JSON.parse(stored) : undefined;
  } catch (e) {
    if (!reportedCorruptKeys.has(dateKey)) {
      reportedCorruptKeys.add(dateKey);
      console.warn(`Ignoring unreadable saved log for ${dateKey}`, e);
    }
    return undefined;
  }
};

const listSavedKeys = (): string[] => {
  const store = storage();
  if (!store) return [];
  const keys: string[] = [];
  try {
    for (let i = 0; i < store.length; i++) {
      const key = store.key(i);
      if (key?.startsWith(STORAGE_KEY_PREFIX)) {
        const dateKey = key.slice(STORAGE_KEY_PREFIX.length);
        if (parseDateKey(dateKey)) keys.push(dateKey);
      }
    }
  } catch (e) {
    console.warn('Failed to list saved logs', e);
  }
  return keys;
};

export const cycleStore = {
  /**
   * Seeds today's record the very first time the app runs (no saved logs at all),
   * so the Daily Log and Overview start from the same persisted data.
   */
  ensureSeeded: (todayKey: string): void => {
    if (listSavedKeys().length > 0) return;
    const date = parseDateKey(todayKey);
    if (!date) return;
    cycleStore.saveFollicularLog(todayKey, normalizeLog(INITIAL_FOLLICULAR_LOG, date));
  },

  /** Saved record for a date, or a clean default record if nothing was logged. */
  getFollicularLog: (dateKey: string): FollicularDailyLogData => {
    const date = parseDateKey(dateKey) ?? new Date();
    return normalizeLog(readRaw(dateKey), date);
  },

  /** Persists a daily log; returns false if storage is unavailable or full. */
  saveFollicularLog: (dateKey: string, data: FollicularDailyLogData): boolean => {
    const date = parseDateKey(dateKey);
    const store = storage();
    if (!date || !store) return false;
    const record: FollicularDailyLogData = {
      ...data,
      cycleDay: calculateCycleInfo(date).cycleDay,
      dateStr: formatLongDate(date),
    };
    try {
      store.setItem(`${STORAGE_KEY_PREFIX}${dateKey}`, JSON.stringify(record));
      return true;
    } catch (e) {
      console.warn('Failed to write to localStorage', e);
      return false;
    }
  },

  /** Every saved day's (validated) log, keyed by date key. */
  getAllLogs: (): Record<string, FollicularDailyLogData> => {
    const logs: Record<string, FollicularDailyLogData> = {};
    for (const key of listSavedKeys()) logs[key] = cycleStore.getFollicularLog(key);
    return logs;
  },
};

/** Every logged medication across all saved days, newest day first. */
export const getMedicationHistory = (logs: Record<string, FollicularDailyLogData>): MedicationHistoryItem[] => {
  const items: MedicationHistoryItem[] = [];
  for (const [dateKey, log] of Object.entries(logs)) {
    const date = parseDateKey(dateKey);
    if (!date) continue;
    const { phase } = calculateCycleInfo(date);
    for (const med of log.medications) items.push({ ...med, dateKey, date, phase });
  }
  return items.sort((a, b) => b.date.getTime() - a.date.getTime());
};

/**
 * Mean of the readings saved in the `days` before `date` (the pre-shift baseline),
 * plus the most recent earlier reading for the trend badge.
 */
export const getBbtContext = (
  logs: Record<string, FollicularDailyLogData>,
  date: Date,
  days = 6
): { baseline: number | null; previous: number | null } => {
  const readings: number[] = [];
  for (let offset = 1; offset <= days; offset++) {
    const log = logs[toDateKey(addDays(date, -offset))];
    if (log?.bbtTempC != null) readings.push(log.bbtTempC);
  }
  const baseline = readings.length ? readings.reduce((s, t) => s + t, 0) / readings.length : null;
  return { baseline, previous: readings[0] ?? null };
};
