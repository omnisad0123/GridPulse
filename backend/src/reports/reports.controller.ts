import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('v1/reports')
export class ReportsController {
  constructor(private readonly reports: ReportsService) {}

  @Get('operations')
  operations(@Query() query: any) {
    return this.reports.operations(Number(query.hours ?? 24));
  }

  @Get('ingestion-quality')
  ingestionQuality() {
    return this.reports.ingestionQuality();
  }
}
