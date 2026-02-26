import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { parseTimestamp } from '../common/utils/date-window.util';
import { isNonNegativeFinite, toNumber } from '../common/utils/numeric.util';
import { AuditService } from '../audit/audit.service';
import { AlertsService } from '../alerts/alerts.service';

@Injectable()
export class IngestService {
  constructor(
    private readonly database: DatabaseService,
    private readonly audit: AuditService,
    private readonly alerts: AlertsService,
  ) {}

  async ingest(payload: any) {
    const normalized = this.normalizePayload(payload);
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
    const records = Array.isArray(body) ? body : body?.records;
    if (!Array.isArray(records) || records.length === 0) {
      throw new BadRequestException('Batch ingest requires a non-empty records array');
    }
    const normalized = records.map((record) => this.normalizePayload(record));
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

  private normalizePayload(payload: any) {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      throw new BadRequestException('Telemetry payload must be an object');
    }
    const hasMeter = 'meterId' in payload;
    const hasVehicle = 'vehicleId' in payload;
    if (hasMeter === hasVehicle) {
      throw new BadRequestException('Payload must contain exactly one telemetry type');
    }
    const timestamp = parseTimestamp(payload.timestamp);
    if (!timestamp) {
      throw new BadRequestException('A valid timestamp is required');
    }
    return hasMeter ? this.normalizeMeter(payload, timestamp) : this.normalizeVehicle(payload, timestamp);
  }

  private normalizeMeter(payload: any, timestamp: Date) {
    if (!payload.meterId || !isNonNegativeFinite(payload.kwhConsumedAc) || !Number.isFinite(toNumber(payload.voltage))) {
      throw new BadRequestException('Meter payload requires meterId, non-negative kwhConsumedAc, voltage, and timestamp');
    }
    return {
      type: 'meter' as const,
      reading: {
        meterId: String(payload.meterId),
        kwhConsumedAc: toNumber(payload.kwhConsumedAc),
        voltage: toNumber(payload.voltage),
        timestamp,
        batchId: null,
      },
    };
  }

  private normalizeVehicle(payload: any, timestamp: Date) {
    const soc = toNumber(payload.soc);
    if (
      !payload.vehicleId ||
      !Number.isFinite(soc) ||
      soc < 0 ||
      soc > 100 ||
      !isNonNegativeFinite(payload.kwhDeliveredDc) ||
      !Number.isFinite(toNumber(payload.batteryTemp))
    ) {
      throw new BadRequestException('Vehicle payload requires vehicleId, SOC 0-100, non-negative kwhDeliveredDc, batteryTemp, and timestamp');
    }
    return {
      type: 'vehicle' as const,
      reading: {
        vehicleId: String(payload.vehicleId),
        soc,
        kwhDeliveredDc: toNumber(payload.kwhDeliveredDc),
        batteryTemp: toNumber(payload.batteryTemp),
        timestamp,
        batchId: null,
      },
    };
  }
}
