import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { meterPayload, vehiclePayload } from './helpers/payload.helper';

describe('api contract coverage', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  it('exposes health with component status details', async () => {
    const response = await request(app.getHttpServer()).get('/v1/health').expect(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.components.database.ok).toBe(true);
    expect(response.body.components.memory.heapUsedMb).toBeGreaterThan(0);
  });

  it('uses request id propagation on object responses', async () => {
    const response = await request(app.getHttpServer())
      .get('/v1/health')
      .set('x-request-id', 'contract-request-1')
      .expect(200);
    expect(response.body.requestId).toBe('contract-request-1');
  });

  it('returns structured custom errors for invalid payloads', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/ingest')
      .send({ meterId: 'M-BAD' })
      .expect(400);
    expect(response.body.code).toBe('INVALID_PAYLOAD');
    expect(response.body.requestId).toBeTruthy();
  });

  it('keeps list endpoints stable when stores are empty', async () => {
    const endpoints = [
      '/v1/status/meters',
      '/v1/status/vehicles',
      '/v1/history/meters/MISSING',
      '/v1/history/vehicles/VISSING',
      '/v1/devices',
      '/v1/devices/health',
      '/v1/maintenance/work-orders',
    ];
    for (const endpoint of endpoints) {
      const response = await request(app.getHttpServer()).get(endpoint).expect(200);
      expect(response.body.total).toBe(0);
      expect(response.body.data).toEqual([]);
    }
  });

  it('keeps summary endpoints stable when history is empty', async () => {
    const meter = await request(app.getHttpServer()).get('/v1/history/meters/MISSING/summary').expect(200);
    const vehicle = await request(app.getHttpServer()).get('/v1/history/vehicles/VISSING/summary').expect(200);
    expect(meter.body.count).toBe(0);
    expect(meter.body.kwhConsumedAc.avg).toBeNull();
    expect(vehicle.body.count).toBe(0);
    expect(vehicle.body.soc.avg).toBeNull();
  });

  it('returns analytics defaults for empty windows', async () => {
    const performance = await request(app.getHttpServer()).get('/v1/analytics/performance/V-MISSING?hours=168').expect(200);
    const fleet = await request(app.getHttpServer()).get('/v1/analytics/fleet').expect(200);
    const meters = await request(app.getHttpServer()).get('/v1/analytics/meters').expect(200);
    expect(performance.body.hours).toBe(168);
    expect(performance.body.totalDc).toBe(0);
    expect(fleet.body.totalVehicles).toBe(0);
    expect(meters.body.totalMeters).toBe(0);
  });

  it('keeps operational routes deterministic after a normal telemetry pair', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ meterId: 'M-CONTRACT', kwhConsumedAc: 14 })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V-CONTRACT', kwhDeliveredDc: 7 })).expect(201);
    const endpoints = [
      '/v1/reports/operations',
      '/v1/reports/ingestion-quality',
      '/v1/reconciliation/energy',
      '/v1/capacity/plan',
      '/v1/anomalies',
      '/v1/sla/freshness',
    ];
    for (const endpoint of endpoints) {
      const response = await request(app.getHttpServer()).get(endpoint).expect(200);
      expect(response.body.requestId).toBeTruthy();
    }
  });

  it('supports export lifecycle contracts', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ meterId: 'M-EXPORT-CONTRACT' })).expect(201);
    const created = await request(app.getHttpServer()).post('/v1/exports').send({ type: 'meter_readings' }).expect(201);
    const fetched = await request(app.getHttpServer()).get(`/v1/exports/${created.body.id}`).expect(200);
    const downloaded = await request(app.getHttpServer()).get(`/v1/exports/${created.body.id}/download`).expect(200);
    expect(fetched.body.status).toBe('completed');
    expect(downloaded.text).toContain('meterId,kwhConsumedAc,voltage,timestamp');
  });

  it('supports alert event filtering contracts', async () => {
    await request(app.getHttpServer()).post('/v1/alerts/rules').send({ name: 'low soc', kind: 'LOW_SOC', threshold: 30 }).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V-ALERT-CONTRACT', soc: 20 })).expect(201);
    const all = await request(app.getHttpServer()).get('/v1/alerts/events').expect(200);
    const filtered = await request(app.getHttpServer()).get('/v1/alerts/events?entityType=vehicle&entityId=V-ALERT-CONTRACT').expect(200);
    const fetched = await request(app.getHttpServer()).get(`/v1/alerts/events/${all.body[0].id}`).expect(200);
    expect(filtered.body).toHaveLength(1);
    expect(fetched.body.entityId).toBe('V-ALERT-CONTRACT');
  });

  it('supports route creation contracts for notifications and tariffs', async () => {
    const route = await request(app.getHttpServer()).post('/v1/notifications/routes').send({
      name: 'Webhook contract',
      channel: 'webhook',
      target: 'https://example.test/hook',
      minSeverity: 'low',
    }).expect(201);
    const tariff = await request(app.getHttpServer()).post('/v1/tariffs/windows').send({
      id: 'contract-window',
      name: 'Contract window',
      dayType: 'all',
      startHour: 1,
      endHour: 2,
      ratePerKwh: 0.11,
      demandChargePerKw: 0,
    }).expect(201);
    expect(route.body.channel).toBe('webhook');
    expect(tariff.body.id).toBe('contract-window');
  });

  it('supports work order filtering contracts', async () => {
    await request(app.getHttpServer()).post('/v1/maintenance/work-orders').send({
      entityType: 'site',
      entityId: 'SITE-CONTRACT',
      priority: 'urgent',
      title: 'Contract work order',
    }).expect(201);
    const response = await request(app.getHttpServer()).get('/v1/maintenance/work-orders?priority=urgent&entityId=SITE-CONTRACT').expect(200);
    expect(response.body.total).toBe(1);
    expect(response.body.data[0].title).toBe('Contract work order');
  });
});
