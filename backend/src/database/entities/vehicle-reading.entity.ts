export interface VehicleReading {
  id: string;
  vehicleId: string;
  soc: number;
  kwhDeliveredDc: number;
  batteryTemp: number;
  timestamp: Date;
  batchId?: string | null;
  createdAt: Date;
}
