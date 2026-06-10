export type AnomalySeverity = 'low' | 'medium' | 'high';
export type AnomalyKind = 'voltage_low' | 'voltage_high' | 'battery_hot' | 'soc_low' | 'efficiency_low';

export interface AnomalyRecord {
  id: string;
  kind: AnomalyKind;
  entityType: 'meter' | 'vehicle' | 'fleet';
  entityId: string;
  severity: AnomalySeverity;
  measuredValue: number;
  expectedRange: string;
  timestamp: Date;
  explanation: string;
}

export interface AnomalyScanResult {
  generatedAt: string;
  hours: number;
  total: number;
  high: number;
  medium: number;
  low: number;
  data: AnomalyRecord[];
}
