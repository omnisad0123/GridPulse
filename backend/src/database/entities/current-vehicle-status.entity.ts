export interface CurrentVehicleStatus {
  vehicleId: string;
  soc: number;
  kwhDeliveredDc: number;
  batteryTemp: number;
  lastUpdated: Date;
}
