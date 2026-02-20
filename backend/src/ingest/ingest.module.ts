import { Module } from '@nestjs/common';
import { IngestController } from './ingest.controller';
import { IngestService } from './ingest.service';
import { AuditModule } from '../audit/audit.module';
import { AlertsModule } from '../alerts/alerts.module';
import { IngestValidationService } from './ingest-validation.service';
import { RateLimitService } from './rate-limit.service';

@Module({
  imports: [AuditModule, AlertsModule],
  controllers: [IngestController],
  providers: [IngestService, IngestValidationService, RateLimitService],
  exports: [IngestService],
})
export class IngestModule {}
