export type TariffDayType = 'weekday' | 'weekend' | 'all';

export interface TariffWindowDto {
  id: string;
  name: string;
  dayType: TariffDayType;
  startHour: number;
  endHour: number;
  ratePerKwh: number;
  demandChargePerKw: number;
}

export interface TariffEstimateRequest {
  meterId: string;
  from: string;
  to: string;
}

export interface TariffLineItem {
  readingId: string;
  timestamp: Date;
  kwh: number;
  ratePerKwh: number;
  energyCost: number;
  tariffName: string;
}

export interface TariffEstimate {
  meterId: string;
  from: Date;
  to: Date;
  totalKwh: number;
  totalEnergyCost: number;
  averageRate: number | null;
  lineItems: TariffLineItem[];
}
