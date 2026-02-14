import { AlertRuleKind } from './alert-rule.entity';

export type AlertEntityType = 'meter' | 'vehicle';

export interface AlertEvent {
  id: string;
  ruleId: string;
  ruleKind: AlertRuleKind;
  entityType: AlertEntityType;
  entityId: string;
  measuredValue: number;
  threshold: number;
  message: string;
  createdAt: Date;
}
