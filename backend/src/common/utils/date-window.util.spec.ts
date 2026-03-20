import { getWindowStart, hoursWindow, isWithinWindow, parseTimestamp } from './date-window.util';

describe('date-window.util', () => {
  const now = new Date('2026-02-09T12:00:00Z');

  it('computes a default 24 hour window', () => {
    expect(getWindowStart(undefined, now).toISOString()).toBe('2026-02-08T12:00:00.000Z');
  });

  it('clamps overly large hour values to seven days', () => {
    const window = hoursWindow(300, now);
    expect(window.hours).toBe(168);
    expect(window.from.toISOString()).toBe('2026-02-02T12:00:00.000Z');
  });

  it('clamps invalid hour values to one hour', () => {
    const window = hoursWindow(-20, now);
    expect(window.hours).toBe(1);
    expect(window.from.toISOString()).toBe('2026-02-09T11:00:00.000Z');
  });

  it('parses valid timestamps and rejects invalid values', () => {
    expect(parseTimestamp('2026-02-09T10:00:00Z')?.toISOString()).toBe('2026-02-09T10:00:00.000Z');
    expect(parseTimestamp('bad')).toBeNull();
    expect(parseTimestamp(null)).toBeNull();
  });

  it('checks whether timestamps sit inside a closed interval', () => {
    expect(isWithinWindow(new Date('2026-02-09T11:00:00Z'), new Date('2026-02-09T10:00:00Z'), now)).toBe(true);
    expect(isWithinWindow(new Date('2026-02-09T09:59:59Z'), new Date('2026-02-09T10:00:00Z'), now)).toBe(false);
  });
});
