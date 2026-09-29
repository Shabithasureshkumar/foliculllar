import type { FollicularDailyLogData, PhaseType } from '../types';
import { PHASE_CONTENT } from '../data/phaseContent';
import { PHASE_RANGES } from '../utils/calendarUtils';

export interface AvaContext {
  phase: PhaseType;
  phaseLabel: string;
  cycleDay: number;
  dateLabel: string;
  log: FollicularDailyLogData;
  /** Cycle days until the next period (for timing questions) */
  daysUntilPeriod: number;
}

type Logged<K extends keyof FollicularDailyLogData> = NonNullable<FollicularDailyLogData[K]>;

const MUCUS_LABEL: Record<Logged<'cervicalMucus'>, string> = {
  dry: 'dry',
  sticky: 'sticky',
  creamy: 'creamy',
  watery: 'watery',
  egg_white: 'egg-white',
};

const LH_LABEL: Record<Logged<'lhTest'>, string> = {
  negative: 'negative (< 10 mIU)',
  low: 'low (10–25 mIU)',
  high: 'high (25–40 mIU)',
  peak: 'peak (≥ 40 mIU)',
};

// Fertile window + ovulation span in the app's cycle model (see PHASE_RANGES)
const FERTILE_START = PHASE_RANGES.find((r) => r.phase === 'fertile')?.start ?? 12;
const OVULATION_END = PHASE_RANGES.find((r) => r.phase === 'ovulation')?.end ?? 15;

const notLogged = (what: string, dateLabel: string) =>
  `You haven't logged ${what} for ${dateLabel} yet. Add it in the Daily Log and I can interpret it for you.`;

export const AVA_DISCLAIMER = 'Ava shares general wellness information from your logs and is not a substitute for medical advice.';

export const suggestedQuestions = (phase: PhaseType): string[] => {
  const base = ['What does my BBT mean?', 'Is my cervical mucus normal?', 'How should I read my LH test?'];
  if (phase === 'menstruation') return ['How can I ease cramps?', ...base.slice(0, 2)];
  if (phase === 'luteal') return ['Why is my energy lower?', ...base.slice(0, 2)];
  return [`What happens in the ${PHASE_CONTENT[phase].badge.toLowerCase()} phase?`, ...base.slice(0, 2)];
};

