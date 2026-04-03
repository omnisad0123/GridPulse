export interface ReportMetric {
  label: string;
  value: number | string | null;
  unit?: string;
  description: string;
}

export interface EntityFreshness {
  entityId: string;
  entityType: 'meter' | 'vehicle';
  lastUpdated: Date;
  ageMinutes: number;
  state: 'fresh' | 'stale' | 'critical';
}

export interface OperationalReport {
  generatedAt: string;
  windowHours: number;
  metrics: ReportMetric[];
  staleEntities: EntityFreshness[];
  recommendations: string[];
}

export interface IngestionQualityReport {
  generatedAt: string;
  totalAuditEvents: number;
  ingestEvents: number;
  batchEvents: number;
  alertMutationEvents: number;
  exportEvents: number;
  newestEventAt: string | null;
  oldestEventAt: string | null;
}
