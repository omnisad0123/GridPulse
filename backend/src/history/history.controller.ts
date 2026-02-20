import { Controller, Get, Param, Query } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('v1/history')
export class HistoryController {
  constructor(private readonly history: HistoryService) {}

  @Get('meters/:meterId')
  listMeterHistory(@Param('meterId') meterId: string, @Query() query: any) {
    return this.history.listMeterHistory(meterId, query);
  }

  @Get('meters/:meterId/summary')
  summarizeMeter(@Param('meterId') meterId: string) {
    return this.history.summarizeMeter(meterId);
  }

  @Get('vehicles/:vehicleId')
  listVehicleHistory(@Param('vehicleId') vehicleId: string, @Query() query: any) {
    return this.history.listVehicleHistory(vehicleId, query);
  }

  @Get('vehicles/:vehicleId/summary')
  summarizeVehicle(@Param('vehicleId') vehicleId: string) {
    return this.history.summarizeVehicle(vehicleId);
  }
}
