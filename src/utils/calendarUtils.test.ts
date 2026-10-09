import { describe, expect, it } from 'vitest';
import { PATIENT_PROFILE } from '../data/mockData';
import {
  addDays,
  calculateCycleInfo,
  clampToFollicular,
  generateDaysAround,
  getDefaultFollicularDate,
  parseDateKey,
  toDateKey,
} from './calendarUtils';

const anchor = PATIENT_PROFILE.lastPeriodStart;
const withCycleDay = (cd: number, cycleOffset = 0) =>
  addDays(anchor, (cd - 1) + cycleOffset * PATIENT_PROFILE.cycleLengthDays);

describe('phase resolution from the selected date', () => {
  it.each([
    [1, 'menstruation'], [5, 'menstruation'], [6, 'follicular'], [10, 'follicular'], [11, 'follicular'],
    [12, 'fertile'], [13, 'fertile'], [14, 'ovulation'], [15, 'ovulation'], [16, 'luteal'], [28, 'luteal'],
  ])('cycle day %i is %s in every cycle', (cd, phase) => {
    for (const cycle of [-3, 0, 1, 7]) {
      const info = calculateCycleInfo(withCycleDay(cd, cycle));
      expect(info.cycleDay).toBe(cd);
      expect(info.phase).toBe(phase);
    }
  });

  it('does not stay stale when switching dates repeatedly', () => {
    const seq = [10, 19, 13, 2, 15, 8, 28, 1, 10];
    const phases = seq.map((cd) => calculateCycleInfo(withCycleDay(cd)).phase);
    expect(phases).toEqual(['follicular', 'luteal', 'fertile', 'menstruation', 'ovulation', 'follicular', 'luteal', 'menstruation', 'follicular']);
  });

  it('rolls over month and year boundaries', () => {
    const d = new Date(2026, 11, 31);
    expect(toDateKey(addDays(d, 1))).toBe('day-2027-01-01');
    expect(calculateCycleInfo(addDays(d, 1)).cycleDay).toBe(calculateCycleInfo(d).cycleDay % 28 + 1);
  });
});

describe('date-only handling', () => {
  it('round-trips date keys without shifting the day', () => {
    for (const key of ['day-2026-01-01', 'day-2026-03-29', 'day-2026-10-25', 'day-2026-12-31']) {
      expect(toDateKey(parseDateKey(key)!)).toBe(key);
    }
    expect(parseDateKey('day-2026-06-31')).toBeNull();
  });
});

describe('follicular-only scope', () => {
  it('snaps every date to a follicular day of its own cycle', () => {
    for (let cd = 1; cd <= 28; cd++) {
      const clamped = clampToFollicular(withCycleDay(cd, 2));
      expect(calculateCycleInfo(clamped).phase).toBe('follicular');
    }
  });

  it('leaves follicular dates untouched', () => {
    const d = withCycleDay(8);
    expect(clampToFollicular(d)).toBe(d);
  });

  it('opens on CD10 when today is not follicular, and on today when it is', () => {
    const luteal = withCycleDay(19, 3);
    expect(calculateCycleInfo(getDefaultFollicularDate(luteal)).cycleDay).toBe(10);
    const fol = withCycleDay(7, 3);
    expect(getDefaultFollicularDate(fol)).toBe(fol);
  });

  it('day strip built from the selected date only contains follicular days once filtered', () => {
    const days = generateDaysAround(withCycleDay(6), 7, new Set()).filter((d) => d.phase === 'follicular');
    expect(days.every((d) => d.phase === 'follicular')).toBe(true);
    expect(days.some((d) => d.isSelected)).toBe(true);
  });
});
