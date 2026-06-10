export type RiskBand = 'low' | 'medium' | 'high' | 'critical';

export interface ScoreInput {
  freshnessMinutes?: number | null;
  anomalyCount?: number;
  highSeverityCount?: number;
  utilizationPercent?: number;
  lossPercent?: number | null;
}

export interface ScoreResult {
  score: number;
  band: RiskBand;
  reasons: string[];
}

export function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(Math.round(value), 0), 100);
}

export function riskBand(score: number): RiskBand {
  if (score >= 90) return 'critical';
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

export function freshnessPenalty(minutes?: number | null): number {
  if (minutes == null) return 35;
  if (minutes <= 15) return 0;
  if (minutes <= 30) return 10;
  if (minutes <= 120) return 25;
  return 45;
}

export function utilizationPenalty(utilizationPercent = 0): number {
  if (utilizationPercent >= 100) return 35;
  if (utilizationPercent >= 90) return 25;
  if (utilizationPercent >= 75) return 15;
  if (utilizationPercent >= 60) return 8;
  return 0;
}

export function lossPenalty(lossPercent?: number | null): number {
  if (lossPercent == null) return 5;
  const absolute = Math.abs(lossPercent);
  if (absolute >= 0.35) return 30;
  if (absolute >= 0.2) return 20;
  if (absolute >= 0.1) return 10;
  return 0;
}

export function anomalyPenalty(anomalyCount = 0, highSeverityCount = 0): number {
  return Math.min(anomalyCount * 4 + highSeverityCount * 12, 40);
}

export function operationsScore(input: ScoreInput): ScoreResult {
  const reasons: string[] = [];
  const freshness = freshnessPenalty(input.freshnessMinutes);
  const utilization = utilizationPenalty(input.utilizationPercent);
  const loss = lossPenalty(input.lossPercent);
  const anomalies = anomalyPenalty(input.anomalyCount, input.highSeverityCount);
  if (freshness) reasons.push(`freshness penalty ${freshness}`);
  if (utilization) reasons.push(`utilization penalty ${utilization}`);
  if (loss) reasons.push(`loss penalty ${loss}`);
  if (anomalies) reasons.push(`anomaly penalty ${anomalies}`);
  const score = clampScore(freshness + utilization + loss + anomalies);
  return {
    score,
    band: riskBand(score),
    reasons: reasons.length ? reasons : ['no operational risk penalties'],
  };
}

export function compareScores(previous: ScoreResult, current: ScoreResult): 'improved' | 'worsened' | 'unchanged' {
  if (current.score < previous.score) return 'improved';
  if (current.score > previous.score) return 'worsened';
  return 'unchanged';
}
