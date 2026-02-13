export interface MeterReading {
  id: string;
  meterId: string;
  kwhConsumedAc: number;
  voltage: number;
  timestamp: Date;
  batchId?: string | null;
  createdAt: Date;
}
