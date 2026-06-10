import {
  anomalyPenalty,
  clampScore,
  compareScores,
  freshnessPenalty,
  lossPenalty,
  operationsScore,
  riskBand,
  utilizationPenalty,
} from './operations-score.util';

describe('operations-score.util', () => {
  it('clamps scores into a zero to one hundred range', () => {
    expect(clampScore(-20)).toBe(0);
    expect(clampScore(49.6)).toBe(50);
    expect(clampScore(140)).toBe(100);
    expect(clampScore(Number.NaN)).toBe(0);
  });

  it('maps scores to stable risk bands', () => {
    expect(riskBand(10)).toBe('low');
    expect(riskBand(45)).toBe('medium');
    expect(riskBand(75)).toBe('high');
    expect(riskBand(95)).toBe('critical');
  });

  it('penalizes stale or missing freshness data', () => {
    expect(freshnessPenalty(5)).toBe(0);
    expect(freshnessPenalty(20)).toBe(10);
    expect(freshnessPenalty(90)).toBe(25);
    expect(freshnessPenalty(180)).toBe(45);
    expect(freshnessPenalty(null)).toBe(35);
  });

  it('penalizes high utilization progressively', () => {
    expect(utilizationPenalty(30)).toBe(0);
    expect(utilizationPenalty(65)).toBe(8);
    expect(utilizationPenalty(80)).toBe(15);
    expect(utilizationPenalty(95)).toBe(25);
    expect(utilizationPenalty(105)).toBe(35);
  });

  it('penalizes reconciliation losses by absolute value', () => {
    expect(lossPenalty(0.02)).toBe(0);
    expect(lossPenalty(0.12)).toBe(10);
    expect(lossPenalty(-0.25)).toBe(20);
    expect(lossPenalty(0.4)).toBe(30);
    expect(lossPenalty(null)).toBe(5);
  });

  it('caps anomaly penalties', () => {
    expect(anomalyPenalty(1, 0)).toBe(4);
    expect(anomalyPenalty(2, 1)).toBe(20);
    expect(anomalyPenalty(100, 100)).toBe(40);
  });

  it('combines penalties into an operational score', () => {
    const result = operationsScore({
      freshnessMinutes: 130,
      anomalyCount: 2,
      highSeverityCount: 1,
      utilizationPercent: 92,
      lossPercent: 0.22,
    });
    expect(result.score).toBe(100);
    expect(result.band).toBe('critical');
    expect(result.reasons).toContain('freshness penalty 45');
    expect(result.reasons).toContain('utilization penalty 25');
  });

  it('emits a low score and explanatory default reason for healthy inputs', () => {
    const result = operationsScore({
      freshnessMinutes: 5,
      anomalyCount: 0,
      highSeverityCount: 0,
      utilizationPercent: 30,
      lossPercent: 0.02,
    });
    expect(result.score).toBe(0);
    expect(result.band).toBe('low');
    expect(result.reasons).toEqual(['no operational risk penalties']);
  });

  it('compares score movement', () => {
    expect(compareScores({ score: 20, band: 'low', reasons: [] }, { score: 10, band: 'low', reasons: [] })).toBe('improved');
    expect(compareScores({ score: 20, band: 'low', reasons: [] }, { score: 40, band: 'medium', reasons: [] })).toBe('worsened');
    expect(compareScores({ score: 20, band: 'low', reasons: [] }, { score: 20, band: 'low', reasons: [] })).toBe('unchanged');
  });
});
