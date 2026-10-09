import type { PhaseType } from '../types';

export interface SymptomOption {
  id: string;
  label: string;
}

/** Id of the free-text option; its description lives in `otherSymptomText` */
export const OTHER_SYMPTOM_ID = 'other';
export const OTHER_SYMPTOM_MAX = 100;

const opt = (id: string, label: string): SymptomOption => ({ id, label });
const OTHER = opt(OTHER_SYMPTOM_ID, 'Other');

// Suggested tracking options per phase, not symptoms every user will experience
const FOLLICULAR: SymptomOption[] = [
  opt('increasing_energy', 'Increasing energy'),
  opt('improved_mood', 'Improved mood'),
  opt('mild_pelvic_discomfort', 'Mild pelvic discomfort'),
  opt('cervical_mucus_changes', 'Cervical mucus changes'),
  opt('increased_focus', 'Increased focus'),
  opt('libido_changes', 'Changes in libido'),
  opt('breast_tenderness', 'Breast tenderness'),
  opt('bloating', 'Bloating'),
  opt('mild_headache', 'Mild headache'),
  opt('skin_changes', 'Skin changes'),
  OTHER,
];

const OVULATION: SymptomOption[] = [
  opt('pelvic_ovulation_pain', 'Mild pelvic / ovulation pain'),
  opt('one_sided_pain', 'One-sided lower abdominal pain'),
  opt('cervical_mucus_changes', 'Cervical mucus changes'),
  opt('increased_libido', 'Increased libido'),
  opt('breast_tenderness', 'Breast tenderness'),
  opt('bloating', 'Bloating'),
  opt('light_spotting', 'Light spotting'),
  opt('mood_changes', 'Mood changes'),
  opt('increased_energy', 'Increased energy'),
  opt('headache', 'Headache'),
  OTHER,
];

const MENSTRUATION: SymptomOption[] = [
  opt('cramps', 'Cramps'),
  opt('lower_back_pain', 'Lower back pain'),
  opt('fatigue', 'Fatigue'),
  opt('headache', 'Headache'),
  opt('bloating', 'Bloating'),
  opt('breast_tenderness', 'Breast tenderness'),
  opt('nausea', 'Nausea'),
  opt('mood_changes', 'Mood changes'),
  OTHER,
];

const LUTEAL: SymptomOption[] = [
  opt('mood_changes', 'Mood changes'),
  opt('bloating', 'Bloating'),
  opt('breast_tenderness', 'Breast tenderness'),
  opt('food_cravings', 'Food cravings'),
  opt('fatigue', 'Fatigue'),
  opt('headache', 'Headache'),
  opt('acne', 'Acne'),
  opt('cramps', 'Cramps'),
  opt('trouble_sleeping', 'Trouble sleeping'),
  OTHER,
];

export const SYMPTOMS_BY_PHASE: Record<PhaseType, SymptomOption[]> = {
  menstruation: MENSTRUATION,
  follicular: FOLLICULAR,
  fertile: OVULATION,
  ovulation: OVULATION,
  luteal: LUTEAL,
};

const LABELS = new Map<string, string>();
for (const list of Object.values(SYMPTOMS_BY_PHASE)) for (const s of list) LABELS.set(s.id, s.label);

/** Every id any phase can produce, used to discard unknown values read from storage */
export const KNOWN_SYMPTOM_IDS: ReadonlySet<string> = new Set(LABELS.keys());

export const symptomLabel = (id: string): string => LABELS.get(id) ?? id;
