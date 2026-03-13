export interface PerformanceResponseDto {
  vehicleId: string;
  totalAc: number;
  totalDc: number;
  efficiency: number | null;
  avgBatteryTemp: number | null;
}
