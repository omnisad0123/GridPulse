import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { meterPayload, vehiclePayload } from './helpers/payload.helper';

describe('single telemetry ingest', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  it('accepts meter telemetry and exposes hot meter status', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload()).expect(201);
    const response = await request(app.getHttpServer()).get('/v1/status/meters/M1').expect(200);
    expect(response.body.meterId).toBe('M1');
    expect(response.body.kwhConsumedAc).toBe(10.5);
  });

  it('accepts vehicle telemetry and exposes hot vehicle status', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload()).expect(201);
    const response = await request(app.getHttpServer()).get('/v1/status/vehicles/V1').expect(200);
    expect(response.body.vehicleId).toBe('V1');
    expect(response.body.soc).toBe(60);
  });

  it('rejects mixed meter and vehicle payloads', async () => {
    await request(app.getHttpServer())
      .post('/v1/ingest')
      .send({ ...meterPayload(), vehicleId: 'V1' })
      .expect(400);
  });

  it('rejects negative energy values', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ kwhConsumedAc: -1 })).expect(400);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ kwhDeliveredDc: -1 })).expect(400);
  });

  it('keeps older readings from overwriting newer current status', async () => {
    await request(app.getHttpServer())
      .post('/v1/ingest')
      .send(meterPayload({ kwhConsumedAc: 20, timestamp: '2026-02-09T11:00:00Z' }))
      .expect(201);
    await request(app.getHttpServer())
      .post('/v1/ingest')
      .send(meterPayload({ kwhConsumedAc: 5, timestamp: '2026-02-09T10:00:00Z' }))
      .expect(201);
    const response = await request(app.getHttpServer()).get('/v1/status/meters/M1').expect(200);
    expect(response.body.kwhConsumedAc).toBe(20);
  });
});
