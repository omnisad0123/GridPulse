export interface SlaPolicy {
  id: string;
  entityType: 'meter' | 'vehicle';
  maxTelemetryAgeMinutes: number;
  warningAgeMinutes: number;
  description: string;
}

export interface SlaViolation {
  entityId: string;
  entityType: 'meter' | 'vehicle';
  policyId: string;
  severity: 'warning' | 'breach';
  lastUpdated: Date | null;
  ageMinutes: number | null;
  message: string;
}

export interface SlaReport {
  generatedAt: string;
  policyCount: number;
  warningCount: number;
  breachCount: number;
  violations: SlaViolation[];
}
