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

  it('returns zero totals for a vehicle with no readings', async () => {
    const response = await request(app.getHttpServer()).get('/v1/analytics/performance/NOPE').expect(200);
    expect(response.body.totalDc).toBe(0);
    expect(response.body.avgBatteryTemp).toBeNull();
    expect(response.body.efficiency).toBeNull();
  });

  it('uses a wider configurable hours window', async () => {
    const oldTimestamp = new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString();
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V-WIDE', kwhDeliveredDc: 15, timestamp: oldTimestamp })).expect(201);
    const narrow = await request(app.getHttpServer()).get('/v1/analytics/performance/V-WIDE?hours=24').expect(200);
    const wide = await request(app.getHttpServer()).get('/v1/analytics/performance/V-WIDE?hours=48').expect(200);
    expect(narrow.body.totalDc).toBe(0);
    expect(wide.body.totalDc).toBe(15);
  });

  it('computes efficiency when AC energy exists in the same window', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ meterId: 'M-EFF', kwhConsumedAc: 20 })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V-EFF', kwhDeliveredDc: 10 })).expect(201);
    const response = await request(app.getHttpServer()).get('/v1/analytics/performance/V-EFF').expect(200);
    expect(response.body.efficiency).toBe(0.5);
  });
});
