import { Module } from '@nestjs/common';
import { IngestModule } from './ingest/ingest.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DatabaseModule } from './database/database.module';
import { StatusModule } from './status/status.module';
import { AlertsModule } from './alerts/alerts.module';
import { AuditModule } from './audit/audit.module';
import { ExportsModule } from './exports/exports.module';
import { HealthModule } from './health/health.module';
import { HistoryModule } from './history/history.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    AuditModule,
    AlertsModule,
    IngestModule,
    AnalyticsModule,
    StatusModule,
    HistoryModule,
    ExportsModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
