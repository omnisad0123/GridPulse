import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { meterPayload, vehiclePayload } from './helpers/payload.helper';

describe('operational reports', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  it('returns operational metrics and recommendations for empty telemetry', async () => {
    const response = await request(app.getHttpServer()).get('/v1/reports/operations').expect(200);

    expect(response.body.windowHours).toBe(24);
    expect(response.body.metrics.find((metric) => metric.label === 'meterReadings').value).toBe(0);
    expect(response.body.metrics.find((metric) => metric.label === 'vehicleReadings').value).toBe(0);
    expect(response.body.recommendations).toContain('No meter readings were observed in the selected window; verify meter ingestion connectivity.');
  });

  it('summarizes AC, DC, SOC, voltage, and battery temperature metrics', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ meterId: 'M-RPT', kwhConsumedAc: 20, voltage: 230 })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V-RPT', soc: 75, kwhDeliveredDc: 10, batteryTemp: 34 })).expect(201);

    const response = await request(app.getHttpServer()).get('/v1/reports/operations?hours=48').expect(200);

    expect(response.body.windowHours).toBe(48);
    expect(response.body.metrics.find((metric) => metric.label === 'totalAc').value).toBe(20);
    expect(response.body.metrics.find((metric) => metric.label === 'totalDc').value).toBe(10);
    expect(response.body.metrics.find((metric) => metric.label === 'averageSoc').value).toBe(75);
    expect(response.body.metrics.find((metric) => metric.label === 'averageVoltage').value).toBe(230);
  });

  it('includes alert event counts and stale entity diagnostics', async () => {
    await request(app.getHttpServer()).post('/v1/alerts/rules').send({ name: 'hot', kind: 'HIGH_BATTERY_TEMP', threshold: 40 }).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(vehiclePayload({ vehicleId: 'V-HOT', batteryTemp: 45 })).expect(201);

    const response = await request(app.getHttpServer()).get('/v1/reports/operations').expect(200);

    expect(response.body.metrics.find((metric) => metric.label === 'alertEvents').value).toBe(1);
    expect(Array.isArray(response.body.staleEntities)).toBe(true);
    expect(response.body.recommendations.length).toBeGreaterThan(0);
  });

  it('summarizes audit log categories for ingestion quality', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({ meterId: 'M-AUDIT' })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest/batch').send({ records: [vehiclePayload({ vehicleId: 'V-AUDIT' })] }).expect(201);
    await request(app.getHttpServer()).post('/v1/exports').send({ type: 'analytics_summary' }).expect(201);

    const response = await request(app.getHttpServer()).get('/v1/reports/ingestion-quality').expect(200);

    expect(response.body.totalAuditEvents).toBeGreaterThanOrEqual(3);
    expect(response.body.ingestEvents).toBe(1);
    expect(response.body.batchEvents).toBe(1);
    expect(response.body.exportEvents).toBe(1);
    expect(response.body.newestEventAt).toBeTruthy();
    expect(response.body.oldestEventAt).toBeTruthy();
  });
});
