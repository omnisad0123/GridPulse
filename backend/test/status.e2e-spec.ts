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
});
