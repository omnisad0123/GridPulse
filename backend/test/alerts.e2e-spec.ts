import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { vehiclePayload } from './helpers/payload.helper';

describe('alerts', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  it('creates alert events when active thresholds are crossed', async () => {
    await request(app.getHttpServer()).post('/v1/alerts/rules').send({ name: 'hot pack', kind: 'HIGH_BATTERY_TEMP', threshold: 40 }).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ batteryTemp: 44 })).expect(201);
    const events = await request(app.getHttpServer()).get('/v1/alerts/events').expect(200);
    expect(events.body).toHaveLength(1);
  });

  it('does not create events for disabled rules', async () => {
    await request(app.getHttpServer()).post('/v1/alerts/rules').send({ name: 'low soc', kind: 'LOW_SOC', threshold: 20, enabled: false }).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ soc: 10 })).expect(201);
    const events = await request(app.getHttpServer()).get('/v1/alerts/events').expect(200);
    expect(events.body).toHaveLength(0);
  });
});
