import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { meterPayload, vehiclePayload } from './helpers/payload.helper';

describe('forecasting endpoints', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  it('forecasts meter consumption from recent history', async () => {
    for (let index = 0; index < 6; index += 1) {
      await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({
        meterId: 'M-FC',
        kwhConsumedAc: 10 + index,
        timestamp: new Date(Date.now() - (6 - index) * 60 * 60 * 1000).toISOString(),
      })).expect(201);
    }

    const response = await request(app.getHttpServer()).get('/v1/forecasts/meters/M-FC?horizonHours=4').expect(200);
    expect(response.body.entityId).toBe('M-FC');
    expect(response.body.metric).toBe('kwhConsumedAc');
    expect(response.body.points).toHaveLength(4);
    expect(response.body.confidence).toBe('medium');
  });

  it('forecasts vehicle delivered DC energy', async () => {
    for (let index = 0; index < 8; index += 1) {
      await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({
        vehicleId: 'V-FC',
        kwhDeliveredDc: 4 + index,
        timestamp: new Date(Date.now() - (8 - index) * 60 * 60 * 1000).toISOString(),
      })).expect(201);
    }

    const response = await request(app.getHttpServer()).get('/v1/forecasts/vehicles/V-FC?horizonHours=3').expect(200);
    expect(response.body.entityType).toBe('vehicle');
    expect(response.body.metric).toBe('kwhDeliveredDc');
    expect(response.body.points).toHaveLength(3);
    expect(response.body.confidence).toBe('high');
  });

  it('forecasts vehicle SOC and clamps forecast bounds', async () => {
    for (let index = 0; index < 4; index += 1) {
      await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({
        vehicleId: 'V-SOC-FC',
        soc: 96 + index,
        timestamp: new Date(Date.now() - (4 - index) * 60 * 60 * 1000).toISOString(),
      })).expect(201);
    }

    const response = await request(app.getHttpServer()).get('/v1/forecasts/vehicles/V-SOC-FC?metric=soc&horizonHours=4').expect(200);
    expect(response.body.points.every((point) => point.upperBound <= 100)).toBe(true);
    expect(response.body.points.every((point) => point.lowerBound >= 0)).toBe(true);
  });

  it('rejects unsupported vehicle forecast metrics', async () => {
    await request(app.getHttpServer()).get('/v1/forecasts/vehicles/V1?metric=batteryTemp').expect(400);
  });

  it('returns low confidence empty forecasts when there is no history', async () => {
    const response = await request(app.getHttpServer()).get('/v1/forecasts/meters/M-NONE?horizonHours=2').expect(200);
    expect(response.body.basisReadings).toBe(0);
    expect(response.body.confidence).toBe('low');
    expect(response.body.points).toHaveLength(2);
  });
});
