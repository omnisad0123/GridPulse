export type AlertRuleKind = 'HIGH_BATTERY_TEMP' | 'LOW_SOC' | 'VOLTAGE_ANOMALY';

export interface AlertRule {
  id: string;
  name: string;
  kind: AlertRuleKind;
  threshold: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
