import type { ProtectionMethod } from '../types';

export const PROTECTION_LABELS: Record<ProtectionMethod, string> = {
  pill: 'Pill',
  condom: 'Condom',
  none: 'None',
  other: 'Other',
};

export const PROTECTION_OPTIONS = Object.keys(PROTECTION_LABELS) as ProtectionMethod[];
