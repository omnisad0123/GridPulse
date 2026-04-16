import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { meterPayload, vehiclePayload } from './helpers/payload.helper';

describe('analytics endpoints', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  it('computes vehicle performance from history and returns null efficiency without AC', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V9', kwhDeliveredDc: 12 })).expect(201);
    const response = await request(app.getHttpServer()).get('/v1/analytics/performance/V9').expect(200);
    expect(response.body.totalDc).toBe(12);
    expect(response.body.efficiency).toBeNull();
  });

  it('summarizes fleet and meter readings for the last 24 hours', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ meterId: 'M7', kwhConsumedAc: 10 })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V7', kwhDeliveredDc: 5 })).expect(201);
    const fleet = await request(app.getHttpServer()).get('/v1/analytics/fleet').expect(200);
    const meters = await request(app.getHttpServer()).get('/v1/analytics/meters').expect(200);
    expect(fleet.body.totalVehicles).toBe(1);
    expect(meters.body.totalMeters).toBe(1);
  });
});
