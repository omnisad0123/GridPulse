export interface CapacityPlan {
  generatedAt: string;
  hours: number;
  siteLimitKw: number;
  observedPeakKw: number;
  utilizationPercent: number;
  headroomKw: number;
  risk: 'low' | 'medium' | 'high';
  recommendations: string[];
}
