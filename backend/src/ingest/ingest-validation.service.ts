import { Injectable } from '@nestjs/common';
import { parseTimestamp } from '../common/utils/date-window.util';
import { isNonNegativeFinite, toNumber } from '../common/utils/numeric.util';
import { InvalidPayloadException } from '../common/exceptions/gridpulse.exception';

export type NormalizedTelemetry =
  | {
      type: 'meter';
      reading: { meterId: string; kwhConsumedAc: number; voltage: number; timestamp: Date; batchId: string | null };
    }
  | {
      type: 'vehicle';
      reading: { vehicleId: string; soc: number; kwhDeliveredDc: number; batteryTemp: number; timestamp: Date; batchId: string | null };
    };

@Injectable()
export class IngestValidationService {
  normalizePayload(payload: any): NormalizedTelemetry {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      throw new InvalidPayloadException('Telemetry payload must be an object');
    }
    const hasMeter = 'meterId' in payload;
    const hasVehicle = 'vehicleId' in payload;
    if (hasMeter === hasVehicle) {
      throw new InvalidPayloadException('Payload must contain exactly one telemetry type', { hasMeter, hasVehicle });
    }
    const timestamp = parseTimestamp(payload.timestamp);
    if (!timestamp) {
      throw new InvalidPayloadException('A valid timestamp is required');
    }
    return hasMeter ? this.normalizeMeter(payload, timestamp) : this.normalizeVehicle(payload, timestamp);
  }

  normalizeBatch(body: any): NormalizedTelemetry[] {
    const records = Array.isArray(body) ? body : body?.records;
    if (!Array.isArray(records) || records.length === 0) {
      throw new InvalidPayloadException('Batch ingest requires a non-empty records array');
    }
    return records.map((record) => this.normalizePayload(record));
  }

  private normalizeMeter(payload: any, timestamp: Date): NormalizedTelemetry {
    if (!payload.meterId || !isNonNegativeFinite(payload.kwhConsumedAc) || !isNonNegativeFinite(payload.voltage)) {
      throw new InvalidPayloadException('Meter payload requires meterId, non-negative kwhConsumedAc, non-negative voltage, and timestamp');
    }
    return {
      type: 'meter',
      reading: {
        meterId: String(payload.meterId),
        kwhConsumedAc: toNumber(payload.kwhConsumedAc),
        voltage: toNumber(payload.voltage),
        timestamp,
        batchId: null,
      },
    };
  }

  private normalizeVehicle(payload: any, timestamp: Date): NormalizedTelemetry {
    const soc = toNumber(payload.soc);
    if (
      !payload.vehicleId ||
      !Number.isFinite(soc) ||
      soc < 0 ||
      soc > 100 ||
      !isNonNegativeFinite(payload.kwhDeliveredDc) ||
      !Number.isFinite(toNumber(payload.batteryTemp))
    ) {
      throw new InvalidPayloadException('Vehicle payload requires vehicleId, SOC 0-100, non-negative kwhDeliveredDc, batteryTemp, and timestamp');
    }
    return {
      type: 'vehicle',
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
