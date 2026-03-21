import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ExportJobType } from '../database/entities/export-job.entity';
import { parseTimestamp } from '../common/utils/date-window.util';
import { AuditService } from '../audit/audit.service';

const EXPORT_TYPES: ExportJobType[] = ['meter_readings', 'vehicle_readings', 'analytics_summary'];

@Injectable()
export class ExportsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly audit: AuditService,
  ) {}

  async create(body: any) {
    const type = body?.type as ExportJobType;
    if (!EXPORT_TYPES.includes(type)) {
      throw new BadRequestException('Unsupported export type');
    }
    const dateFrom = body.dateFrom ? parseTimestamp(body.dateFrom) : new Date(0);
    const dateTo = body.dateTo ? parseTimestamp(body.dateTo) : new Date();
    if (!dateFrom || !dateTo || dateFrom.getTime() > dateTo.getTime()) {
      throw new BadRequestException('Invalid export date range');
    }
    const content = await this.renderCsv(type, dateFrom, dateTo);
    const job = await this.database.createExportJob({
      type,
      status: 'completed',
      dateFrom,
      dateTo,
      rowCount: Math.max(content.split('\n').length - 2, 0),
      content,
      completedAt: new Date(),
    });
    await this.audit.record('export.create', 'export_job', job.id, { type, rowCount: job.rowCount });
    return job;
  }

  list() {
    return this.database.listExportJobs();
  }

  async get(jobId: string) {
    const job = await this.database.getExportJob(jobId);
    if (!job) throw new NotFoundException('Export job not found');
    return job;
  }

  async download(jobId: string) {
    const job = await this.get(jobId);
    if (job.status !== 'completed') {
      throw new BadRequestException('Only completed export jobs can be downloaded');
    }
    return job.content ?? '';
  }

  private async renderCsv(type: ExportJobType, from: Date, to: Date) {
    if (type === 'meter_readings') {
      const rows = await this.database.findMeterReadings(from, to);
      return ['meterId,kwhConsumedAc,voltage,timestamp', ...rows.map((row) => `${row.meterId},${row.kwhConsumedAc},${row.voltage},${row.timestamp.toISOString()}`)].join('\n');
    }
    if (type === 'vehicle_readings') {
      const rows = await this.database.findVehicleReadings(from, to);
      return ['vehicleId,soc,kwhDeliveredDc,batteryTemp,timestamp', ...rows.map((row) => `${row.vehicleId},${row.soc},${row.kwhDeliveredDc},${row.batteryTemp},${row.timestamp.toISOString()}`)].join('\n');
    }
    const meters = await this.database.findMeterReadings(from, to);
    const vehicles = await this.database.findVehicleReadings(from, to);
    return ['metric,value', `meterRows,${meters.length}`, `vehicleRows,${vehicles.length}`].join('\n');
  }
}
