import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { hoursWindow } from '../common/utils/date-window.util';
import { round, safeDivide } from '../common/utils/numeric.util';
import { CapacityPlan } from './dto/capacity.dto';

@Injectable()
export class CapacityService {
  constructor(private readonly database: DatabaseService) {}

  async plan(hours = 24, siteLimitKw = 500): Promise<CapacityPlan> {
    const { from, to, hours: windowHours } = hoursWindow(hours);
    const readings = await this.database.findMeterReadings(from, to);
    const hourly = new Map<string, number>();
    for (const reading of readings) {
      const hourKey = reading.timestamp.toISOString().slice(0, 13);
      hourly.set(hourKey, (hourly.get(hourKey) ?? 0) + reading.kwhConsumedAc);
    }
    const observedPeakKw = round(Math.max(0, ...hourly.values()), 3);
    const utilization = safeDivide(observedPeakKw, siteLimitKw);
    const utilizationPercent = utilization == null ? 0 : round(utilization * 100, 2);
    const headroomKw = round(siteLimitKw - observedPeakKw, 3);
    const risk = utilizationPercent >= 90 ? 'high' : utilizationPercent >= 70 ? 'medium' : 'low';
    return {
      generatedAt: to.toISOString(),
      hours: windowHours,
      siteLimitKw,
      observedPeakKw,
      utilizationPercent,
      headroomKw,
      risk,
      recommendations: this.recommend(risk, headroomKw, readings.length),
    };
  }

  private recommend(risk: CapacityPlan['risk'], headroomKw: number, readingCount: number): string[] {
    const recommendations: string[] = [];
    if (readingCount === 0) recommendations.push('No meter readings are available; capacity planning confidence is low.');
    if (risk === 'high') recommendations.push('Observed load is near the site limit; defer flexible EV charging or add capacity.');
    if (risk === 'medium') recommendations.push('Load is elevated; monitor peak windows and review tariff-aware scheduling.');
    if (headroomKw < 0) recommendations.push('Observed load exceeds configured site capacity and should be investigated immediately.');
    if (!recommendations.length) recommendations.push('Capacity headroom is healthy for the selected planning window.');
    return recommendations;
  }
}
