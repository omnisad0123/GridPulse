export interface IngestVehicleDto {
  vehicleId: string;
  soc: number;
  kwhDeliveredDc: number;
  batteryTemp: number;
  timestamp: string;
}
