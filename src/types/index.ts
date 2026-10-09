export type PhaseType = 'menstruation' | 'follicular' | 'fertile' | 'ovulation' | 'luteal';

export interface CycleDay {
  id: string;
  month: string;
  dayNumber: number;
  cycleDay: number;
  phase: PhaseType;
  isSelected?: boolean;
  isLogged?: boolean;
}

export type CervicalMucusType = 'dry' | 'sticky' | 'creamy' | 'watery' | 'egg_white';

export type LhTestResult = 'negative' | 'low' | 'high' | 'peak';

export type LibidoLevel = 'low' | 'medium' | 'high';

export type IntercourseAnswer = 'yes' | 'no';

export type ProtectionMethod = 'pill' | 'condom' | 'none' | 'other';

export type FollicularMood = 'Happy' | 'Calm' | 'Neutral' | 'Irritable' | 'Sad';

export type FollicularEnergy = 'Low' | 'Moderate' | 'High';

export interface MedicationEntry {
  id: string;
  name: string;
  dosage: string;
  status: 'taken' | 'skipped' | 'pending';
  time?: string;
  type?: string;
  frequency?: string;
  startDate?: string;
  endDate?: string;
  reminder?: boolean;
}

export type PeriodFlowType = 'Spotting' | 'Light' | 'Medium' | 'Heavy';
export type CrampsLevelType = 'None' | 'Mild' | 'Moderate' | 'Severe';

export interface PeriodLogData {
  flow: PeriodFlowType;
  cramps: CrampsLevelType;
  clots: boolean;
  notes: string;
  dateStr?: string;
}

/**
 * One calendar day's log. Tracked values are `null` until the user logs them,
 * so an untouched day never shows (or saves) invented defaults.
 */
export interface FollicularDailyLogData {
  cycleDay: number;
  dateStr: string;
  bbtTempC: number | null;
  bbtTime: string;
  bbtDevice: string;
  bbtManualNotes?: string;
  mood: FollicularMood | null;
  energyLevel: FollicularEnergy | null;
  cervicalMucus: CervicalMucusType | null;
  lhTest: LhTestResult | null;
  libido: LibidoLevel | null;
  medications: MedicationEntry[];
  periodLog?: PeriodLogData;
  /** null until answered; protectionMethod/additionalDetails only apply to 'yes' (details only to 'other') */
  intercourse: IntercourseAnswer | null;
  protectionMethod: ProtectionMethod | null;
  additionalDetails: string;
  /** Selected symptom ids (see data/symptoms.ts); empty until the user picks some */
  symptoms: string[];
  /** True only when the user explicitly chose "No symptoms today"; never combined with `symptoms` */
  noSymptoms: boolean;
  /** Free-text description, only kept while the Other symptom is selected */
  otherSymptomText: string;
  /** Optional 0 (none) – 10 (worst), only kept while symptoms are selected */
  symptomSeverity: number | null;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info';
}
