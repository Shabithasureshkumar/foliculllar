import type { MedicationEntry, FollicularDailyLogData } from '../types';

// Patient whose cycle is being tracked (shown in the pink profile card)
export const PATIENT_PROFILE = {
  id: 'PT-000001',
  name: 'Jimmy Alexa',
  age: 38,
  gender: 'Female',
  heightCm: 165,
  weightKg: 58,
  cycleLengthDays: 28,
  // Anchor for cycle-day maths: first day of a known period (local date)
  lastPeriodStart: new Date(2026, 5, 1),
};

// Clinician shown in the top navigation
export const DOCTOR_PROFILE = { name: 'David Brock', role: 'General Physician' };

const INITIAL_MEDICATIONS: MedicationEntry[] = [
  {
    id: 'med-ib',
    name: 'Ibuprofen',
    dosage: '200 mg · Tablet',
    type: 'Tablet',
    status: 'pending',
    time: '08:00 AM',
  },
  {
    id: 'med-ma',
    name: 'Mefenamic Acid',
    dosage: '500 mg · Tablet',
    type: 'Tablet',
    status: 'pending',
    time: '01:00 PM',
  },
];

// First-run record for today's date so the Daily Log opens with the reference entries.
// cycleDay/dateStr are recalculated from the real date whenever the log is stored.
export const INITIAL_FOLLICULAR_LOG: FollicularDailyLogData = {
  cycleDay: 1,
  dateStr: '',
  bbtTempC: 36.40,
  bbtTime: '07:30 AM',
  bbtDevice: 'Connected Thermometer',
  bbtManualNotes: '',
  mood: 'Irritable',
  energyLevel: 'Low',
  cervicalMucus: 'creamy',
  lhTest: 'low',
  libido: 'medium',
  medications: INITIAL_MEDICATIONS,
  intercourse: null,
  protectionMethod: null,
  additionalDetails: '',
  symptoms: [],
  noSymptoms: false,
  otherSymptomText: '',
  symptomSeverity: null,
};
