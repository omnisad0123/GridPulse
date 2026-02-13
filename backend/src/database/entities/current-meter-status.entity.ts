export interface CurrentMeterStatus {
  meterId: string;
  kwhConsumedAc: number;
  voltage: number;
  lastUpdated: Date;
}
