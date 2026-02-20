export const DAY_MS = 24 * 60 * 60 * 1000;

export function parseTimestamp(value: unknown): Date | null {
  if (typeof value !== 'string') {
    return null;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function last24Hours(now = new Date()): { from: Date; to: Date } {
  return hoursWindow(24, now);
}

export function hoursWindow(hours = 24, now = new Date()): { from: Date; to: Date; hours: number } {
  const normalizedHours = Math.min(Math.max(Number(hours) || 24, 1), 168);
  return {
    from: new Date(now.getTime() - normalizedHours * 60 * 60 * 1000),
    to: now,
    hours: normalizedHours,
  };
}

export const getWindowStart = (hours = 24, now = new Date()): Date => hoursWindow(hours, now).from;

export function isWithinWindow(timestamp: Date, from: Date, to: Date): boolean {
  const time = timestamp.getTime();
  return time >= from.getTime() && time <= to.getTime();
}
