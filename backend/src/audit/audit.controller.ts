import { Controller, Get } from '@nestjs/common';
import { AuditService } from './audit.service';

@Controller('v1/audit-logs')
export class AuditController {
  constructor(private readonly audit: AuditService) {}

  @Get()
  list() {
    return this.audit.list();
  }
}
