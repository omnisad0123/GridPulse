import { RateLimitService } from '../src/ingest/rate-limit.service';
import { RateLimitException } from '../src/common/exceptions/gridpulse.exception';

describe('RateLimitService', () => {
  let service: RateLimitService;
  let now: number;

  beforeEach(() => {
    service = new RateLimitService();
    now = Date.parse('2026-02-09T10:00:00Z');
    service.setNowProvider(() => now);
  });

  it('allows requests until the configured limit is reached', () => {
    for (let index = 0; index < 60; index += 1) {
      expect(() => service.assertAllowed('meter', 'M1')).not.toThrow();
    }
  });

  it('rejects one more request inside the same window', () => {
    for (let index = 0; index < 60; index += 1) {
      service.assertAllowed('meter', 'M1');
    }
    expect(() => service.assertAllowed('meter', 'M1')).toThrow(RateLimitException);
  });

  it('separates meter and vehicle buckets even when ids match', () => {
    for (let index = 0; index < 60; index += 1) {
      service.assertAllowed('meter', 'SAME-ID');
    }
    expect(() => service.assertAllowed('vehicle', 'SAME-ID')).not.toThrow();
  });

  it('separates entity ids within the same telemetry type', () => {
    for (let index = 0; index < 60; index += 1) {
      service.assertAllowed('vehicle', 'V1');
    }
    expect(() => service.assertAllowed('vehicle', 'V2')).not.toThrow();
  });

  it('cleans up buckets after the one minute window', () => {
    for (let index = 0; index < 60; index += 1) {
      service.assertAllowed('meter', 'M1');
    }
    expect(() => service.assertAllowed('meter', 'M1')).toThrow(RateLimitException);
    now += 60_001;
    expect(() => service.assertAllowed('meter', 'M1')).not.toThrow();
  });

  it('can be reset between deterministic test cases', () => {
    for (let index = 0; index < 60; index += 1) {
      service.assertAllowed('meter', 'M1');
    }
    service.reset();
    service.setNowProvider(() => now);
    expect(() => service.assertAllowed('meter', 'M1')).not.toThrow();
  });
});
