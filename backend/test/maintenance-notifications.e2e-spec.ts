import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';

describe('maintenance and notifications', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  it('creates, lists, and resolves work orders', async () => {
    const created = await request(app.getHttpServer()).post('/v1/maintenance/work-orders').send({
      entityType: 'meter',
      entityId: 'M-WO',
      priority: 'high',
      title: 'Inspect voltage drift',
      description: 'Voltage anomaly needs field inspection.',
    }).expect(201);
    const list = await request(app.getHttpServer()).get('/v1/maintenance/work-orders?priority=high').expect(200);
    expect(list.body.total).toBe(1);
    const resolved = await request(app.getHttpServer()).patch(`/v1/maintenance/work-orders/${created.body.id}`).send({ status: 'resolved', assignedTo: 'ops-1' }).expect(200);
    expect(resolved.body.status).toBe('resolved');
    expect(resolved.body.resolvedAt).toBeTruthy();
  });

  it('rejects invalid work orders and missing updates', async () => {
    await request(app.getHttpServer()).post('/v1/maintenance/work-orders').send({ entityType: 'meter' }).expect(400);
    await request(app.getHttpServer()).patch('/v1/maintenance/work-orders/missing').send({ status: 'resolved' }).expect(404);
  });

  it('creates notification routes and previews severity routing', async () => {
    await request(app.getHttpServer()).post('/v1/notifications/routes').send({
      name: 'Ops email',
      channel: 'email',
      target: 'ops@example.com',
      minSeverity: 'medium',
    }).expect(201);
    await request(app.getHttpServer()).post('/v1/notifications/routes').send({
      name: 'Urgent SMS',
      channel: 'sms',
      target: '+15550000000',
      minSeverity: 'high',
    }).expect(201);
    const preview = await request(app.getHttpServer()).post('/v1/notifications/preview').send({
      severity: 'medium',
      title: 'Voltage watch',
      message: 'Meter voltage has crossed the watch band.',
    }).expect(201);
    expect(preview.body).toHaveLength(2);
    expect(preview.body.filter((row) => row.wouldSend)).toHaveLength(1);
  });
});
