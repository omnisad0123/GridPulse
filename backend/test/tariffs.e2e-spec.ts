import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { meterPayload } from './helpers/payload.helper';

describe('tariff modeling', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  it('lists seeded tariff windows', async () => {
    const response = await request(app.getHttpServer()).get('/v1/tariffs/windows').expect(200);
    expect(response.body.length).toBeGreaterThanOrEqual(4);
    expect(response.body.map((row) => row.id)).toContain('off-peak');
  });

  it('creates custom tariff windows', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/tariffs/windows')
      .send({ id: 'solar-midday', name: 'Solar midday', dayType: 'all', startHour: 11, endHour: 15, ratePerKwh: 0.05, demandChargePerKw: 0 })
      .expect(201);

    expect(response.body.ratePerKwh).toBe(0.05);
  });

  it('rejects invalid tariff windows', async () => {
    await request(app.getHttpServer())
      .post('/v1/tariffs/windows')
      .send({ id: 'bad', name: 'Bad', dayType: 'weekday', startHour: 18, endHour: 10, ratePerKwh: 0.1 })
      .expect(400);
  });

  it('estimates meter energy costs across matching windows', async () => {
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({
      meterId: 'M-COST',
      kwhConsumedAc: 10,
      timestamp: '2026-02-09T03:00:00Z',
    })).expect(201);
    await request(app.getHttpServer()).post('/v1/ingest').send(meterPayload({
      meterId: 'M-COST',
      kwhConsumedAc: 20,
      timestamp: '2026-02-09T18:00:00Z',
    })).expect(201);

    const response = await request(app.getHttpServer())
      .post('/v1/tariffs/estimate')
      .send({ meterId: 'M-COST', from: '2026-02-09T00:00:00Z', to: '2026-02-10T00:00:00Z' })
      .expect(201);

    expect(response.body.totalKwh).toBe(30);
    expect(response.body.totalEnergyCost).toBe(5.2);
    expect(response.body.lineItems).toHaveLength(2);
    expect(response.body.averageRate).toBeCloseTo(0.1733, 4);
  });

  it('returns zero cost for ranges with no readings', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/tariffs/estimate')
      .send({ meterId: 'M-EMPTY', from: '2026-02-09T00:00:00Z', to: '2026-02-10T00:00:00Z' })
      .expect(201);

    expect(response.body.totalKwh).toBe(0);
    expect(response.body.averageRate).toBeNull();
  });
});
