import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { databaseConfig } from '../config/database.config';
import { MeterReading } from './entities/meter-reading.entity';
import { VehicleReading } from './entities/vehicle-reading.entity';
import { CurrentMeterStatus } from './entities/current-meter-status.entity';
import { CurrentVehicleStatus } from './entities/current-vehicle-status.entity';
import { IngestionBatch } from './entities/ingestion-batch.entity';
import { AlertEvent } from './entities/alert-event.entity';
import { AlertRule } from './entities/alert-rule.entity';
import { AuditLog } from './entities/audit-log.entity';
import { ExportJob } from './entities/export-job.entity';
import { isWithinWindow } from '../common/utils/date-window.util';

interface Store {
  meterReadings: MeterReading[];
  vehicleReadings: VehicleReading[];
  meterStatus: Map<string, CurrentMeterStatus>;
  vehicleStatus: Map<string, CurrentVehicleStatus>;
  batches: IngestionBatch[];
  alertRules: AlertRule[];
  alertEvents: AlertEvent[];
  auditLogs: AuditLog[];
  exportJobs: ExportJob[];
}

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly isTest = process.env.NODE_ENV === 'test';
  private readonly pool = this.isTest ? null : this.createPool();
  private store: Store = this.createStore();

  async onModuleDestroy() {
    await this.pool?.end();
  }

  reset() {
    this.store = this.createStore();
  }

  async insertMeterReading(input: Omit<MeterReading, 'id' | 'createdAt'>): Promise<MeterReading> {
    const reading = { id: randomUUID(), createdAt: new Date(), ...input };
    if (this.isTest) {
      this.store.meterReadings.push(reading);
      const current = this.store.meterStatus.get(reading.meterId);
      if (!current || reading.timestamp.getTime() >= current.lastUpdated.getTime()) {
        this.store.meterStatus.set(reading.meterId, {
          meterId: reading.meterId,
          kwhConsumedAc: reading.kwhConsumedAc,
          voltage: reading.voltage,
          lastUpdated: reading.timestamp,
        });
      }
      return reading;
    }
    await this.pool!.query(
      `INSERT INTO meter_readings (id, meter_id, kwh_consumed_ac, voltage, timestamp, batch_id, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [reading.id, reading.meterId, reading.kwhConsumedAc, reading.voltage, reading.timestamp, reading.batchId, reading.createdAt],
    );
    await this.pool!.query(
      `INSERT INTO current_meter_status (meter_id, kwh_consumed_ac, voltage, last_updated)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (meter_id) DO UPDATE SET
         kwh_consumed_ac = EXCLUDED.kwh_consumed_ac,
         voltage = EXCLUDED.voltage,
         last_updated = EXCLUDED.last_updated
       WHERE current_meter_status.last_updated <= EXCLUDED.last_updated`,
      [reading.meterId, reading.kwhConsumedAc, reading.voltage, reading.timestamp],
    );
    return reading;
  }

  async insertVehicleReading(input: Omit<VehicleReading, 'id' | 'createdAt'>): Promise<VehicleReading> {
    const reading = { id: randomUUID(), createdAt: new Date(), ...input };
    if (this.isTest) {
      this.store.vehicleReadings.push(reading);
      const current = this.store.vehicleStatus.get(reading.vehicleId);
      if (!current || reading.timestamp.getTime() >= current.lastUpdated.getTime()) {
        this.store.vehicleStatus.set(reading.vehicleId, {
          vehicleId: reading.vehicleId,
          soc: reading.soc,
          kwhDeliveredDc: reading.kwhDeliveredDc,
          batteryTemp: reading.batteryTemp,
          lastUpdated: reading.timestamp,
        });
      }
      return reading;
    }
    await this.pool!.query(
      `INSERT INTO vehicle_readings (id, vehicle_id, soc, kwh_delivered_dc, battery_temp, timestamp, batch_id, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [reading.id, reading.vehicleId, reading.soc, reading.kwhDeliveredDc, reading.batteryTemp, reading.timestamp, reading.batchId, reading.createdAt],
    );
    await this.pool!.query(
      `INSERT INTO current_vehicle_status (vehicle_id, soc, kwh_delivered_dc, battery_temp, last_updated)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (vehicle_id) DO UPDATE SET
         soc = EXCLUDED.soc,
         kwh_delivered_dc = EXCLUDED.kwh_delivered_dc,
         battery_temp = EXCLUDED.battery_temp,
         last_updated = EXCLUDED.last_updated
       WHERE current_vehicle_status.last_updated <= EXCLUDED.last_updated`,
      [reading.vehicleId, reading.soc, reading.kwhDeliveredDc, reading.batteryTemp, reading.timestamp],
    );
    return reading;
  }

  async createBatch(meterCount: number, vehicleCount: number): Promise<IngestionBatch> {
    const batch = { id: randomUUID(), meterCount, vehicleCount, createdAt: new Date() };
    if (this.isTest) {
      this.store.batches.push(batch);
      return batch;
    }
    await this.pool!.query(
      `INSERT INTO ingestion_batches (id, meter_count, vehicle_count, created_at) VALUES ($1, $2, $3, $4)`,
      [batch.id, batch.meterCount, batch.vehicleCount, batch.createdAt],
    );
    return batch;
  }

  async getMeterStatus(meterId: string) {
    if (this.isTest) return this.store.meterStatus.get(meterId) ?? null;
    const result = await this.pool!.query(
      `SELECT meter_id, kwh_consumed_ac, voltage, last_updated FROM current_meter_status WHERE meter_id = $1`,
      [meterId],
    );
    return result.rows[0] ? this.mapMeterStatus(result.rows[0]) : null;
  }

  async getVehicleStatus(vehicleId: string) {
    if (this.isTest) return this.store.vehicleStatus.get(vehicleId) ?? null;
    const result = await this.pool!.query(
      `SELECT vehicle_id, soc, kwh_delivered_dc, battery_temp, last_updated FROM current_vehicle_status WHERE vehicle_id = $1`,
      [vehicleId],
    );
    return result.rows[0] ? this.mapVehicleStatus(result.rows[0]) : null;
  }

  meterReadingsBetween(from: Date, to: Date) {
    return this.store.meterReadings.filter((reading) => isWithinWindow(reading.timestamp, from, to));
  }

  vehicleReadingsBetween(from: Date, to: Date) {
    return this.store.vehicleReadings.filter((reading) => isWithinWindow(reading.timestamp, from, to));
  }

  async findMeterReadings(from: Date, to: Date): Promise<MeterReading[]> {
    if (this.isTest) return this.meterReadingsBetween(from, to);
    const result = await this.pool!.query(
      `SELECT * FROM meter_readings WHERE timestamp BETWEEN $1 AND $2 ORDER BY timestamp DESC`,
      [from, to],
    );
    return result.rows.map((row) => this.mapMeterReading(row));
  }

  async findVehicleReadings(from: Date, to: Date): Promise<VehicleReading[]> {
    if (this.isTest) return this.vehicleReadingsBetween(from, to);
    const result = await this.pool!.query(
      `SELECT * FROM vehicle_readings WHERE timestamp BETWEEN $1 AND $2 ORDER BY timestamp DESC`,
      [from, to],
    );
    return result.rows.map((row) => this.mapVehicleReading(row));
  }

  async listAlertRules(): Promise<AlertRule[]> {
    return [...this.store.alertRules].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createAlertRule(rule: Omit<AlertRule, 'id' | 'createdAt' | 'updatedAt'>): Promise<AlertRule> {
    const now = new Date();
    const created = { id: randomUUID(), createdAt: now, updatedAt: now, ...rule };
    this.store.alertRules.push(created);
    return created;
  }

  async updateAlertRule(id: string, update: Partial<Pick<AlertRule, 'name' | 'threshold' | 'enabled'>>): Promise<AlertRule | null> {
    const rule = this.store.alertRules.find((candidate) => candidate.id === id);
    if (!rule) return null;
    Object.assign(rule, update, { updatedAt: new Date() });
    return rule;
  }

  async deleteAlertRule(id: string): Promise<boolean> {
    const before = this.store.alertRules.length;
    this.store.alertRules = this.store.alertRules.filter((rule) => rule.id !== id);
    return this.store.alertRules.length !== before;
  }

  async createAlertEvent(event: Omit<AlertEvent, 'id' | 'createdAt'>): Promise<AlertEvent> {
    const created = { id: randomUUID(), createdAt: new Date(), ...event };
    this.store.alertEvents.push(created);
    return created;
  }

  async listAlertEvents(filter: { entityType?: string; entityId?: string } = {}): Promise<AlertEvent[]> {
    return this.store.alertEvents
      .filter((event) => !filter.entityType || event.entityType === filter.entityType)
      .filter((event) => !filter.entityId || event.entityId === filter.entityId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getAlertEvent(id: string): Promise<AlertEvent | null> {
    return this.store.alertEvents.find((event) => event.id === id) ?? null;
  }

  async createAuditLog(log: Omit<AuditLog, 'id' | 'createdAt'>): Promise<AuditLog> {
    const created = { id: randomUUID(), createdAt: new Date(), ...log };
    this.store.auditLogs.push(created);
    return created;
  }

  async listAuditLogs(): Promise<AuditLog[]> {
    return [...this.store.auditLogs].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createExportJob(job: Omit<ExportJob, 'id' | 'createdAt'>): Promise<ExportJob> {
    const created = { id: randomUUID(), createdAt: new Date(), ...job };
    this.store.exportJobs.push(created);
    return created;
  }

  async listExportJobs(): Promise<ExportJob[]> {
    return [...this.store.exportJobs].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getExportJob(id: string): Promise<ExportJob | null> {
    return this.store.exportJobs.find((job) => job.id === id) ?? null;
  }

  private createStore(): Store {
    return {
      meterReadings: [],
      vehicleReadings: [],
      meterStatus: new Map(),
      vehicleStatus: new Map(),
      batches: [],
      alertRules: [],
      alertEvents: [],
      auditLogs: [],
      exportJobs: [],
    };
  }

  private createPool(): any {
    const pg = require('pg');
    return new pg.Pool(databaseConfig());
  }

  private mapMeterStatus(row: any): CurrentMeterStatus {
    return {
      meterId: row.meter_id,
      kwhConsumedAc: Number(row.kwh_consumed_ac),
      voltage: Number(row.voltage),
      lastUpdated: new Date(row.last_updated),
    };
  }

  private mapVehicleStatus(row: any): CurrentVehicleStatus {
    return {
      vehicleId: row.vehicle_id,
      soc: Number(row.soc),
      kwhDeliveredDc: Number(row.kwh_delivered_dc),
      batteryTemp: Number(row.battery_temp),
      lastUpdated: new Date(row.last_updated),
    };
  }

  private mapMeterReading(row: any): MeterReading {
    return {
      id: row.id,
      meterId: row.meter_id,
      kwhConsumedAc: Number(row.kwh_consumed_ac),
      voltage: Number(row.voltage),
      timestamp: new Date(row.timestamp),
      batchId: row.batch_id,
      createdAt: new Date(row.created_at),
    };
  }

  private mapVehicleReading(row: any): VehicleReading {
    return {
      id: row.id,
      vehicleId: row.vehicle_id,
      soc: Number(row.soc),
      kwhDeliveredDc: Number(row.kwh_delivered_dc),
      batteryTemp: Number(row.battery_temp),
      timestamp: new Date(row.timestamp),
      batchId: row.batch_id,
      createdAt: new Date(row.created_at),
    };
  }
}
