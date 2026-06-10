export interface ReconciliationWindow {
  from: Date;
  to: Date;
  totalAc: number;
  totalDc: number;
  lossKwh: number;
  lossPercent: number | null;
  status: 'balanced' | 'watch' | 'loss_high' | 'missing_data';
}

export interface ReconciliationResponse {
  generatedAt: string;
  hours: number;
  windowCount: number;
  totalAc: number;
  totalDc: number;
  totalLossKwh: number;
  averageLossPercent: number | null;
  windows: ReconciliationWindow[];
  notes: string[];
}
