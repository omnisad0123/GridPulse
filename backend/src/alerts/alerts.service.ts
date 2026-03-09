import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AlertRuleKind } from '../database/entities/alert-rule.entity';
import { MeterReading } from '../database/entities/meter-reading.entity';
import { VehicleReading } from '../database/entities/vehicle-reading.entity';
import { toNumber } from '../common/utils/numeric.util';
import { AuditService } from '../audit/audit.service';

const RULE_KINDS: AlertRuleKind[] = ['HIGH_BATTERY_TEMP', 'LOW_SOC', 'VOLTAGE_ANOMALY'];

@Injectable()
export class AlertsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly audit: AuditService,
  ) {}

  async createRule(body: any) {
    const kind = body?.kind as AlertRuleKind;
    const threshold = toNumber(body?.threshold);
    if (!body?.name || !RULE_KINDS.includes(kind) || !Number.isFinite(threshold)) {
      throw new BadRequestException('Alert rule requires name, supported kind, and numeric threshold');
    }
    const rule = await this.database.createAlertRule({
      name: String(body.name),
      kind,
      threshold,
      enabled: body.enabled !== false,
    });
    await this.audit.record('alert_rule.create', 'alert_rule', rule.id, { kind, threshold });
    return rule;
  }

  listRules() {
    return this.database.listAlertRules();
  }

  async updateRule(ruleId: string, body: any) {
    const update: any = {};
    if ('name' in body) update.name = String(body.name);
    if ('threshold' in body) {
      const threshold = toNumber(body.threshold);
      if (!Number.isFinite(threshold)) throw new BadRequestException('Threshold must be numeric');
      update.threshold = threshold;
    }
    if ('enabled' in body) update.enabled = Boolean(body.enabled);
    const updated = await this.database.updateAlertRule(ruleId, update);
    if (!updated) throw new NotFoundException('Alert rule not found');
    await this.audit.record('alert_rule.update', 'alert_rule', updated.id, update);
    return updated;
  }

  async deleteRule(ruleId: string) {
    const deleted = await this.database.deleteAlertRule(ruleId);
    if (!deleted) throw new NotFoundException('Alert rule not found');
    await this.audit.record('alert_rule.delete', 'alert_rule', ruleId);
    return { status: 'deleted', ruleId };
  }

  async listEvents(query: any) {
    return this.database.listAlertEvents({
      entityType: query?.entityType,
      entityId: query?.entityId,
    });
  }

  async getEvent(eventId: string) {
    const event = await this.database.getAlertEvent(eventId);
    if (!event) throw new NotFoundException('Alert event not found');
    return event;
  }

  async evaluateMeter(reading: MeterReading) {
    const rules = await this.database.listAlertRules();
    for (const rule of rules.filter((candidate) => candidate.enabled && candidate.kind === 'VOLTAGE_ANOMALY')) {
      if (reading.voltage >= rule.threshold) {
        await this.database.createAlertEvent({
          ruleId: rule.id,
          ruleKind: rule.kind,
          entityType: 'meter',
          entityId: reading.meterId,
          measuredValue: reading.voltage,
          threshold: rule.threshold,
          message: `Meter ${reading.meterId} voltage ${reading.voltage} crossed ${rule.threshold}`,
        });
      }
    }
  }

  async evaluateVehicle(reading: VehicleReading) {
    const rules = await this.database.listAlertRules();
    for (const rule of rules.filter((candidate) => candidate.enabled)) {
      if (rule.kind === 'HIGH_BATTERY_TEMP' && reading.batteryTemp >= rule.threshold) {
        await this.emitVehicle(rule.id, rule.kind, reading.vehicleId, reading.batteryTemp, rule.threshold);
      }
      if (rule.kind === 'LOW_SOC' && reading.soc <= rule.threshold) {
        await this.emitVehicle(rule.id, rule.kind, reading.vehicleId, reading.soc, rule.threshold);
      }
    }
  }

  private async emitVehicle(ruleId: string, ruleKind: AlertRuleKind, vehicleId: string, measuredValue: number, threshold: number) {
    await this.database.createAlertEvent({
      ruleId,
      ruleKind,
      entityType: 'vehicle',
      entityId: vehicleId,
      measuredValue,
      threshold,
      message: `Vehicle ${vehicleId} ${ruleKind} measured ${measuredValue} against ${threshold}`,
    });
  }
}
