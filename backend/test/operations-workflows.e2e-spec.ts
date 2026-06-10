import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { meterPayload, vehiclePayload } from './helpers/payload.helper';

describe('cross-module operations workflows', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  it('connects device registration, telemetry, history, status, and reports', async () => {
    await request(app.getHttpServer()).post('/v1/devices').send({
      deviceId: 'M-WORKFLOW',
      kind: 'meter',
      siteId: 'SITE-W',
      displayName: 'Workflow meter',
      model: 'MX',
      firmwareVersion: '2.0.0',
      commissionedAt: '2026-02-09T10:00:00Z',
    }).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({
      meterId: 'M-WORKFLOW',
      kwhConsumedAc: 22,
      voltage: 229,
    })).expect(201);

    const status = await request(app.getHttpServer()).get('/v1/status/meters/M-WORKFLOW').expect(200);
    const history = await request(app.getHttpServer()).get('/v1/history/meters/M-WORKFLOW').expect(200);
    const report = await request(app.getHttpServer()).get('/v1/reports/operations').expect(200);

    expect(status.body.kwhConsumedAc).toBe(22);
    expect(history.body.total).toBe(1);
    expect(report.body.metrics.find((metric) => metric.label === 'meterReadings').value).toBe(1);
  });

  it('connects alert rules, anomalies, notifications, and maintenance follow-up', async () => {
    await request(app.getHttpServer()).post('/v1/alerts/rules').send({
      name: 'Hot battery workflow',
      kind: 'HIGH_BATTERY_TEMP',
      threshold: 40,
    }).expect(201);
    await request(app.getHttpServer()).post('/v1/notifications/routes').send({
      name: 'Ops',
      channel: 'email',
      target: 'ops@example.com',
      minSeverity: 'medium',
    }).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({
      vehicleId: 'V-WORKFLOW',
      batteryTemp: 48,
    })).expect(201);

    const events = await request(app.getHttpServer()).get('/v1/alerts/events').expect(200);
    const anomalies = await request(app.getHttpServer()).get('/v1/anomalies').expect(200);
    const preview = await request(app.getHttpServer()).post('/v1/notifications/preview').send({
      severity: 'high',
      title: 'Hot battery',
      message: 'Vehicle battery temperature crossed the high threshold.',
    }).expect(201);
    const workOrder = await request(app.getHttpServer()).post('/v1/maintenance/work-orders').send({
      entityType: 'vehicle',
      entityId: 'V-WORKFLOW',
      priority: 'urgent',
      title: 'Inspect hot battery',
    }).expect(201);

    expect(events.body).toHaveLength(1);
    expect(anomalies.body.data.map((row) => row.kind)).toContain('battery_hot');
    expect(preview.body[0].wouldSend).toBe(true);
    expect(workOrder.body.priority).toBe('urgent');
  });

  it('connects tariff estimates, capacity planning, and reconciliation', async () => {
    const timestamp = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({
      meterId: 'M-ENERGY-FLOW',
      kwhConsumedAc: 80,
      timestamp,
    })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({
      vehicleId: 'V-ENERGY-FLOW',
      kwhDeliveredDc: 70,
      timestamp,
    })).expect(201);

    const tariff = await request(app.getHttpServer()).post('/v1/tariffs/estimate').send({
      meterId: 'M-ENERGY-FLOW',
      from: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      to: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    }).expect(201);
    const capacity = await request(app.getHttpServer()).get('/v1/capacity/plan?siteLimitKw=100').expect(200);
    const reconciliation = await request(app.getHttpServer()).get('/v1/reconciliation/energy?hours=2&bucketHours=1').expect(200);

    expect(tariff.body.totalKwh).toBe(80);
    expect(capacity.body.risk).toBe('medium');
    expect(reconciliation.body.totalAc).toBe(80);
    expect(reconciliation.body.totalDc).toBe(70);
  });

  it('connects forecasts with growing telemetry trends', async () => {
    for (let index = 0; index < 10; index += 1) {
      await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({
        meterId: 'M-TREND-FLOW',
        kwhConsumedAc: 5 + index,
        timestamp: new Date(Date.now() - (10 - index) * 30 * 60 * 1000).toISOString(),
      })).expect(201);
    }
    const forecast = await request(app.getHttpServer()).get('/v1/forecasts/meters/M-TREND-FLOW?horizonHours=5').expect(200);
    expect(forecast.body.confidence).toBe('high');
    expect(forecast.body.points).toHaveLength(5);
    expect(forecast.body.points[4].expectedValue).toBeGreaterThanOrEqual(forecast.body.points[0].expectedValue);
  });

  it('keeps failed workflow requests out of audit logs', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send({ meterId: 'BAD' }).expect(400);
    await request(app.getHttpServer()).post('/v1/devices').send({ deviceId: 'BAD' }).expect(400);
    await request(app.getHttpServer()).post('/v1/tariffs/estimate').send({ meterId: 'BAD' }).expect(400);
    const logs = await request(app.getHttpServer()).get('/v1/audit-logs').expect(200);
    expect(logs.body).toEqual([]);
  });

  it('keeps bulk status and SLA reports consistent after multiple ingests', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ meterId: 'M-BULK-A' })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ meterId: 'M-BULK-B' })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V-BULK-A' })).expect(201);
    const meters = await request(app.getHttpServer()).get('/v1/status/meters').expect(200);
    const vehicles = await request(app.getHttpServer()).get('/v1/status/vehicles').expect(200);
    const sla = await request(app.getHttpServer()).get('/v1/sla/freshness').expect(200);
    expect(meters.body.total).toBe(2);
    expect(vehicles.body.total).toBe(1);
    expect(sla.body.policyCount).toBeGreaterThanOrEqual(2);
  });

  it('preserves append-only history through maintenance and reporting workflows', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({
      meterId: 'M-APPEND',
      kwhConsumedAc: 30,
      timestamp: '2026-02-09T11:00:00Z',
    })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({
      meterId: 'M-APPEND',
      kwhConsumedAc: 10,
      timestamp: '2026-02-09T10:00:00Z',
    })).expect(201);
    await request(app.getHttpServer()).post('/v1/maintenance/work-orders').send({
      entityType: 'meter',
      entityId: 'M-APPEND',
      title: 'Review historical readings',
    }).expect(201);
    const status = await request(app.getHttpServer()).get('/v1/status/meters/M-APPEND').expect(200);
    const history = await request(app.getHttpServer()).get('/v1/history/meters/M-APPEND?limit=10').expect(200);
    expect(status.body.kwhConsumedAc).toBe(30);
    expect(history.body.total).toBe(2);
  });
});
