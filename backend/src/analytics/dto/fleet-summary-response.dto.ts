export interface FleetSummaryResponseDto {
  totalVehicles: number;
  averageSoc: number | null;
  averageBatteryTemp: number | null;
  totalDcDelivered: number;
}
