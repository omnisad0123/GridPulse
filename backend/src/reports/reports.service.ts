import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { hoursWindow } from '../common/utils/date-window.util';
import { average, round, safeDivide } from '../common/utils/numeric.util';
import { EntityFreshness, IngestionQualityReport, OperationalReport, ReportMetric } from './dto/operational-report.dto';
import { CurrentMeterStatus } from '../database/entities/current-meter-status.entity';
import { CurrentVehicleStatus } from '../database/entities/current-vehicle-status.entity';

@Injectable()
export class ReportsService {
  constructor(private readonly database: DatabaseService) {}

  async operations(hours = 24): Promise<OperationalReport> {
    const { from, to, hours: windowHours } = hoursWindow(hours);
    const [meters, vehicles, meterStatuses, vehicleStatuses, alertEvents] = await Promise.all([
      this.database.findMeterReadings(from, to),
      this.database.findVehicleReadings(from, to),
      this.database.listMeterStatuses(1, 500),
      this.database.listVehicleStatuses(1, 500),
      this.database.listAlertEvents(),
    ]);

    const totalAc = meters.reduce((sum, reading) => sum + reading.kwhConsumedAc, 0);
    const totalDc = vehicles.reduce((sum, reading) => sum + reading.kwhDeliveredDc, 0);
    const averageSoc = average(vehicles.map((reading) => reading.soc));
    const averageVoltage = average(meters.map((reading) => reading.voltage));
    const averageTemp = average(vehicles.map((reading) => reading.batteryTemp));
    const efficiency = safeDivide(totalDc, totalAc);
    const meterStatusRows = meterStatuses.data as CurrentMeterStatus[];
    const vehicleStatusRows = vehicleStatuses.data as CurrentVehicleStatus[];
    const staleEntities = [
      ...meterStatusRows.map((status) => this.freshness('meter' as const, status.meterId, status.lastUpdated, to)),
      ...vehicleStatusRows.map((status) => this.freshness('vehicle' as const, status.vehicleId, status.lastUpdated, to)),
    ].filter((entity) => entity.state !== 'fresh');

    return {
      generatedAt: to.toISOString(),
      windowHours,
      metrics: [
        this.metric('meterReadings', meters.length, 'count', 'Meter readings received inside the selected window.'),
        this.metric('vehicleReadings', vehicles.length, 'count', 'Vehicle readings received inside the selected window.'),
        this.metric('totalAc', round(totalAc), 'kWh', 'Total AC energy reported by meters.'),
        this.metric('totalDc', round(totalDc), 'kWh', 'Total DC energy delivered to vehicles.'),
        this.metric('efficiency', efficiency == null ? null : round(efficiency), 'ratio', 'DC to AC ratio for the selected window.'),
        this.metric('averageSoc', averageSoc == null ? null : round(averageSoc), '%', 'Mean state of charge across vehicle readings.'),
        this.metric('averageVoltage', averageVoltage == null ? null : round(averageVoltage), 'V', 'Mean voltage across meter readings.'),
        this.metric('averageBatteryTemp', averageTemp == null ? null : round(averageTemp), 'C', 'Mean battery temperature across vehicle readings.'),
        this.metric('alertEvents', alertEvents.length, 'count', 'Total alert events currently retained.'),
      ],
      staleEntities,
      recommendations: this.recommend(meters.length, vehicles.length, staleEntities.length, averageTemp, averageVoltage),
    };
  }

  async ingestionQuality(): Promise<IngestionQualityReport> {
    const logs = await this.database.listAuditLogs();
    const ingestEvents = logs.filter((log) => log.action === 'ingest.meter' || log.action === 'ingest.vehicle').length;
    const batchEvents = logs.filter((log) => log.action === 'ingest.batch').length;
    const alertMutationEvents = logs.filter((log) => log.action.startsWith('alert_rule.')).length;
    const exportEvents = logs.filter((log) => log.action === 'export.create').length;
    const sorted = [...logs].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    return {
      generatedAt: new Date().toISOString(),
      totalAuditEvents: logs.length,
      ingestEvents,
      batchEvents,
      alertMutationEvents,
      exportEvents,
      newestEventAt: sorted.length ? sorted[sorted.length - 1].createdAt.toISOString() : null,
      oldestEventAt: sorted.length ? sorted[0].createdAt.toISOString() : null,
    };
  }

  private metric(label: string, value: number | string | null, unit: string, description: string): ReportMetric {
    return { label, value, unit, description };
  }

  private freshness(entityType: 'meter' | 'vehicle', entityId: string, lastUpdated: Date, now: Date): EntityFreshness {
    const ageMinutes = Math.round((now.getTime() - new Date(lastUpdated).getTime()) / 60_000);
    const state = ageMinutes > 120 ? 'critical' : ageMinutes > 30 ? 'stale' : 'fresh';
    return { entityType, entityId, lastUpdated: new Date(lastUpdated), ageMinutes, state };
  }

  private recommend(meterRows: number, vehicleRows: number, staleCount: number, averageTemp: number | null, averageVoltage: number | null): string[] {
    const recommendations: string[] = [];
    if (meterRows === 0) recommendations.push('No meter readings were observed in the selected window; verify meter ingestion connectivity.');
    if (vehicleRows === 0) recommendations.push('No vehicle readings were observed in the selected window; verify EV telemetry publishers.');
    if (staleCount > 0) recommendations.push('Some entities have stale current status; inspect device heartbeat and ingestion schedules.');
    if (averageTemp != null && averageTemp >= 45) recommendations.push('Average battery temperature is high; review thermal alert thresholds and charger load.');
    if (averageVoltage != null && (averageVoltage < 210 || averageVoltage > 250)) recommendations.push('Average voltage is outside the expected range; inspect voltage anomaly alert rules.');
    if (!recommendations.length) recommendations.push('Telemetry volume, freshness, and operating metrics are within expected bounds.');
    return recommendations;
  }
}
