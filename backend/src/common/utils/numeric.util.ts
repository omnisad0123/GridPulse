export function toNumber(value: unknown): number {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string' && value.trim() !== '') {
    return Number(value);
  }
  return Number.NaN;
}

export function round(value: number, digits = 3): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function isNonNegativeFinite(value: unknown): boolean {
  const parsed = toNumber(value);
  return Number.isFinite(parsed) && parsed >= 0;
}
