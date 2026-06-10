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
import { ReportsModule } from './reports/reports.module';
import { DevicesModule } from './devices/devices.module';
import { TariffsModule } from './tariffs/tariffs.module';
import { AnomaliesModule } from './anomalies/anomalies.module';
import { ForecastsModule } from './forecasts/forecasts.module';
import { ReconciliationModule } from './reconciliation/reconciliation.module';
import { SlaModule } from './sla/sla.module';
import { CapacityModule } from './capacity/capacity.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { NotificationsModule } from './notifications/notifications.module';
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
    ReportsModule,
    DevicesModule,
    TariffsModule,
    AnomaliesModule,
    ForecastsModule,
    ReconciliationModule,
    SlaModule,
    CapacityModule,
    MaintenanceModule,
    NotificationsModule,
    ExportsModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
