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

export type QuickLogCategory = 'flow' | 'symptoms' | 'mood' | 'weight' | 'sleep' | 'water';

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
