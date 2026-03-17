import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('v1/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('performance/:vehicleId')
  async getPerformance(@Param('vehicleId') vehicleId: string) {
    return this.analyticsService.getPerformance(vehicleId);
  }

  @Get('fleet')
  async getFleetSummary() {
    return this.analyticsService.getFleetSummary();
  }

  @Get('meters')
  async getMeterSummary() {
    return this.analyticsService.getMeterSummary();
  }
}
