import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';

describe('current status endpoints', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  it('returns 404 for missing meter and vehicle statuses', async () => {
    await request(app.getHttpServer()).get('/v1/status/meters/unknown').expect(404);
    await request(app.getHttpServer()).get('/v1/status/vehicles/unknown').expect(404);
  });

  it('lists current meter statuses with pagination metadata', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send({
      meterId: 'M-LIST-1',
      kwhConsumedAc: 10,
      voltage: 220,
      timestamp: '2026-02-09T10:00:00Z',
    }).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send({
      meterId: 'M-LIST-2',
      kwhConsumedAc: 12,
      voltage: 221,
      timestamp: '2026-02-09T10:01:00Z',
    }).expect(201);

    const response = await request(app.getHttpServer()).get('/v1/status/meters?page=1&limit=1').expect(200);
    expect(response.body.total).toBe(2);
    expect(response.body.totalPages).toBe(2);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].meterId).toBe('M-LIST-2');
  });

  it('lists current vehicle statuses with pagination metadata', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send({
      vehicleId: 'V-LIST-1',
      soc: 80,
      kwhDeliveredDc: 9,
      batteryTemp: 30,
      timestamp: '2026-02-09T10:00:00Z',
    }).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send({
      vehicleId: 'V-LIST-2',
      soc: 70,
      kwhDeliveredDc: 11,
      batteryTemp: 31,
      timestamp: '2026-02-09T10:02:00Z',
    }).expect(201);

    const response = await request(app.getHttpServer()).get('/v1/status/vehicles?page=1&limit=5').expect(200);
    expect(response.body.total).toBe(2);
    expect(response.body.data.map((row) => row.vehicleId)).toContain('V-LIST-2');
  });
});
