export type ExportJobType = 'meter_readings' | 'vehicle_readings' | 'analytics_summary';
export type ExportJobStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface ExportJob {
  id: string;
  type: ExportJobType;
  status: ExportJobStatus;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  rowCount: number;
  content?: string;
  createdAt: Date;
  completedAt?: Date | null;
}
