export type PhaseType = 'menstruation' | 'follicular' | 'fertile' | 'ovulation' | 'luteal';

export interface CycleDay {
  id: string;
  month: string;
  dayNumber: number;
  cycleDay: number;
  phase: PhaseType;
  isSelected?: boolean;
  isLogged?: boolean;
  indicatorType?: 'droplet' | 'circle' | 'dot';
  indicatorColor?: string;
}

export interface BodyChangesState {
  glowRating: number; // 1 to 5 stars
  acne: 'Minimal' | 'Mild' | 'Moderate' | 'Severe';
  oiliness: 'Low' | 'Normal' | 'High';
  texture: 'Smooth' | 'Uneven' | 'Rough';
  digestiveStatus: 'Normal' | 'Sluggish' | 'Active';
  bloating: 'None' | 'Mild' | 'Moderate' | 'Severe';
  constipation: 'None' | 'Mild' | 'Moderate';
  appetite: 'Healthy' | 'Low' | 'High' | 'Cravings';
}

export interface ActivityLog {
  id: string;
  name: string;
  type: 'walking' | 'cardio' | 'yoga' | 'strength' | 'cycling' | 'swimming' | 'pilates' | 'custom';
  durationMin: number;
  targetMin: number;
  gradientFrom: string;
  gradientTo: string;
  caloriesBurned?: number;
}

export interface WellnessMetricsState {
  sleepHours: number;
  sleepQuality?: 'Restful' | 'Normal' | 'Restless';
  mood: 'Great' | 'Good' | 'Neutral' | 'Low' | 'Sensitive';
  waterCurrentL: number;
  waterTargetL: number;
  steps: number;
  weightKg: number;
  sexActivity: 'Not Logged' | 'Protected' | 'Unprotected' | 'High Drive';
}

export interface ConnectedDevice {
  id: string;
  name: string;
  type: 'watch' | 'thermometer' | 'scale';
  lastSyncedText: string;
  isSynced: boolean;
  batteryLevel?: number;
}

export type CervicalMucusType = 'dry' | 'sticky' | 'creamy' | 'watery' | 'egg_white';

export type LhTestResult = 'negative' | 'low' | 'high' | 'peak';

export type LibidoLevel = 'low' | 'medium' | 'high';

export type FollicularMood = 'Happy' | 'Calm' | 'Neutral' | 'Irritable' | 'Sad';

export type FollicularEnergy = 'Low' | 'Moderate' | 'High';

export interface MedicationEntry {
  id: string;
  name: string;
  dosage: string;
  status: 'taken' | 'skipped' | 'pending';
  time?: string;
  icon?: string;
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

export interface FollicularDailyLogData {
  cycleDay: number;
  dateStr: string;
  bbtTempC: number;
  bbtTime: string;
  bbtDevice: string;
  bbtManualNotes?: string;
  mood: FollicularMood;
  energyLevel: FollicularEnergy;
  cervicalMucus: CervicalMucusType;
  lhTest: LhTestResult;
  libido: LibidoLevel;
  medications: MedicationEntry[];
  periodLog?: PeriodLogData;
  aiInsight?: {
    title: string;
    text: string;
    chips: string[];
  };
}

export interface BbtDataPoint {
  id: string;
  day: string;
  cycleDay: number;
  dateStr: string;
  tempC: number;
  isToday?: boolean;
}

export interface FertilityTrackingState {
  cervicalMucus: CervicalMucusType;
  bbtTempC: number;
  bbtTrend: BbtDataPoint[];
  lhTest: LhTestResult;
  libido: LibidoLevel;
}

export type QuickLogCategory =
  | 'flow'
  | 'symptoms'
  | 'mood'
  | 'weight'
  | 'sleep'
  | 'water'
  | 'cervical_mucus'
  | 'bbt'
  | 'lh_test'
  | 'libido'
  | 'medication';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info';
}

export interface SavedNote {
  id: string;
  text: string;
  timestamp: string;
}
