import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { meterPayload, vehiclePayload } from './helpers/payload.helper';

describe('energy reconciliation', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  it('returns missing-data notes for empty windows', async () => {
    const response = await request(app.getHttpServer()).get('/v1/reconciliation/energy?hours=2&bucketHours=1').expect(200);
    expect(response.body.windowCount).toBe(2);
    expect(response.body.totalAc).toBe(0);
    expect(response.body.totalDc).toBe(0);
    expect(response.body.notes).toContain('No AC meter energy was available for the reconciliation period.');
  });

  it('reconciles balanced AC and DC energy', async () => {
    const timestamp = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ meterId: 'M-REC', kwhConsumedAc: 10, timestamp })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V-REC', kwhDeliveredDc: 9.5, timestamp })).expect(201);
    const response = await request(app.getHttpServer()).get('/v1/reconciliation/energy?hours=2&bucketHours=1').expect(200);
    expect(response.body.totalAc).toBe(10);
    expect(response.body.totalDc).toBe(9.5);
    expect(response.body.windows.some((window) => window.status === 'balanced')).toBe(true);
  });

  it('flags high loss buckets', async () => {
    const timestamp = new Date(Date.now() - 20 * 60 * 1000).toISOString();
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ meterId: 'M-LOSS', kwhConsumedAc: 40, timestamp })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V-LOSS', kwhDeliveredDc: 10, timestamp })).expect(201);
    const response = await request(app.getHttpServer()).get('/v1/reconciliation/energy?hours=2&bucketHours=1').expect(200);
    expect(response.body.windows.some((window) => window.status === 'loss_high')).toBe(true);
    expect(response.body.notes).toContain('At least one bucket has high AC/DC loss and should be investigated.');
  });
});
