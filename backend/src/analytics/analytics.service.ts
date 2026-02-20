import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { hoursWindow } from '../common/utils/date-window.util';
import { round, safeDivide } from '../common/utils/numeric.util';

@Injectable()
export class AnalyticsService {
  constructor(private readonly database: DatabaseService) {}

  async getPerformance(vehicleId: string, hours = 24) {
    const { from, to, hours: windowHours } = hoursWindow(hours);
    const meterReadings = await this.database.findMeterReadings(from, to);
    const vehicleReadings = (await this.database.findVehicleReadings(from, to)).filter((reading) => reading.vehicleId === vehicleId);
    const totalAc = meterReadings.reduce((sum, reading) => sum + reading.kwhConsumedAc, 0);
    const totalDc = vehicleReadings.reduce((sum, reading) => sum + reading.kwhDeliveredDc, 0);
    const avgBatteryTemp = vehicleReadings.length
      ? round(vehicleReadings.reduce((sum, reading) => sum + reading.batteryTemp, 0) / vehicleReadings.length)
      : null;
    return {
      vehicleId,
      hours: windowHours,
      totalAc: round(totalAc),
      totalDc: round(totalDc),
      efficiency: totalAc > 0 ? round(safeDivide(totalDc, totalAc) ?? 0) : null,
      avgBatteryTemp,
    };
  }

  async getFleetSummary() {
    const { from, to } = hoursWindow(24);
    const readings = await this.database.findVehicleReadings(from, to);
    const latest = new Map<string, (typeof readings)[number]>();
    for (const reading of readings) {
      const current = latest.get(reading.vehicleId);
      if (!current || current.timestamp.getTime() <= reading.timestamp.getTime()) {
        latest.set(reading.vehicleId, reading);
      }
    }
    const latestReadings = [...latest.values()];
    const totalDcDelivered = readings.reduce((sum, reading) => sum + reading.kwhDeliveredDc, 0);
    return {
      totalVehicles: latestReadings.length,
      averageSoc: latestReadings.length ? round(latestReadings.reduce((sum, reading) => sum + reading.soc, 0) / latestReadings.length) : null,
      averageBatteryTemp: readings.length ? round(readings.reduce((sum, reading) => sum + reading.batteryTemp, 0) / readings.length) : null,
      totalDcDelivered: round(totalDcDelivered),
    };
  }

  async getMeterSummary() {
    const { from, to } = hoursWindow(24);
    const readings = await this.database.findMeterReadings(from, to);
    const totalAcConsumption = readings.reduce((sum, reading) => sum + reading.kwhConsumedAc, 0);
    return {
      totalMeters: new Set(readings.map((reading) => reading.meterId)).size,
      totalAcConsumption: round(totalAcConsumption),
      averageVoltage: readings.length ? round(readings.reduce((sum, reading) => sum + reading.voltage, 0) / readings.length) : null,
    };
  }
}
