import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/app.helper';
import { meterPayload, vehiclePayload } from './helpers/payload.helper';

describe('history endpoints', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await createTestApp());
  });

  afterEach(async () => {
    await app.close();
  });

  async function seedMeterSeries() {
    for (let index = 0; index < 5; index += 1) {
      await request(app.getHttpServer())
        .post('/v1/ingest')
        .send(meterPayload({
          meterId: 'M-HIST',
          kwhConsumedAc: 10 + index,
          voltage: 220 + index,
          timestamp: `2026-02-09T10:0${index}:00Z`,
        }))
        .expect(201);
    }
  }

  async function seedVehicleSeries() {
    for (let index = 0; index < 4; index += 1) {
      await request(app.getHttpServer())
        .post('/v1/ingest')
        .send(vehiclePayload({
          vehicleId: 'V-HIST',
          soc: 50 + index,
          kwhDeliveredDc: 7 + index,
          batteryTemp: 30 + index,
          timestamp: `2026-02-09T11:0${index}:00Z`,
        }))
        .expect(201);
    }
  }

  it('returns paginated meter readings sorted newest first', async () => {
    await seedMeterSeries();
    const response = await request(app.getHttpServer())
      .get('/v1/history/meters/M-HIST?page=1&limit=2')
      .expect(200);

    expect(response.body.total).toBe(5);
    expect(response.body.page).toBe(1);
    expect(response.body.limit).toBe(2);
    expect(response.body.totalPages).toBe(3);
    expect(response.body.data).toHaveLength(2);
    expect(response.body.data[0].kwhConsumedAc).toBe(14);
    expect(response.body.data[1].kwhConsumedAc).toBe(13);
  });

  it('respects page offsets for meter history', async () => {
    await seedMeterSeries();
    const response = await request(app.getHttpServer())
      .get('/v1/history/meters/M-HIST?page=2&limit=2')
      .expect(200);

    expect(response.body.data).toHaveLength(2);
    expect(response.body.data[0].kwhConsumedAc).toBe(12);
    expect(response.body.data[1].kwhConsumedAc).toBe(11);
  });

  it('returns an empty page for an unknown meter', async () => {
    const response = await request(app.getHttpServer())
      .get('/v1/history/meters/UNKNOWN?page=1&limit=10')
      .expect(200);

    expect(response.body.total).toBe(0);
    expect(response.body.data).toEqual([]);
  });

  it('summarizes all-time meter history', async () => {
    await seedMeterSeries();
    const response = await request(app.getHttpServer())
      .get('/v1/history/meters/M-HIST/summary')
      .expect(200);

    expect(response.body.count).toBe(5);
    expect(response.body.kwhConsumedAc.min).toBe(10);
    expect(response.body.kwhConsumedAc.max).toBe(14);
    expect(response.body.kwhConsumedAc.avg).toBe(12);
    expect(response.body.voltage.avg).toBe(222);
  });

  it('returns paginated vehicle readings sorted newest first', async () => {
    await seedVehicleSeries();
    const response = await request(app.getHttpServer())
      .get('/v1/history/vehicles/V-HIST?page=1&limit=3')
      .expect(200);

    expect(response.body.total).toBe(4);
    expect(response.body.data).toHaveLength(3);
    expect(response.body.data[0].soc).toBe(53);
    expect(response.body.data[2].soc).toBe(51);
  });

  it('summarizes all-time vehicle history', async () => {
    await seedVehicleSeries();
    const response = await request(app.getHttpServer())
      .get('/v1/history/vehicles/V-HIST/summary')
      .expect(200);

    expect(response.body.count).toBe(4);
    expect(response.body.soc.min).toBe(50);
    expect(response.body.soc.max).toBe(53);
    expect(response.body.kwhDeliveredDc.avg).toBe(8.5);
    expect(response.body.batteryTemp.avg).toBe(31.5);
  });
});
