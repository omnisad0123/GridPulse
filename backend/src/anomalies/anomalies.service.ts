import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { hoursWindow } from '../common/utils/date-window.util';
import { round, safeDivide } from '../common/utils/numeric.util';
import { AnomalyKind, AnomalyRecord, AnomalyScanResult, AnomalySeverity } from './dto/anomaly.dto';

@Injectable()
export class AnomaliesService {
  constructor(private readonly database: DatabaseService) {}

  async scan(hours = 24): Promise<AnomalyScanResult> {
    const { from, to, hours: windowHours } = hoursWindow(hours);
    const [meters, vehicles] = await Promise.all([
      this.database.findMeterReadings(from, to),
      this.database.findVehicleReadings(from, to),
    ]);
    const anomalies: AnomalyRecord[] = [];
    for (const reading of meters) {
      if (reading.voltage < 210) {
        anomalies.push(this.record('voltage_low', 'meter', reading.meterId, reading.voltage, '210..250', reading.timestamp, 'high'));
      }
      if (reading.voltage > 250) {
        anomalies.push(this.record('voltage_high', 'meter', reading.meterId, reading.voltage, '210..250', reading.timestamp, 'medium'));
      }
    }
    for (const reading of vehicles) {
      if (reading.batteryTemp >= 45) {
        anomalies.push(this.record('battery_hot', 'vehicle', reading.vehicleId, reading.batteryTemp, '<45', reading.timestamp, 'high'));
      }
      if (reading.soc <= 15) {
        anomalies.push(this.record('soc_low', 'vehicle', reading.vehicleId, reading.soc, '>15', reading.timestamp, 'medium'));
      }
    }
    const totalAc = meters.reduce((sum, reading) => sum + reading.kwhConsumedAc, 0);
    const totalDc = vehicles.reduce((sum, reading) => sum + reading.kwhDeliveredDc, 0);
    const efficiency = safeDivide(totalDc, totalAc);
    if (efficiency != null && efficiency < 0.55 && totalDc > 0) {
      anomalies.push(this.record('efficiency_low', 'fleet', 'fleet', round(efficiency, 4), '>=0.55', to, 'low'));
    }
    const sorted = anomalies.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    return {
      generatedAt: to.toISOString(),
      hours: windowHours,
      total: sorted.length,
      high: sorted.filter((record) => record.severity === 'high').length,
      medium: sorted.filter((record) => record.severity === 'medium').length,
      low: sorted.filter((record) => record.severity === 'low').length,
      data: sorted,
    };
  }

  private record(
    kind: AnomalyKind,
    entityType: 'meter' | 'vehicle' | 'fleet',
    entityId: string,
    measuredValue: number,
    expectedRange: string,
    timestamp: Date,
    severity: AnomalySeverity,
  ): AnomalyRecord {
    return {
      id: `${kind}:${entityType}:${entityId}:${timestamp.toISOString()}`,
      kind,
      entityType,
      entityId,
      severity,
      measuredValue,
      expectedRange,
      timestamp,
      explanation: `${kind} detected for ${entityType} ${entityId}; measured ${measuredValue}, expected ${expectedRange}.`,
    };
  }
}
