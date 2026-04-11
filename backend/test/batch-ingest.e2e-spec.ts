import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { meterPayload, vehiclePayload } from './helpers/payload.helper';

describe('batch ingest', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  it('accepts mixed valid batches and counts each telemetry type', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/ingest/batch')
      .send({ records: [meterPayload({ meterId: 'M2' }), vehiclePayload({ vehicleId: 'V2' })] })
      .expect(201);
    expect(response.body.meterCount).toBe(1);
    expect(response.body.vehicleCount).toBe(1);
  });

  it('rejects the whole batch before mutation when one record is invalid', async () => {
    await request(app.getHttpServer())
      .post('/v1/ingest/batch')
      .send({ records: [meterPayload({ meterId: 'M3' }), vehiclePayload({ soc: 120 })] })
      .expect(400);
    await request(app.getHttpServer()).get('/v1/status/meters/M3').expect(404);
  });
});
