import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { hoursWindow } from '../common/utils/date-window.util';
import { average, round, safeDivide } from '../common/utils/numeric.util';
import { ReconciliationResponse, ReconciliationWindow } from './dto/reconciliation.dto';

@Injectable()
export class ReconciliationService {
  constructor(private readonly database: DatabaseService) {}

  async energy(hours = 24, bucketHours = 1): Promise<ReconciliationResponse> {
    const normalizedBucket = Math.min(Math.max(Math.floor(bucketHours || 1), 1), 24);
    const { from, to, hours: windowHours } = hoursWindow(hours);
    const [meterReadings, vehicleReadings] = await Promise.all([
      this.database.findMeterReadings(from, to),
      this.database.findVehicleReadings(from, to),
    ]);
    const windows = this.windows(from, to, normalizedBucket).map((window) => {
      const ac = meterReadings
        .filter((reading) => this.inWindow(reading.timestamp, window.from, window.to))
        .reduce((sum, reading) => sum + reading.kwhConsumedAc, 0);
      const dc = vehicleReadings
        .filter((reading) => this.inWindow(reading.timestamp, window.from, window.to))
        .reduce((sum, reading) => sum + reading.kwhDeliveredDc, 0);
      return this.summarizeWindow(window.from, window.to, ac, dc);
    });
    const totalAc = round(windows.reduce((sum, window) => sum + window.totalAc, 0), 4);
    const totalDc = round(windows.reduce((sum, window) => sum + window.totalDc, 0), 4);
    const totalLossKwh = round(totalAc - totalDc, 4);
    const lossPercents = windows.map((window) => window.lossPercent).filter((value): value is number => value !== null);
    return {
      generatedAt: to.toISOString(),
      hours: windowHours,
      windowCount: windows.length,
      totalAc,
      totalDc,
      totalLossKwh,
      averageLossPercent: lossPercents.length ? round(average(lossPercents) ?? 0, 4) : null,
      windows,
      notes: this.notes(windows, totalAc, totalDc),
    };
  }

  private summarizeWindow(from: Date, to: Date, totalAc: number, totalDc: number): ReconciliationWindow {
    const roundedAc = round(totalAc, 4);
    const roundedDc = round(totalDc, 4);
    const lossKwh = round(roundedAc - roundedDc, 4);
    const lossPercent = safeDivide(lossKwh, roundedAc);
    const status = this.status(roundedAc, roundedDc, lossPercent);
    return {
      from,
      to,
      totalAc: roundedAc,
      totalDc: roundedDc,
      lossKwh,
      lossPercent: lossPercent == null ? null : round(lossPercent, 4),
      status,
    };
  }

  private status(totalAc: number, totalDc: number, lossPercent: number | null): ReconciliationWindow['status'] {
    if (totalAc === 0 && totalDc === 0) return 'missing_data';
    if (totalAc === 0 || totalDc === 0) return 'watch';
    if (lossPercent != null && lossPercent > 0.25) return 'loss_high';
    if (lossPercent != null && Math.abs(lossPercent) > 0.1) return 'watch';
    return 'balanced';
  }

  private windows(from: Date, to: Date, bucketHours: number) {
    const result: Array<{ from: Date; to: Date }> = [];
    let cursor = new Date(from);
    while (cursor.getTime() < to.getTime()) {
      const next = new Date(Math.min(cursor.getTime() + bucketHours * 60 * 60 * 1000, to.getTime()));
      result.push({ from: cursor, to: next });
      cursor = next;
    }
    return result;
  }

  private inWindow(timestamp: Date, from: Date, to: Date) {
    const time = timestamp.getTime();
    return time >= from.getTime() && time < to.getTime();
  }

  private notes(windows: ReconciliationWindow[], totalAc: number, totalDc: number): string[] {
    const notes: string[] = [];
    if (totalAc === 0) notes.push('No AC meter energy was available for the reconciliation period.');
    if (totalDc === 0) notes.push('No DC vehicle energy was available for the reconciliation period.');
    if (windows.some((window) => window.status === 'loss_high')) notes.push('At least one bucket has high AC/DC loss and should be investigated.');
    if (windows.some((window) => window.status === 'watch')) notes.push('Some buckets have partial or imbalanced data and should be reviewed.');
    if (!notes.length) notes.push('Energy reconciliation is within expected operating bounds.');
    return notes;
  }
}
