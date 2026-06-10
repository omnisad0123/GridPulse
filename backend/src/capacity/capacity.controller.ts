import { Controller, Get, Query } from '@nestjs/common';
import { CapacityService } from './capacity.service';

@Controller('v1/capacity')
export class CapacityController {
  constructor(private readonly capacity: CapacityService) {}

  @Get('plan')
  plan(@Query() query: any) {
    return this.capacity.plan(Number(query.hours ?? 24), Number(query.siteLimitKw ?? 500));
  }
}
