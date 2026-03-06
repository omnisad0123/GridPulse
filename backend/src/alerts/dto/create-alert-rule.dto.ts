import { AlertRuleKind } from '../../database/entities/alert-rule.entity';

export interface CreateAlertRuleDto {
  name: string;
  kind: AlertRuleKind;
  threshold: number;
  enabled?: boolean;
}
