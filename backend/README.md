# GridPulse Backend

NestJS API for smart meter and EV telemetry ingestion.

## Scripts

```bash
npm test
npm run test:ingest
npm run test:analytics
npm run test:status
npm run test:alerts
npm run test:audit
npm run test:exports
npm run build
```

## Data Model

Cold history is append-only:

- `meter_readings`
- `vehicle_readings`

Hot operational status is updated by timestamp-aware UPSERT behavior:

- `current_meter_status`
- `current_vehicle_status`

Operational workflow tables:

- `ingestion_batches`
- `alert_rules`
- `alert_events`
- `audit_logs`
- `export_jobs`

## Test Strategy

Jest runs with `NODE_ENV=test`, which uses the in-memory database service. This avoids sleeps, external network, and a live PostgreSQL dependency during Silver validation. The SQL schema and production database configuration remain in the repo for Docker Compose and runtime use.

## Silver Notes

The strongest backend task candidates are ordering-sensitive ingest behavior, all-or-nothing batch validation, disabled alert rules, audit suppression for failed requests, and export download boundaries.
