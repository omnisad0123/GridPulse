import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';

@Controller('v1/maintenance')
export class MaintenanceController {
  constructor(private readonly maintenance: MaintenanceService) {}

  @Post('work-orders')
  create(@Body() body: any) {
    return this.maintenance.create(body);
  }

  @Get('work-orders')
  list(@Query() query: any) {
    return this.maintenance.list(query);
  }

  @Patch('work-orders/:id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.maintenance.update(id, body);
  }
}
