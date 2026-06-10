import { Controller, Get, Query } from '@nestjs/common';
import { ReconciliationService } from './reconciliation.service';

@Controller('v1/reconciliation')
export class ReconciliationController {
  constructor(private readonly reconciliation: ReconciliationService) {}

  @Get('energy')
  energy(@Query() query: any) {
    return this.reconciliation.energy(Number(query.hours ?? 24), Number(query.bucketHours ?? 1));
  }
}