// Matches keywords at the start of a word, so "lh" doesn't fire on "health" or "day" on "today"
const has = (q: string, words: string[]) =>
  words.some((w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(q));

const bbtAnswer = ({ log, phase, dateLabel }: AvaContext): string => {
  if (log.bbtTempC === null) return notLogged('a basal body temperature', dateLabel);
  const t = log.bbtTempC.toFixed(2);
  const inPreOvRange = log.bbtTempC >= 36.1 && log.bbtTempC <= 36.6;
  const lead = `Your logged BBT is ${t}°C (${log.bbtTime}, ${log.bbtDevice}).`;
  if (phase === 'menstruation' || phase === 'follicular' || phase === 'fertile') {
    return `${lead} ${
      inPreOvRange
        ? 'That sits in the typical pre-ovulatory range of about 36.1–36.6°C.'
        : 'That is outside the usual pre-ovulatory range of about 36.1–36.6°C, so double-check it was taken right after waking, before getting up.'
    } A sustained rise of 0.3–0.5°C for three days in a row usually confirms that ovulation has happened.`;
  }
  return `${lead} After ovulation, progesterone keeps temperatures about 0.3–0.5°C higher than your follicular baseline. If readings stay high for more than 18 days, consider a pregnancy test.`;
};

const mucusAnswer = ({ log, phase, dateLabel }: AvaContext): string => {
  const m = log.cervicalMucus;
  if (m === null) return notLogged('cervical mucus', dateLabel);
  const meaning: Record<Logged<'cervicalMucus'>, string> = {
    dry: 'Dry days usually mean low estrogen and low fertility.',
    sticky: 'Sticky, tacky mucus is common early in the follicular phase and suggests low fertility.',
    creamy: 'Creamy, lotion-like mucus is a transitional sign that estrogen is rising and ovulation is getting closer.',
    watery: 'Watery, clear mucus points to high fertility; ovulation is likely within a few days.',
    egg_white: 'Stretchy egg-white mucus is your peak fertility sign; ovulation is usually within 1–2 days.',
  };
  const phaseNote =
    phase === 'follicular'
      ? ' In the follicular phase it normally progresses dry → sticky → creamy → watery → egg-white.'
      : phase === 'luteal'
        ? ' In the luteal phase mucus typically dries up or turns sticky again.'
        : '';
  return `For ${dateLabel} you logged ${MUCUS_LABEL[m]} cervical mucus. ${meaning[m]}${phaseNote} See your clinician if you notice a strong odour, itching, or green/grey discharge.`;
};

const lhAnswer = ({ log, dateLabel }: AvaContext): string => {
  const r = log.lhTest;
  if (r === null) return notLogged('an LH / ovulation test result', dateLabel);
  const meaning: Record<Logged<'lhTest'>, string> = {
    negative: 'No surge yet. Keep testing once a day around the same time (early afternoon is ideal).',
    low: 'The test line is visible but lighter than the control line, so the surge has not started. Test again tomorrow; many people test twice daily as the line darkens.',
    high: 'The line is getting close to the control line. A surge is likely within about 24–48 hours, so test twice a day.',
    peak: 'This is an LH surge: ovulation typically follows within 24–36 hours. This and the next day are your most fertile.',
  };
  return `Your OPK result for ${dateLabel} is ${LH_LABEL[r]}. ${meaning[r]}`;
};

const libidoAnswer = ({ log, phase, dateLabel }: AvaContext): string => {
  if (log.libido === null) return notLogged('your libido level', dateLabel);
  const trend =
    phase === 'fertile' || phase === 'ovulation'
      ? 'Libido naturally peaks around ovulation as estrogen and testosterone rise.'
      : phase === 'follicular'
        ? 'Libido usually builds through the follicular phase as estrogen climbs.'
        : phase === 'luteal'
          ? 'Progesterone often lowers desire during the luteal phase.'
          : 'Desire is often lower during your period, though some people notice an increase.';
  return `You logged ${log.libido} libido for ${dateLabel}. ${trend} Changes from cycle to cycle are normal.`;
};

const moodEnergyAnswer = ({ log, phase, dateLabel }: AvaContext): string => {
  if (log.mood === null && log.energyLevel === null) return notLogged('your mood or energy', dateLabel);
  const phaseLine: Record<PhaseType, string> = {
    menstruation: 'Low hormone levels during your period can make you feel flat or tired.',
    follicular: 'Rising estrogen usually lifts mood and energy as the follicular phase goes on.',
    fertile: 'Estrogen is near its peak, which often brings your best energy and confidence.',
    ovulation: 'Energy is typically high around ovulation, though some notice a brief dip afterwards.',
    luteal: 'Progesterone can make you feel calmer but also more tired or irritable, especially close to your period.',
  };
  const logged = [
    log.mood !== null ? `your mood as ${log.mood.toLowerCase()}` : null,
    log.energyLevel !== null ? `${log.energyLevel.toLowerCase()} energy` : null,
  ]
    .filter(Boolean)
    .join(' with ');
  const care =
    log.mood === 'Sad' || log.mood === 'Irritable' || log.energyLevel === 'Low'
      ? ' Try steady meals, daylight, a gentle walk and an earlier night. If low mood lasts for two weeks or more, talk to your clinician.'
      : ' Keep doing what is working: regular sleep, movement and hydration.';
  return `You logged ${logged}. ${phaseLine[phase]}${care}`;
};

const medicationAnswer = ({ log, dateLabel }: AvaContext): string => {
  if (log.medications.length === 0) {
    return `You have no medications logged for ${dateLabel}. Use "+ Log" in the Medication card to add one; it will then appear in your Medication History.`;
  }
  const list = log.medications
    .map((m) => `${m.name}${m.dosage ? ` (${m.dosage})` : ''} – ${m.status === 'pending' ? 'not marked yet' : m.status}`)
    .join('; ');
  return `For ${dateLabel} you have: ${list}. Mark each one as Taken or Skipped so your history stays accurate. I can't recommend doses or changes, so please check those with your prescriber.`;
};

const symptomAnswer = ({ log, phase }: AvaContext): string => {
  const period = log.periodLog
    ? ` You logged ${log.periodLog.flow.toLowerCase()} flow with ${log.periodLog.cramps.toLowerCase()} cramps${log.periodLog.clots ? ' and clots' : ''}.`
    : '';
  const phaseTip: Record<PhaseType, string> = {
    menstruation: 'For cramps, heat on the lower abdomen, gentle movement and staying hydrated can help.',
    follicular: 'The follicular phase is usually the most symptom-free part of the cycle; leftover cramps from your period should fade within a few days.',
    fertile: 'Some people notice mild bloating, breast tenderness or a one-sided twinge as ovulation approaches.',
    ovulation: 'A brief one-sided twinge (mittelschmerz), light spotting or bloating around ovulation is common.',
    luteal: 'Bloating, breast tenderness, headaches and cravings are common PMS symptoms late in the luteal phase.',
  };
  return `${phaseTip[phase]}${period} Seek care promptly for severe pain, soaking a pad or tampon every hour, clots larger than a coin, fever, or bleeding between periods.`;
};

const phaseAnswer = (ctx: AvaContext): string => {
  const content = PHASE_CONTENT[ctx.phase];
  const timing =
    ctx.phase === 'menstruation'
      ? ''
      : ` Based on a 28-day cycle, your next period is expected in about ${ctx.daysUntilPeriod} day${ctx.daysUntilPeriod === 1 ? '' : 's'}.`;
  return `You're on cycle day ${ctx.cycleDay}, in your ${ctx.phaseLabel.toLowerCase()}. ${content.heroText}${timing}`;
};

const fertilityAnswer = (ctx: AvaContext): string => {
  const { phase, log, cycleDay } = ctx;
  const daysToWindow = FERTILE_START - cycleDay;
  const window =
    phase === 'fertile' || phase === 'ovulation'
      ? 'You are in your fertile window now.'
      : phase === 'luteal'
        ? 'Your fertile window has likely passed for this cycle.'
        : `Your fertile window is expected around cycle days ${FERTILE_START}–${OVULATION_END}, about ${daysToWindow} day${daysToWindow === 1 ? '' : 's'} from now.`;
  const signs = [
    log.cervicalMucus !== null ? `${MUCUS_LABEL[log.cervicalMucus]} mucus` : null,
    log.lhTest !== null ? `LH ${LH_LABEL[log.lhTest]}` : null,
    log.bbtTempC !== null ? `BBT ${log.bbtTempC.toFixed(2)}°C` : null,
  ].filter(Boolean);
  const logged = signs.length
    ? ` Signs logged for ${ctx.dateLabel}: ${signs.join(', ')}.`
    : ` No fertility signs are logged for ${ctx.dateLabel} yet.`;
  return `${window}${logged} Watery or egg-white mucus plus a high/peak LH test are the strongest signs that ovulation is near.`;
};

const lifestyleAnswer = (ctx: AvaContext): string => {
  const content = PHASE_CONTENT[ctx.phase];
  return `${content.tips} ${content.recommendation.text}`;
};

const summaryAnswer = (ctx: AvaContext): string => {
  const { log } = ctx;
  const parts = [
    log.bbtTempC !== null ? `BBT ${log.bbtTempC.toFixed(2)}°C` : null,
    log.cervicalMucus !== null ? `${MUCUS_LABEL[log.cervicalMucus]} cervical mucus` : null,
    log.lhTest !== null ? `LH ${LH_LABEL[log.lhTest]}` : null,
    log.libido !== null ? `${log.libido} libido` : null,
    log.mood !== null ? `mood ${log.mood.toLowerCase()}` : null,
    log.energyLevel !== null ? `energy ${log.energyLevel.toLowerCase()}` : null,
    log.medications.length
      ? `${log.medications.filter((m) => m.status === 'taken').length}/${log.medications.length} medications taken`
      : null,
  ].filter(Boolean);
  const head = `Here's your ${ctx.dateLabel} summary (cycle day ${ctx.cycleDay}, ${ctx.phaseLabel.toLowerCase()})`;
  return parts.length ? `${head}: ${parts.join(', ')}. Ask me about any of these.` : `${head}: nothing is logged yet.`;
};

/** Answers a free-text question using the user's current cycle phase and logged data. */
export const answerQuestion = (question: string, ctx: AvaContext): string => {
  const q = question.toLowerCase();
  if (has(q, ['bbt', 'temperature', 'temp', 'thermometer', 'thermal'])) return bbtAnswer(ctx);
  if (has(q, ['mucus', 'discharge', 'cervical', 'egg white', 'egg-white'])) return mucusAnswer(ctx);
  if (has(q, ['lh', 'opk', 'ovulation test', 'test line', 'strip', 'surge'])) return lhAnswer(ctx);
  if (has(q, ['libido', 'sex', 'desire', 'drive', 'intimacy'])) return libidoAnswer(ctx);
  if (has(q, ['medic', 'pill', 'tablet', 'ibuprofen', 'mefenamic', 'supplement', 'dose'])) return medicationAnswer(ctx);
  if (has(q, ['cramp', 'pain', 'symptom', 'bloat', 'headache', 'clot', 'bleed', 'spotting', 'flow'])) return symptomAnswer(ctx);
  if (has(q, ['mood', 'feel', 'irritab', 'sad', 'anxious', 'energy', 'tired', 'fatigue', 'sleep'])) return moodEnergyAnswer(ctx);
  if (has(q, ['fertile', 'pregnan', 'conceive', 'ovulat', 'ttc'])) return fertilityAnswer(ctx);
  if (has(q, ['eat', 'food', 'diet', 'nutrition', 'exercise', 'workout', 'tip', 'should i', 'habit'])) return lifestyleAnswer(ctx);
  if (has(q, ['summary', 'today', 'logged', 'data', 'how am i', 'overview'])) return summaryAnswer(ctx);
  if (has(q, ['phase', 'follicular', 'luteal', 'menstrua', 'cycle', 'period', 'day', 'when', 'next'])) return phaseAnswer(ctx);
  return `I can help with your cycle tracking: BBT, cervical mucus, LH tests, libido, mood and energy, symptoms, medications and what to expect in your ${ctx.phaseLabel.toLowerCase()}. ${summaryAnswer(ctx)}`;
};
