import { Controller, Get, Query } from '@nestjs/common';
import { AnomaliesService } from './anomalies.service';

@Controller('v1/anomalies')
export class AnomaliesController {
  constructor(private readonly anomalies: AnomaliesService) {}

  @Get()
  scan(@Query() query: any) {
    return this.anomalies.scan(Number(query.hours ?? 24));
  }
}
