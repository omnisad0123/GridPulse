import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AuditService } from '../audit/audit.service';
import { AlertsService } from '../alerts/alerts.service';
import { IngestValidationService, NormalizedTelemetry } from './ingest-validation.service';
import { RateLimitService } from './rate-limit.service';

@Injectable()
export class IngestService {
  constructor(
    private readonly database: DatabaseService,
    private readonly audit: AuditService,
    private readonly alerts: AlertsService,
    private readonly validation: IngestValidationService,
    private readonly rateLimit: RateLimitService,
  ) {}

  async ingest(payload: any) {
    const normalized = this.validation.normalizePayload(payload);
    this.assertRateLimit(normalized);
    if (normalized.type === 'meter') {
      const reading = await this.database.insertMeterReading(normalized.reading);
      await this.alerts.evaluateMeter(reading);
      await this.audit.record('ingest.meter', 'meter', reading.meterId, { readingId: reading.id });
      return { status: 'accepted', type: 'meter', id: reading.id };
    }

    const reading = await this.database.insertVehicleReading(normalized.reading);
    await this.alerts.evaluateVehicle(reading);
    await this.audit.record('ingest.vehicle', 'vehicle', reading.vehicleId, { readingId: reading.id });
    return { status: 'accepted', type: 'vehicle', id: reading.id };
  }

  async ingestBatch(body: any) {
    const normalized = this.validation.normalizeBatch(body);
    normalized.forEach((record) => this.assertRateLimit(record));
    const meterCount = normalized.filter((record) => record.type === 'meter').length;
    const vehicleCount = normalized.length - meterCount;
    const batch = await this.database.createBatch(meterCount, vehicleCount);

    for (const record of normalized) {
      if (record.type === 'meter') {
        const reading = await this.database.insertMeterReading({ ...record.reading, batchId: batch.id });
        await this.alerts.evaluateMeter(reading);
      } else {
        const reading = await this.database.insertVehicleReading({ ...record.reading, batchId: batch.id });
        await this.alerts.evaluateVehicle(reading);
      }
    }

    await this.audit.record('ingest.batch', 'ingestion_batch', batch.id, { meterCount, vehicleCount });
    return { status: 'accepted', batchId: batch.id, meterCount, vehicleCount };
  }

  private assertRateLimit(record: NormalizedTelemetry) {
    if (record.type === 'meter') {
      this.rateLimit.assertAllowed('meter', record.reading.meterId);
      return;
    }
    this.rateLimit.assertAllowed('vehicle', record.reading.vehicleId);
  }
}
