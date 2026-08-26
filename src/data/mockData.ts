import type {
  CycleDay,
  BodyChangesState,
  ActivityLog,
  WellnessMetricsState,
  ConnectedDevice,
  FertilityTrackingState,
  BbtDataPoint,
} from '../types';

export const INITIAL_DAYS: CycleDay[] = [
  {
    id: 'day-18',
    month: 'Jun',
    dayNumber: 18,
    cycleDay: 28,
    phase: 'luteal',
    indicatorType: 'droplet',
    indicatorColor: '#F87171',
    isLogged: true,
  },
  {
    id: 'day-19',
    month: 'Jun',
    dayNumber: 19,
    cycleDay: 29,
    phase: 'luteal',
    indicatorType: 'droplet',
    indicatorColor: '#F87171',
    isLogged: true,
  },
  {
    id: 'day-20',
    month: 'Jun',
    dayNumber: 20,
    cycleDay: 30,
    phase: 'luteal',
    indicatorType: 'circle',
    indicatorColor: '#93C5FD',
    isLogged: true,
  },
  {
    id: 'day-21',
    month: 'Jun',
    dayNumber: 21,
    cycleDay: 1,
    phase: 'follicular',
    isSelected: true,
    indicatorType: 'dot',
    indicatorColor: '#955BE3',
    isLogged: true,
  },
  {
    id: 'day-22',
    month: 'Jun',
    dayNumber: 22,
    cycleDay: 2,
    phase: 'follicular',
    indicatorType: 'dot',
    indicatorColor: '#E5E7EB',
    isLogged: false,
  },
  {
    id: 'day-23',
    month: 'Jun',
    dayNumber: 23,
    cycleDay: 3,
    phase: 'follicular',
    indicatorType: 'dot',
    indicatorColor: '#E5E7EB',
    isLogged: false,
  },
  {
    id: 'day-24',
    month: 'Jun',
    dayNumber: 24,
    cycleDay: 4,
    phase: 'follicular',
    indicatorType: 'dot',
    indicatorColor: '#E5E7EB',
    isLogged: false,
  },
];

export const INITIAL_BODY_CHANGES: BodyChangesState = {
  glowRating: 4,
  acne: 'Minimal',
  oiliness: 'Normal',
  texture: 'Smooth',
  digestiveStatus: 'Normal',
  bloating: 'Mild',
  constipation: 'None',
  appetite: 'Healthy',
};

export const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act-1',
    name: 'Walking',
    type: 'walking',
    durationMin: 32,
    targetMin: 40,
    gradientFrom: '#FA7EBA',
    gradientTo: '#B91075',
    caloriesBurned: 145,
  },
  {
    id: 'act-2',
    name: 'Cardio',
    type: 'cardio',
    durationMin: 15,
    targetMin: 30,
    gradientFrom: '#FB923C',
    gradientTo: '#EF4444',
    caloriesBurned: 120,
  },
  {
    id: 'act-3',
    name: 'Yoga',
    type: 'yoga',
    durationMin: 0,
    targetMin: 30,
    gradientFrom: '#C084FC',
    gradientTo: '#9333EA',
    caloriesBurned: 0,
  },
  {
    id: 'act-4',
    name: 'Strength Training',
    type: 'strength',
    durationMin: 0,
    targetMin: 30,
    gradientFrom: '#60A5FA',
    gradientTo: '#2563EB',
    caloriesBurned: 0,
  },
];

export const ENERGY_TREND_DATA = [
  { day: 'Mon', fullDay: 'Monday', heightPercent: 40, heightPx: 26, energyLevel: 'Moderate (40%)' },
  { day: 'Tue', fullDay: 'Tuesday', heightPercent: 55, heightPx: 35, energyLevel: 'Good (55%)' },
  { day: 'Wed', fullDay: 'Wednesday', heightPercent: 45, heightPx: 29, energyLevel: 'Moderate (45%)' },
  { day: 'Thu', fullDay: 'Thursday', heightPercent: 60, heightPx: 38, energyLevel: 'High (60%)' },
  { day: 'Fri', fullDay: 'Friday', heightPercent: 70, heightPx: 45, energyLevel: 'High (70%)' },
  { day: 'Sat', fullDay: 'Saturday', heightPercent: 75, heightPx: 48, energyLevel: 'Peak (75%)' },
  { day: 'Today', fullDay: 'Sunday (Today)', heightPercent: 85, heightPx: 54, energyLevel: 'Surging (85%)' },
];

export const INITIAL_WELLNESS_METRICS: WellnessMetricsState = {
  sleepHours: 7.2,
  sleepQuality: 'Restful',
  mood: 'Good',
  waterCurrentL: 2.1,
  waterTargetL: 2.5,
  steps: 6245,
  weightKg: 58.5,
  sexActivity: 'Not Logged',
};

export const INITIAL_CONNECTED_DEVICES: ConnectedDevice[] = [
  {
    id: 'dev-1',
    name: 'Smart Watch',
    type: 'watch',
    lastSyncedText: 'Synced · 2m ago',
    isSynced: true,
    batteryLevel: 88,
  },
  {
    id: 'dev-2',
    name: 'Thermometer',
    type: 'thermometer',
    lastSyncedText: 'Synced · 2m ago',
    isSynced: true,
    batteryLevel: 94,
  },
  {
    id: 'dev-3',
    name: 'Scale',
    type: 'scale',
    lastSyncedText: 'Synced 2m ago',
    isSynced: true,
    batteryLevel: 76,
  },
];

export const INSIGHTS_LIST = [
  'You are on your period day 1.',
  "It's normal to feel low energy.",
  'Stay hydrated and take rest.',
  'Light exercise like walking may help with cramps.',
];

export const INITIAL_BBT_TREND: BbtDataPoint[] = [
  { id: 'bbt-18', day: 'Wed', cycleDay: 28, dateStr: '18 Jun', tempC: 36.35 },
  { id: 'bbt-19', day: 'Thu', cycleDay: 29, dateStr: '19 Jun', tempC: 36.30 },
  { id: 'bbt-20', day: 'Fri', cycleDay: 30, dateStr: '20 Jun', tempC: 36.25 },
  { id: 'bbt-21', day: 'Today', cycleDay: 1, dateStr: '21 Jun', tempC: 36.40, isToday: true },
  { id: 'bbt-22', day: 'Mon', cycleDay: 2, dateStr: '22 Jun', tempC: 36.38 },
  { id: 'bbt-23', day: 'Tue', cycleDay: 3, dateStr: '23 Jun', tempC: 36.42 },
  { id: 'bbt-24', day: 'Wed', cycleDay: 4, dateStr: '24 Jun', tempC: 36.45 },
];

export const INITIAL_FERTILITY_STATE: FertilityTrackingState = {
  cervicalMucus: 'creamy',
  bbtTempC: 36.40,
  bbtTrend: INITIAL_BBT_TREND,
  lhTest: 'low',
  libido: 'medium',
};
