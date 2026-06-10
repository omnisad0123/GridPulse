import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { meterPayload } from './helpers/payload.helper';

describe('sla freshness', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  it('lists default SLA policies', async () => {
    const response = await request(app.getHttpServer()).get('/v1/sla/policies').expect(200);
    expect(response.body.map((policy) => policy.id)).toContain('meter-freshness');
  });

  it('creates custom SLA policies', async () => {
    const response = await request(app.getHttpServer()).post('/v1/sla/policies').send({
      id: 'meter-tight',
      entityType: 'meter',
      warningAgeMinutes: 5,
      maxTelemetryAgeMinutes: 15,
      description: 'Tight freshness policy',
    }).expect(201);
    expect(response.body.id).toBe('meter-tight');
  });

  it('reports freshness violations for stale current status', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({
      meterId: 'M-SLA',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    })).expect(201);
    const response = await request(app.getHttpServer()).get('/v1/sla/freshness').expect(200);
    expect(response.body.breachCount).toBeGreaterThanOrEqual(1);
    expect(response.body.violations.some((violation) => violation.entityId === 'M-SLA')).toBe(true);
  });
});
