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

## API Reference

| Method | Path | Description | Auth |
| --- | --- | --- | --- |
| GET | `/` | Starter health response used by the Nest scaffold test. | None |
| GET | `/v1/health` | Structured service, database, and memory health. | None |
| POST | `/v1/ingest` | Accept one meter or vehicle telemetry record. | None |
| POST | `/v1/ingest/batch` | Accept a validated all-or-nothing telemetry batch. | None |
| GET | `/v1/status/meters` | Paginated current meter statuses. | None |
| GET | `/v1/status/meters/:meterId` | Current status for one meter. | None |
| GET | `/v1/status/vehicles` | Paginated current vehicle statuses. | None |
| GET | `/v1/status/vehicles/:vehicleId` | Current status for one vehicle. | None |
| GET | `/v1/history/meters/:meterId` | Paginated meter reading history. | None |
| GET | `/v1/history/meters/:meterId/summary` | All-time meter history statistics. | None |
| GET | `/v1/history/vehicles/:vehicleId` | Paginated vehicle reading history. | None |
| GET | `/v1/history/vehicles/:vehicleId/summary` | All-time vehicle history statistics. | None |
| GET | `/v1/analytics/performance/:vehicleId` | Vehicle performance for `hours` query window. | None |
| GET | `/v1/analytics/fleet` | Fleet summary for the last 24 hours. | None |
| GET | `/v1/analytics/meters` | Meter summary for the last 24 hours. | None |
| POST | `/v1/alerts/rules` | Create an alert rule. | None |
| GET | `/v1/alerts/rules` | List alert rules newest first. | None |
| PATCH | `/v1/alerts/rules/:ruleId` | Update alert rule name, threshold, or enabled state. | None |
| DELETE | `/v1/alerts/rules/:ruleId` | Delete an alert rule. | None |
| GET | `/v1/alerts/events` | List alert events with optional entity filters. | None |
| GET | `/v1/alerts/events/:eventId` | Fetch one alert event. | None |
| GET | `/v1/audit-logs` | List successful domain mutations newest first. | None |
| POST | `/v1/exports` | Create a CSV export job. | None |
| GET | `/v1/exports` | List export jobs newest first. | None |
| GET | `/v1/exports/:jobId` | Fetch one export job. | None |
| GET | `/v1/exports/:jobId/download` | Download completed export CSV. | None |
| GET | `/v1/reports/operations` | Read operational health metrics for a time window. | None |
| GET | `/v1/reports/ingestion-quality` | Summarize audit event categories. | None |

## Schema Diagram

```text
ingestion_batches
  |-- meter_readings.batch_id
  |-- vehicle_readings.batch_id

meter_readings  ---> current_meter_status
vehicle_readings ---> current_vehicle_status

alert_rules ---> alert_events

audit_logs
export_jobs
```

## Environment Variables

| Name | Default | Purpose |
| --- | --- | --- |
| `NODE_ENV` | `development` | Enables deterministic memory database in tests. |
| `PORT` | `3000` | HTTP listen port. |
| `DATABASE_HOST` | `localhost` | PostgreSQL host. |
| `DATABASE_PORT` | `5432` | PostgreSQL port. |
| `DATABASE_USER` | `postgres` | PostgreSQL user. |
| `DATABASE_PASSWORD` | `postgres` | PostgreSQL password. |
| `DATABASE_NAME` | `gridpulse` | PostgreSQL database name. |
| `DATABASE_URL` | unset | Optional full PostgreSQL connection string. |

## Test Running Guide

Run the entire backend suite:

```bash
npm test
```

Run targeted suites:

```bash
npm run test:ingest
npm run test:analytics
npm run test:status
npm run test:alerts
npm run test:audit
npm run test:exports
```

Build TypeScript:

```bash
npm run build
```
