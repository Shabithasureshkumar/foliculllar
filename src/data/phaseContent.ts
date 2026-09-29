import type { PhaseType } from '../types';
import womanCheering from '../assets/woman_cheering.png';
import womanResting from '../assets/meditation.png';

export interface PhaseIllustration {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Largest on-screen width (px) before the bitmap would look soft */
  maxWidth: number;
}

const CHEERING: PhaseIllustration = { src: womanCheering, alt: 'Woman celebrating with raised arms', width: 888, height: 688, maxWidth: 230 };
const RESTING: PhaseIllustration = { src: womanResting, alt: 'Woman relaxing cross-legged in meditation', width: 82, height: 90, maxWidth: 124 };

export interface PhaseContent {
  /** Short name for badges, e.g. "Follicular" */
  badge: string;
  heroTitle: string;
  heroText: string;
  tips: string;
  insight: { text: string; chips: [string, string] };
  recommendation: { text: string; chips: Array<{ label: string; emoji: string }> };
  hormone: { title: string; desc: string };
  /** Fallback line for the BBT card when no thermal shift is detected */
  bbtNote: string;
  /** Status ring + status text colours */
  accent: { ring: string; track: string; text: string };
  illustration: PhaseIllustration;
}

export const PHASE_CONTENT: Record<PhaseType, PhaseContent> = {
  menstruation: {
    badge: 'Menstrual',
    heroTitle: "You're in your menstrual phase",
    heroText:
      'Your uterine lining is shedding and hormone levels are at their lowest. It is normal to feel tired or crampy. Prioritise rest, warmth and iron-rich foods.',
    tips: 'Use gentle heat for cramps, keep hydrated, and choose iron-rich foods such as leafy greens and lentils.',
    insight: {
      text: 'Hormones are at their lowest point of the cycle. Your body benefits from restorative rest, gentle movement and extra iron today.',
      chips: ['Recovery Window', 'Iron Focus'],
    },
    recommendation: {
      text: 'Be gentle with yourself today. Rest when you need to, stay warm and hydrated, and log your flow so Ava can track your period pattern.',
      chips: [
        { label: 'Hydrate', emoji: '💧' },
        { label: 'Warm compress', emoji: '🔥' },
        { label: 'Sleep 8h', emoji: '😴' },
      ],
    },
    hormone: {
      title: 'Hormones are at their lowest',
      desc: 'Estrogen and progesterone drop at the start of your cycle, which triggers menstruation and can lower energy.',
    },
    bbtNote: 'Temperature usually drops back to baseline as your period begins.',
    accent: { ring: '#F43F5E', track: '#FFE4E6', text: '#E11D48' }, illustration: RESTING,
  },
  follicular: {
    badge: 'Follicular',
    heroTitle: "You're in your follicular phase",
    heroText:
      'Your body is preparing for ovulation. Estrogen levels are rising, and you may notice more energy and a brighter mood. This is a great time to focus on healthy habits!',
    tips: 'Ideal time for strength training, meal prepping, trying new things and social connection.',
    insight: {
      text: 'High neuroplasticity detected today. Your focus and cognitive flexibility are at peak follicular efficiency. Perfect time for strategic planning and learning complex concepts.',
      chips: ['Deep Focus Window', '+24% Stamina'],
    },
    recommendation: {
      text: "You're doing great! Take rest, stay hydrated, and be kind to yourself. Your energy may be gradually increasing. Stay hydrated, choose nutritious foods, stay active, and continue tracking BBT and cervical mucus as you approach your fertile window.",
      chips: [
        { label: 'Hydrate', emoji: '💧' },
        { label: 'Gentle walk', emoji: '🚶‍♀️' },
        { label: 'Sleep 8h', emoji: '😴' },
      ],
    },
    hormone: {
      title: 'Estrogen is rising',
      desc: 'Estrogen steadily rises in the follicular phase, stimulating follicle maturation and boosting natural vitality.',
    },
    bbtNote: 'Low, steady readings are expected before ovulation.',
    accent: { ring: '#8B5CF6', track: '#EDE4FF', text: '#A855F7' }, illustration: CHEERING,
  },
  fertile: {
    badge: 'Fertile',
    heroTitle: "You're in your fertile window",
    heroText:
      'Estrogen is near its peak and ovulation is approaching. Watch for egg-white cervical mucus and a rising LH test line over the next few days.',
    tips: 'Test LH once or twice daily, note cervical mucus changes, and keep logging BBT every morning.',
    insight: {
      text: 'Estrogen is approaching its peak. Energy, confidence and verbal fluency are typically at their highest in the days leading up to ovulation.',
      chips: ['Peak Energy', 'LH Watch'],
    },
    recommendation: {
      text: 'Your fertile window is open. Test LH daily, keep an eye on cervical mucus, and stay hydrated to support healthy mucus production.',
      chips: [
        { label: 'Hydrate', emoji: '💧' },
        { label: 'Test LH', emoji: '🧪' },
        { label: 'Sleep 8h', emoji: '😴' },
      ],
    },
    hormone: {
      title: 'Estrogen is peaking',
      desc: 'Peak estrogen triggers the LH surge that releases an egg, usually within 24–36 hours.',
    },
    bbtNote: 'Temperature is still low; a sustained rise will confirm ovulation.',
    accent: { ring: '#3B82F6', track: '#DBEAFE', text: '#2563EB' }, illustration: CHEERING,
  },
  ovulation: {
    badge: 'Ovulation',
    heroTitle: "You're in your ovulation phase",
    heroText:
      'An egg is being released. LH has surged and estrogen is at its peak. You may notice egg-white mucus, a slight temperature rise and higher libido.',
    tips: 'Log your LH result and BBT today; a sustained 0.3–0.5°C rise over the next days confirms ovulation.',
    insight: {
      text: 'Ovulation is underway. Communication and social energy tend to peak now; your body temperature will shift upward over the next 1–2 days.',
      chips: ['Ovulation Day', 'Social Peak'],
    },
    recommendation: {
      text: 'This is your most fertile time. Keep tracking BBT to confirm the thermal shift, stay active and hydrated, and note any mid-cycle discomfort.',
      chips: [
        { label: 'Hydrate', emoji: '💧' },
        { label: 'Log BBT', emoji: '🌡️' },
        { label: 'Sleep 8h', emoji: '😴' },
      ],
    },
    hormone: {
      title: 'LH has surged',
      desc: 'The luteinising hormone surge releases the egg; progesterone begins to rise straight after.',
    },
    bbtNote: 'Expect a sustained rise of 0.3–0.5°C after ovulation.',
    accent: { ring: '#22C55E', track: '#DCFCE7', text: '#16A34A' }, illustration: CHEERING,
  },
  luteal: {
    badge: 'Luteal',
    heroTitle: "You're in your luteal phase",
    heroText:
      'Your body is preparing for menstruation. You may notice changes in mood, fatigue, cravings and sleep during this phase.',
    tips: 'Favour complex carbs and magnesium-rich foods, keep workouts moderate, and protect your sleep.',
    insight: {
      text: 'Progesterone is dominant. Your body burns slightly more energy at rest, so steady meals and calming routines help keep mood and focus balanced.',
      chips: ['Steady Energy', 'Calm Focus'],
    },
    recommendation: {
      text: 'Slow down a little. Choose nourishing meals, moderate exercise and consistent sleep, and keep logging symptoms to spot PMS patterns.',
      chips: [
        { label: 'Hydrate', emoji: '💧' },
        { label: 'Gentle yoga', emoji: '🧘‍♀️' },
        { label: 'Sleep 8h', emoji: '😴' },
      ],
    },
    hormone: {
      title: 'Progesterone is higher',
      desc: 'Progesterone typically rises during the luteal phase and may contribute to changes in body temperature, mood and energy.',
    },
    bbtNote: 'Higher readings are normal after ovulation.',
    accent: { ring: '#EC4899', track: '#FCE7F3', text: '#EC4899' }, illustration: RESTING,
  },
};
