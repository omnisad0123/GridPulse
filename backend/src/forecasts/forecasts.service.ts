import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { getWindowStart } from '../common/utils/date-window.util';
import { average, round } from '../common/utils/numeric.util';
import { ForecastPoint, ForecastResponse } from './dto/forecast.dto';
import { InvalidPayloadException } from '../common/exceptions/gridpulse.exception';

@Injectable()
export class ForecastsService {
  constructor(private readonly database: DatabaseService) {}

  async meter(meterId: string, horizonHours = 6): Promise<ForecastResponse> {
    const readings = (await this.database.findMeterReadings(getWindowStart(168), new Date()))
      .filter((reading) => reading.meterId === meterId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    const values = readings.map((reading) => reading.kwhConsumedAc);
    return this.forecast(meterId, 'meter', 'kwhConsumedAc', values, horizonHours);
  }

  async vehicle(vehicleId: string, horizonHours = 6, metric = 'kwhDeliveredDc'): Promise<ForecastResponse> {
    if (!['kwhDeliveredDc', 'soc'].includes(metric)) {
      throw new InvalidPayloadException('Vehicle forecast metric must be kwhDeliveredDc or soc');
    }
    const readings = (await this.database.findVehicleReadings(getWindowStart(168), new Date()))
      .filter((reading) => reading.vehicleId === vehicleId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    const values = metric === 'soc'
      ? readings.map((reading) => reading.soc)
      : readings.map((reading) => reading.kwhDeliveredDc);
    return this.forecast(vehicleId, 'vehicle', metric as any, values, horizonHours);
  }

  private forecast(
    entityId: string,
    entityType: 'meter' | 'vehicle',
    metric: 'kwhConsumedAc' | 'kwhDeliveredDc' | 'soc',
    values: number[],
    horizonHours: number,
  ): ForecastResponse {
    const horizon = Math.min(Math.max(Math.floor(horizonHours || 6), 1), 24);
    const recent = values.slice(-12);
    const baseline = average(recent) ?? 0;
    const trend = this.trend(recent);
    const volatility = this.volatility(recent, baseline);
    const confidence = recent.length >= 8 ? 'high' : recent.length >= 3 ? 'medium' : 'low';
    const now = new Date();
    const points: ForecastPoint[] = [];
    for (let step = 1; step <= horizon; step += 1) {
      const expected = metric === 'soc'
        ? this.clampSoc(baseline + trend * step)
        : Math.max(baseline + trend * step, 0);
      const band = volatility * Math.sqrt(step || 1);
      points.push({
        timestamp: new Date(now.getTime() + step * 60 * 60 * 1000).toISOString(),
        expectedValue: round(expected, 3),
        lowerBound: round(metric === 'soc' ? this.clampSoc(expected - band) : Math.max(expected - band, 0), 3),
        upperBound: round(metric === 'soc' ? this.clampSoc(expected + band) : expected + band, 3),
      });
    }
    return {
      entityId,
      entityType,
      metric,
      basisReadings: recent.length,
      horizonHours: horizon,
      confidence,
      points,
    };
  }

  private trend(values: number[]): number {
    if (values.length < 2) return 0;
    const deltas = values.slice(1).map((value, index) => value - values[index]);
    return average(deltas) ?? 0;
  }

  private volatility(values: number[], baseline: number): number {
    if (values.length < 2) return baseline === 0 ? 1 : Math.abs(baseline) * 0.1;
    const variance = average(values.map((value) => (value - baseline) ** 2)) ?? 0;
    return Math.max(Math.sqrt(variance), 0.1);
  }

  private clampSoc(value: number): number {
    return Math.min(Math.max(value, 0), 100);
  }
}
