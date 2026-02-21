export const DAY_MS = 24 * 60 * 60 * 1000;

export function parseTimestamp(value: unknown): Date | null {
  if (typeof value !== 'string') {
    return null;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function last24Hours(now = new Date()): { from: Date; to: Date } {
  return {
    from: new Date(now.getTime() - DAY_MS),
    to: now,
  };
}

export function isWithinWindow(timestamp: Date, from: Date, to: Date): boolean {
  const time = timestamp.getTime();
  return time >= from.getTime() && time <= to.getTime();
}
