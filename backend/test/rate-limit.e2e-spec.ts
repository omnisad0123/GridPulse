import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { meterPayload, vehiclePayload } from './helpers/payload.helper';
import { RateLimitService } from '../src/ingest/rate-limit.service';

jest.setTimeout(30_000);

describe('ingestion rate limiting', () => {
  let app: INestApplication;
  let rateLimit: RateLimitService;
  let now = Date.parse('2026-02-09T10:00:00Z');

  beforeEach(async () => {
    ({ app } = await createTestApp());
    rateLimit = app.get(RateLimitService);
    now = Date.parse('2026-02-09T10:00:00Z');
    rateLimit.setNowProvider(() => now);
  });

  afterEach(async () => {
    await app.close();
  });

  it('allows 60 rapid meter readings for the same entity', async () => {
    for (let index = 0; index < 60; index += 1) {
      await request(app.getHttpServer())
        .post('/v1/ingest')
        .send(meterPayload({ meterId: 'M-RATE', timestamp: new Date(now + index).toISOString() }))
        .expect(201);
    }
  });

  it('rejects the 61st meter reading inside the same minute', async () => {
    for (let index = 0; index < 60; index += 1) {
      await request(app.getHttpServer())
        .post('/v1/ingest')
        .send(meterPayload({ meterId: 'M-RATE', timestamp: new Date(now + index).toISOString() }))
        .expect(201);
    }
    const response = await request(app.getHttpServer())
      .post('/v1/ingest')
      .send(meterPayload({ meterId: 'M-RATE', timestamp: new Date(now + 61).toISOString() }))
      .expect(429);

    expect(response.body.code).toBe('RATE_LIMIT_EXCEEDED');
  });

  it('accepts ingest after the rate window resets', async () => {
    for (let index = 0; index < 60; index += 1) {
      await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V-RATE' })).expect(201);
    }
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V-RATE' })).expect(429);
    now += 61_000;
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V-RATE' })).expect(201);
  });

  it('does not share rate buckets across entities or telemetry types', async () => {
    for (let index = 0; index < 60; index += 1) {
      await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ meterId: 'M-A' })).expect(201);
    }
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ meterId: 'M-B' })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'M-A' })).expect(201);
  });
});
