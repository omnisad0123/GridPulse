import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { meterPayload, vehiclePayload } from './helpers/payload.helper';

describe('device registry', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  const meterDevice = {
    deviceId: 'M-REG-1',
    kind: 'meter',
    siteId: 'SITE-A',
    displayName: 'Main meter',
    model: 'MX-900',
    firmwareVersion: '1.2.3',
    commissionedAt: '2026-02-09T10:00:00Z',
  };

  it('registers and fetches a meter device', async () => {
    const created = await request(app.getHttpServer()).post('/v1/devices').send(meterDevice).expect(201);
    expect(created.body.deviceId).toBe('M-REG-1');
    expect(created.body.state).toBe('active');

    const fetched = await request(app.getHttpServer()).get('/v1/devices/M-REG-1').expect(200);
    expect(fetched.body.displayName).toBe('Main meter');
  });

  it('rejects duplicate device ids', async () => {
    await request(app.getHttpServer()).post('/v1/devices').send(meterDevice).expect(201);
    await request(app.getHttpServer()).post('/v1/devices').send(meterDevice).expect(400);
  });

  it('lists devices by kind, site, and state', async () => {
    await request(app.getHttpServer()).post('/v1/devices').send(meterDevice).expect(201);
    await request(app.getHttpServer()).post('/v1/devices').send({
      ...meterDevice,
      deviceId: 'V-REG-1',
      kind: 'vehicle',
      displayName: 'Fleet vehicle',
    }).expect(201);

    const meters = await request(app.getHttpServer()).get('/v1/devices?kind=meter&siteId=SITE-A').expect(200);
    expect(meters.body.total).toBe(1);
    expect(meters.body.data[0].deviceId).toBe('M-REG-1');
  });

  it('updates device state and metadata', async () => {
    await request(app.getHttpServer()).post('/v1/devices').send(meterDevice).expect(201);
    const updated = await request(app.getHttpServer())
      .patch('/v1/devices/M-REG-1')
      .send({ state: 'maintenance', metadata: { reason: 'firmware rollout' } })
      .expect(200);

    expect(updated.body.state).toBe('maintenance');
    expect(updated.body.metadata.reason).toBe('firmware rollout');
  });

  it('returns 404 for missing devices', async () => {
    await request(app.getHttpServer()).get('/v1/devices/NOPE').expect(404);
  });

  it('reports offline health for registered devices without telemetry', async () => {
    await request(app.getHttpServer()).post('/v1/devices').send(meterDevice).expect(201);
    const health = await request(app.getHttpServer()).get('/v1/devices/health').expect(200);
    expect(health.body.data[0].health).toBe('offline');
    expect(health.body.data[0].notes[0]).toContain('No telemetry');
  });

  it('reports telemetry health for registered devices with readings', async () => {
    await request(app.getHttpServer()).post('/v1/devices').send(meterDevice).expect(201);
    await request(app.getHttpServer()).post('/v1/devices').send({
      ...meterDevice,
      deviceId: 'V-REG-1',
      kind: 'vehicle',
    }).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ meterId: 'M-REG-1' })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V-REG-1' })).expect(201);

    const health = await request(app.getHttpServer()).get('/v1/devices/health?limit=10').expect(200);
    const ids = health.body.data.map((row) => row.deviceId);
    expect(ids).toContain('M-REG-1');
    expect(ids).toContain('V-REG-1');
  });
});
