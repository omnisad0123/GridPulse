import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { meterPayload } from './helpers/payload.helper';

describe('capacity planning', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  it('returns low-confidence capacity plan without meter data', async () => {
    const response = await request(app.getHttpServer()).get('/v1/capacity/plan?siteLimitKw=100').expect(200);
    expect(response.body.observedPeakKw).toBe(0);
    expect(response.body.risk).toBe('low');
    expect(response.body.recommendations[0]).toContain('No meter readings');
  });

  it('computes utilization and high risk near the site limit', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({
      meterId: 'M-CAP',
      kwhConsumedAc: 95,
      timestamp: new Date().toISOString(),
    })).expect(201);
    const response = await request(app.getHttpServer()).get('/v1/capacity/plan?siteLimitKw=100').expect(200);
    expect(response.body.observedPeakKw).toBe(95);
    expect(response.body.utilizationPercent).toBe(95);
    expect(response.body.risk).toBe('high');
  });
});
