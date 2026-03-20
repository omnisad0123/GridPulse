import { average, isNonNegativeFinite, round, safeDivide, toNumber } from './numeric.util';

describe('numeric.util', () => {
  it('converts strings and numbers to numeric values', () => {
    expect(toNumber('12.5')).toBe(12.5);
    expect(toNumber(4)).toBe(4);
    expect(Number.isNaN(toNumber(''))).toBe(true);
  });

  it('rounds numbers to a fixed precision', () => {
    expect(round(1.23456, 2)).toBe(1.23);
    expect(round(1.23556, 2)).toBe(1.24);
  });

  it('checks non-negative finite values', () => {
    expect(isNonNegativeFinite(0)).toBe(true);
    expect(isNonNegativeFinite('4')).toBe(true);
    expect(isNonNegativeFinite(-1)).toBe(false);
    expect(isNonNegativeFinite(Number.POSITIVE_INFINITY)).toBe(false);
  });

  it('divides safely without returning infinity', () => {
    expect(safeDivide(10, 2)).toBe(5);
    expect(safeDivide(10, 0)).toBeNull();
    expect(safeDivide(Number.NaN, 2)).toBeNull();
  });

  it('averages only finite values and returns null for empty inputs', () => {
    expect(average([1, 2, 3])).toBe(2);
    expect(average([1, Number.NaN, 3])).toBe(2);
    expect(average([])).toBeNull();
  });
});
