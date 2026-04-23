import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { meterPayload } from './helpers/payload.helper';

describe('export jobs', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  it('creates completed CSV export jobs and supports download', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ meterId: 'M10' })).expect(201);
    const job = await request(app.getHttpServer()).post('/v1/exports').send({ type: 'meter_readings' }).expect(201);
    expect(job.body.status).toBe('completed');
    const download = await request(app.getHttpServer()).get(`/v1/exports/${job.body.id}/download`).expect(200);
    expect(download.text).toContain('meterId,kwhConsumedAc,voltage,timestamp');
  });

  it('rejects unknown export types', async () => {
    await request(app.getHttpServer()).post('/v1/exports').send({ type: 'unknown' }).expect(400);
  });
});
