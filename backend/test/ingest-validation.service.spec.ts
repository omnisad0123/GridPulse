import { IngestValidationService } from '../src/ingest/ingest-validation.service';
import { InvalidPayloadException } from '../src/common/exceptions/gridpulse.exception';

describe('IngestValidationService', () => {
  let service: IngestValidationService;

  beforeEach(() => {
    service = new IngestValidationService();
  });

  it('normalizes meter payloads with numeric strings', () => {
    const result = service.normalizePayload({
      meterId: 'M-UNIT',
      kwhConsumedAc: '12.5',
      voltage: '228',
      timestamp: '2026-02-09T10:00:00Z',
    });

    expect(result.type).toBe('meter');
    if (result.type === 'meter') {
      expect(result.reading.kwhConsumedAc).toBe(12.5);
      expect(result.reading.voltage).toBe(228);
      expect(result.reading.timestamp.toISOString()).toBe('2026-02-09T10:00:00.000Z');
    }
  });

  it('normalizes vehicle payloads with numeric strings', () => {
    const result = service.normalizePayload({
      vehicleId: 'V-UNIT',
      soc: '90',
      kwhDeliveredDc: '18.25',
      batteryTemp: '31',
      timestamp: '2026-02-09T10:00:00Z',
    });

    expect(result.type).toBe('vehicle');
    if (result.type === 'vehicle') {
      expect(result.reading.soc).toBe(90);
      expect(result.reading.kwhDeliveredDc).toBe(18.25);
      expect(result.reading.batteryTemp).toBe(31);
    }
  });

  it.each([
    ['null payload', null],
    ['array payload', []],
    ['missing timestamp', { meterId: 'M1', kwhConsumedAc: 1, voltage: 220 }],
    ['mixed payload', { meterId: 'M1', vehicleId: 'V1', kwhConsumedAc: 1, voltage: 220, timestamp: '2026-02-09T10:00:00Z' }],
    ['missing telemetry id', { kwhConsumedAc: 1, voltage: 220, timestamp: '2026-02-09T10:00:00Z' }],
    ['negative meter energy', { meterId: 'M1', kwhConsumedAc: -1, voltage: 220, timestamp: '2026-02-09T10:00:00Z' }],
    ['negative meter voltage', { meterId: 'M1', kwhConsumedAc: 1, voltage: -220, timestamp: '2026-02-09T10:00:00Z' }],
    ['soc above max', { vehicleId: 'V1', soc: 101, kwhDeliveredDc: 1, batteryTemp: 30, timestamp: '2026-02-09T10:00:00Z' }],
    ['soc below min', { vehicleId: 'V1', soc: -1, kwhDeliveredDc: 1, batteryTemp: 30, timestamp: '2026-02-09T10:00:00Z' }],
    ['negative dc energy', { vehicleId: 'V1', soc: 50, kwhDeliveredDc: -1, batteryTemp: 30, timestamp: '2026-02-09T10:00:00Z' }],
  ])('rejects %s', (_name, payload) => {
    expect(() => service.normalizePayload(payload)).toThrow(InvalidPayloadException);
  });

  it('normalizes non-empty batches', () => {
    const result = service.normalizeBatch({
      records: [
        { meterId: 'M1', kwhConsumedAc: 1, voltage: 220, timestamp: '2026-02-09T10:00:00Z' },
        { vehicleId: 'V1', soc: 70, kwhDeliveredDc: 4, batteryTemp: 30, timestamp: '2026-02-09T10:00:00Z' },
      ],
    });

    expect(result.map((record) => record.type)).toEqual(['meter', 'vehicle']);
  });

  it('rejects empty batches before mutation work begins', () => {
    expect(() => service.normalizeBatch({ records: [] })).toThrow(InvalidPayloadException);
  });
});
