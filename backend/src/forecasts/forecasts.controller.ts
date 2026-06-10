import { Controller, Get, Param, Query } from '@nestjs/common';
import { ForecastsService } from './forecasts.service';

@Controller('v1/forecasts')
export class ForecastsController {
  constructor(private readonly forecasts: ForecastsService) {}

  @Get('meters/:meterId')
  meter(@Param('meterId') meterId: string, @Query() query: any) {
    return this.forecasts.meter(meterId, Number(query.horizonHours ?? 6));
  }

  @Get('vehicles/:vehicleId')
  vehicle(@Param('vehicleId') vehicleId: string, @Query() query: any) {
    return this.forecasts.vehicle(vehicleId, Number(query.horizonHours ?? 6), String(query.metric ?? 'kwhDeliveredDc'));
  }
}
