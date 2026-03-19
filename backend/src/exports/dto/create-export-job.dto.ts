import { ExportJobType } from '../../database/entities/export-job.entity';

export interface CreateExportJobDto {
  type: ExportJobType;
  dateFrom?: string;
  dateTo?: string;
}
