import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { meterPayload, vehiclePayload } from './helpers/payload.helper';

describe('anomaly detection', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  it('returns an empty scan when telemetry is normal', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ voltage: 225 })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ soc: 60, batteryTemp: 31 })).expect(201);
    const response = await request(app.getHttpServer()).get('/v1/anomalies').expect(200);
    expect(response.body.total).toBe(0);
  });

  it('detects low and high voltage anomalies', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ meterId: 'M-LOW', voltage: 205 })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ meterId: 'M-HIGH', voltage: 255 })).expect(201);
    const response = await request(app.getHttpServer()).get('/v1/anomalies?hours=24').expect(200);
    const kinds = response.body.data.map((row) => row.kind);
    expect(kinds).toContain('voltage_low');
    expect(kinds).toContain('voltage_high');
    expect(response.body.high).toBe(1);
    expect(response.body.medium).toBe(1);
  });

  it('detects hot battery and low SOC anomalies', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V-HOT', batteryTemp: 48 })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V-LOW', soc: 10 })).expect(201);
    const response = await request(app.getHttpServer()).get('/v1/anomalies').expect(200);
    const kinds = response.body.data.map((row) => row.kind);
    expect(kinds).toContain('battery_hot');
    expect(kinds).toContain('soc_low');
  });

  it('detects low fleet efficiency when DC is low relative to AC', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ meterId: 'M-EFF-LOW', kwhConsumedAc: 100 })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V-EFF-LOW', kwhDeliveredDc: 20 })).expect(201);
    const response = await request(app.getHttpServer()).get('/v1/anomalies').expect(200);
    expect(response.body.data.map((row) => row.kind)).toContain('efficiency_low');
  });
});
