import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { meterPayload } from './helpers/payload.helper';

describe('audit logs', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  it('records successful ingest but not failed ingest', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send({ meterId: 'bad' }).expect(400);
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload()).expect(201);
    const logs = await request(app.getHttpServer()).get('/v1/audit-logs').expect(200);
    expect(logs.body).toHaveLength(1);
    expect(logs.body[0].action).toBe('ingest.meter');
  });
});
