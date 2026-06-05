# GridPulse Architecture

GridPulse is designed around high-volume append-only telemetry ingestion with operational read models that stay cheap to query. The backend is the primary Silver task surface, while the frontend gives reviewers and developers an end-to-end dashboard for exercising APIs.

## System Shape

```text
Smart meters       EV chargers / vehicles
     |                       |
     v                       v
POST /v1/ingest       POST /v1/ingest
     |                       |
     +----------+------------+
                |
                v
       IngestValidationService
                |
                v
          RateLimitService
                |
                v
        append history rows
                |
                v
       timestamp-aware status upsert
                |
                +--> alert evaluation
                +--> audit logging
```

## Hot And Cold Tables

GridPulse separates cold historical data from hot operational state.

Cold tables are append-only:

- `meter_readings`
- `vehicle_readings`

Hot tables are query-optimized current state:

- `current_meter_status`
- `current_vehicle_status`

The hot tables are updated only when an incoming reading is at least as recent as the current row. Older telemetry is still preserved in history, but it cannot rewind current status. This is one of the most important invariants in the project.

## Ingest Flow

1. The controller accepts a raw JSON payload.
2. `IngestValidationService` decides whether it is a meter reading or vehicle reading.
3. Validation rejects mixed payloads, missing timestamps, negative energy, invalid SOC, and malformed bodies.
4. `RateLimitService` checks a per-entity one-minute bucket.
5. The database service inserts an immutable history row.
6. The database service updates current status if timestamp ordering allows it.
7. `AlertsService` evaluates enabled alert rules.
8. `AuditService` records only successful mutations.

## Alert Evaluation

```text
New reading
   |
   v
Load enabled alert rules
   |
   +-- HIGH_BATTERY_TEMP -> vehicle batteryTemp >= threshold
   +-- LOW_SOC           -> vehicle soc <= threshold
   +-- VOLTAGE_ANOMALY   -> meter voltage >= threshold
   |
   v
Create alert_events rows for crossed thresholds
```

Disabled rules are intentionally ignored during ingestion. This makes the disabled-rule behavior a strong future Silver task candidate because the correct result depends on runtime state, not source-code shape.

## Analytics Flow

Analytics endpoints always read history tables, not current status tables. Current status reflects only the newest reading per entity; analytics needs every reading in the selected time window.

Vehicle performance accepts `hours`, clamped to `1..168`. It returns:

- total AC from meter readings in the window
- total DC from vehicle readings for the requested vehicle
- efficiency as `totalDc / totalAc`, or `null` when AC is zero
- average battery temperature for the vehicle window

Fleet and meter summaries use the default 24-hour window.

## History Flow

History endpoints provide paginated access to append-only rows:

- `GET /v1/history/meters/:meterId`
- `GET /v1/history/vehicles/:vehicleId`
- `GET /v1/history/meters/:meterId/summary`
- `GET /v1/history/vehicles/:vehicleId/summary`

The list endpoints sort by timestamp descending and include `total`, `page`, `limit`, `totalPages`, and `data`.

## Reporting Flow

Reports are read-only projections over existing domain data. They do not mutate ingestion state and should remain safe to call from dashboards, scripts, or operational checks.

Operations reports combine:

- meter readings
- vehicle readings
- current meter status
- current vehicle status
- alert events

Ingestion quality reports summarize audit log categories.

## Export Job Lifecycle

```text
POST /v1/exports
    |
    v
Validate export type and optional date range
    |
    v
Render CSV from requested source
    |
    v
Create export_jobs row
    |
    v
GET /v1/exports/:id/download
```

The current implementation completes exports synchronously. The API shape still includes statuses so a future task can make export processing asynchronous without changing clients.

## Test Strategy

Jest runs with `NODE_ENV=test`, so the database service uses deterministic in-memory collections. This avoids external services during Silver validation while preserving production SQL paths in the same service.

Test categories:

- e2e tests for public API behavior
- utility unit tests for reusable date, numeric, and pagination helpers
- Docker image validation through the root Dockerfile

## Silver-Friendly Invariants

- Mixed meter and vehicle payloads are rejected.
- History rows are append-only.
- Older readings do not overwrite current status.
- Batch ingest validates before mutation.
- Analytics reads history, not hot status.
- Efficiency is `null` when AC is zero.
- Disabled alert rules do not create alert events.
- Failed requests do not create audit logs.
- Downloads are constrained by export job status.
- Rate limits are per entity, not global.
