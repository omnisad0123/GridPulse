export interface ForecastPoint {
  timestamp: string;
  expectedValue: number;
  lowerBound: number;
  upperBound: number;
}

export interface ForecastResponse {
  entityId: string;
  entityType: 'meter' | 'vehicle';
  metric: 'kwhConsumedAc' | 'kwhDeliveredDc' | 'soc';
  basisReadings: number;
  horizonHours: number;
  confidence: 'low' | 'medium' | 'high';
  points: ForecastPoint[];
}
