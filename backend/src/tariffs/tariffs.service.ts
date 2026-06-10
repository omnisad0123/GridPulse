import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { InvalidPayloadException } from '../common/exceptions/gridpulse.exception';
import { parseTimestamp } from '../common/utils/date-window.util';
import { round, safeDivide, toNumber } from '../common/utils/numeric.util';
import { TariffDayType, TariffEstimate, TariffEstimateRequest, TariffWindowDto } from './dto/tariff.dto';

const DAY_TYPES: TariffDayType[] = ['weekday', 'weekend', 'all'];

@Injectable()
export class TariffsService {
  private readonly windows = new Map<string, TariffWindowDto>();

  constructor(private readonly database: DatabaseService) {
    this.seedDefaults();
  }

  createWindow(body: TariffWindowDto): TariffWindowDto {
    const dayType = body?.dayType as TariffDayType;
    const startHour = toNumber(body?.startHour);
    const endHour = toNumber(body?.endHour);
    const ratePerKwh = toNumber(body?.ratePerKwh);
    const demandChargePerKw = toNumber(body?.demandChargePerKw ?? 0);
    if (!body?.id || !body?.name || !DAY_TYPES.includes(dayType)) {
      throw new InvalidPayloadException('Tariff window requires id, name, and supported dayType');
    }
    if (!Number.isInteger(startHour) || !Number.isInteger(endHour) || startHour < 0 || endHour > 24 || startHour >= endHour) {
      throw new InvalidPayloadException('Tariff hours must be integers where 0 <= startHour < endHour <= 24');
    }
    if (!Number.isFinite(ratePerKwh) || ratePerKwh < 0 || !Number.isFinite(demandChargePerKw) || demandChargePerKw < 0) {
      throw new InvalidPayloadException('Tariff rates must be non-negative numbers');
    }
    const window = {
      id: String(body.id),
      name: String(body.name),
      dayType,
      startHour,
      endHour,
      ratePerKwh,
      demandChargePerKw,
    };
    this.windows.set(window.id, window);
    return window;
  }

  listWindows(): TariffWindowDto[] {
    return [...this.windows.values()].sort((a, b) => a.startHour - b.startHour || a.name.localeCompare(b.name));
  }

  async estimate(body: TariffEstimateRequest): Promise<TariffEstimate> {
    const from = parseTimestamp(body?.from);
    const to = parseTimestamp(body?.to);
    if (!body?.meterId || !from || !to || from.getTime() > to.getTime()) {
      throw new InvalidPayloadException('Tariff estimate requires meterId and a valid from/to range');
    }
    const readings = (await this.database.findMeterReadings(from, to)).filter((reading) => reading.meterId === body.meterId);
    const lineItems = readings.map((reading) => {
      const window = this.windowFor(reading.timestamp);
      const energyCost = round(reading.kwhConsumedAc * window.ratePerKwh, 4);
      return {
        readingId: reading.id,
        timestamp: reading.timestamp,
        kwh: reading.kwhConsumedAc,
        ratePerKwh: window.ratePerKwh,
        energyCost,
        tariffName: window.name,
      };
    });
    const totalKwh = round(lineItems.reduce((sum, item) => sum + item.kwh, 0), 4);
    const totalEnergyCost = round(lineItems.reduce((sum, item) => sum + item.energyCost, 0), 4);
    const averageRate = safeDivide(totalEnergyCost, totalKwh);
    return {
      meterId: body.meterId,
      from,
      to,
      totalKwh,
      totalEnergyCost,
      averageRate: averageRate == null ? null : round(averageRate, 4),
      lineItems,
    };
  }

  private seedDefaults() {
    if (this.windows.size) return;
    [
      { id: 'off-peak', name: 'Off peak', dayType: 'all' as const, startHour: 0, endHour: 7, ratePerKwh: 0.08, demandChargePerKw: 0 },
      { id: 'standard', name: 'Standard', dayType: 'all' as const, startHour: 7, endHour: 17, ratePerKwh: 0.14, demandChargePerKw: 0 },
      { id: 'peak', name: 'Peak', dayType: 'weekday' as const, startHour: 17, endHour: 22, ratePerKwh: 0.22, demandChargePerKw: 0 },
      { id: 'night', name: 'Night', dayType: 'all' as const, startHour: 22, endHour: 24, ratePerKwh: 0.1, demandChargePerKw: 0 },
    ].forEach((window) => this.windows.set(window.id, window));
  }

  private windowFor(timestamp: Date): TariffWindowDto {
    const hour = timestamp.getUTCHours();
    const day = timestamp.getUTCDay();
    const dayType: TariffDayType = day === 0 || day === 6 ? 'weekend' : 'weekday';
    const matching = this.listWindows().find((window) => {
      const dayMatches = window.dayType === 'all' || window.dayType === dayType;
      return dayMatches && hour >= window.startHour && hour < window.endHour;
    });
    return matching ?? this.listWindows()[0];
  }
}
