import { Body, Controller, Get, Post } from '@nestjs/common';
import { SlaService } from './sla.service';

@Controller('v1/sla')
export class SlaController {
  constructor(private readonly sla: SlaService) {}

  @Post('policies')
  createPolicy(@Body() body: any) {
    return this.sla.createPolicy(body);
  }

  @Get('policies')
  listPolicies() {
    return this.sla.listPolicies();
  }

  @Get('freshness')
  freshness() {
    return this.sla.freshness();
  }
}
