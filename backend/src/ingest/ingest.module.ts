import { Module } from '@nestjs/common';
import { IngestController } from './ingest.controller';
import { IngestService } from './ingest.service';
import { AuditModule } from '../audit/audit.module';
import { AlertsModule } from '../alerts/alerts.module';

@Module({
  imports: [AuditModule, AlertsModule],
  controllers: [IngestController],
  providers: [IngestService],
  exports: [IngestService],
})
export class IngestModule {}
