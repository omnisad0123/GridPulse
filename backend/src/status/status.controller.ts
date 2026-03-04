import { Controller, Get, Param } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('v1/status')
export class StatusController {
  constructor(private readonly status: StatusService) {}

  @Get('meters/:meterId')
  getMeter(@Param('meterId') meterId: string) {
    return this.status.getMeter(meterId);
  }

  @Get('vehicles/:vehicleId')
  getVehicle(@Param('vehicleId') vehicleId: string) {
    return this.status.getVehicle(vehicleId);
  }
}
