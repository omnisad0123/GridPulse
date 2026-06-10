import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { InvalidPayloadException } from '../common/exceptions/gridpulse.exception';
import { toNumber } from '../common/utils/numeric.util';
import { SlaPolicy, SlaReport, SlaViolation } from './dto/sla.dto';

@Injectable()
export class SlaService {
  private readonly policies = new Map<string, SlaPolicy>();

  constructor(private readonly database: DatabaseService) {
    this.seedDefaults();
  }

  createPolicy(body: any): SlaPolicy {
    const entityType = body?.entityType;
    const maxTelemetryAgeMinutes = toNumber(body?.maxTelemetryAgeMinutes);
    const warningAgeMinutes = toNumber(body?.warningAgeMinutes);
    if (!body?.id || !['meter', 'vehicle'].includes(entityType)) {
      throw new InvalidPayloadException('SLA policy requires id and entityType');
    }
    if (!Number.isFinite(maxTelemetryAgeMinutes) || !Number.isFinite(warningAgeMinutes) || warningAgeMinutes >= maxTelemetryAgeMinutes) {
      throw new InvalidPayloadException('SLA policy requires warningAgeMinutes less than maxTelemetryAgeMinutes');
    }
    const policy: SlaPolicy = {
      id: String(body.id),
      entityType,
      maxTelemetryAgeMinutes,
      warningAgeMinutes,
      description: String(body.description ?? `${entityType} freshness policy`),
    };
    this.policies.set(policy.id, policy);
    return policy;
  }

  listPolicies(): SlaPolicy[] {
    return [...this.policies.values()].sort((a, b) => a.id.localeCompare(b.id));
  }

  async freshness(): Promise<SlaReport> {
    const now = new Date();
    const [meters, vehicles] = await Promise.all([
      this.database.listMeterStatuses(1, 1000),
      this.database.listVehicleStatuses(1, 1000),
    ]);
    const violations: SlaViolation[] = [];
    for (const policy of this.listPolicies()) {
      const rows = policy.entityType === 'meter' ? meters.data : vehicles.data;
      for (const row of rows as any[]) {
        const entityId = row.meterId ?? row.vehicleId;
        violations.push(...this.evaluate(policy, entityId, row.lastUpdated, now));
      }
    }
    return {
      generatedAt: now.toISOString(),
      policyCount: this.policies.size,
      warningCount: violations.filter((violation) => violation.severity === 'warning').length,
      breachCount: violations.filter((violation) => violation.severity === 'breach').length,
      violations,
    };
  }

  private evaluate(policy: SlaPolicy, entityId: string, lastUpdated: Date | null, now: Date): SlaViolation[] {
    if (!lastUpdated) {
      return [{
        entityId,
        entityType: policy.entityType,
        policyId: policy.id,
        severity: 'breach',
        lastUpdated,
        ageMinutes: null,
        message: `${policy.entityType} ${entityId} has no telemetry timestamp.`,
      }];
    }
    const ageMinutes = Math.max(Math.round((now.getTime() - new Date(lastUpdated).getTime()) / 60_000), 0);
    if (ageMinutes >= policy.maxTelemetryAgeMinutes) {
      return [this.violation(policy, entityId, lastUpdated, ageMinutes, 'breach')];
    }
    if (ageMinutes >= policy.warningAgeMinutes) {
      return [this.violation(policy, entityId, lastUpdated, ageMinutes, 'warning')];
    }
    return [];
  }

  private violation(policy: SlaPolicy, entityId: string, lastUpdated: Date, ageMinutes: number, severity: 'warning' | 'breach'): SlaViolation {
    return {
      entityId,
      entityType: policy.entityType,
      policyId: policy.id,
      severity,
      lastUpdated,
      ageMinutes,
      message: `${policy.entityType} ${entityId} telemetry age ${ageMinutes}m triggered ${policy.id}.`,
    };
  }

  private seedDefaults() {
    if (this.policies.size) return;
    this.createPolicy({ id: 'meter-freshness', entityType: 'meter', warningAgeMinutes: 30, maxTelemetryAgeMinutes: 120, description: 'Meters should report at least every two hours.' });
    this.createPolicy({ id: 'vehicle-freshness', entityType: 'vehicle', warningAgeMinutes: 15, maxTelemetryAgeMinutes: 60, description: 'Vehicles should report frequently while connected.' });
  }
}
