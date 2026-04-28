# GridPulse

GridPulse is a full-stack telemetry ingestion project for smart meters and EV fleets. It is structured to support SWE-bench-style backend tasks with deterministic tests, Docker validation, and clear domain behavior.

## Layout

```text
backend/   NestJS API, deterministic Jest tests, PostgreSQL schema
frontend/  React + Vite dashboard, not required for backend validation
```

## Backend API

- `POST /v1/ingest` accepts exactly one meter or vehicle reading.
- `POST /v1/ingest/batch` validates the whole batch before mutation.
- `GET /v1/status/meters/:meterId` reads current meter status.
- `GET /v1/status/vehicles/:vehicleId` reads current vehicle status.
- `GET /v1/analytics/performance/:vehicleId` returns 24-hour vehicle performance.
- `GET /v1/analytics/fleet` returns 24-hour fleet summary.
- `GET /v1/analytics/meters` returns 24-hour meter summary.
- `POST /v1/alerts/rules`, `GET /v1/alerts/rules`, `PATCH /v1/alerts/rules/:ruleId`, and `DELETE /v1/alerts/rules/:ruleId` manage alert rules.
- `GET /v1/alerts/events` and `GET /v1/alerts/events/:eventId` expose alert events.
- `GET /v1/audit-logs` lists successful domain mutations.
- `POST /v1/exports`, `GET /v1/exports`, `GET /v1/exports/:jobId`, and `GET /v1/exports/:jobId/download` manage export jobs.

## Validation

```bash
npm test
npm run test:ingest
npm run test:status
npm run test:analytics
npm run test:alerts
npm run test:audit
npm run test:exports
npm run build:backend
```

The backend test environment uses an in-memory store behind the same service contract as the PostgreSQL path, making Jest deterministic and container-friendly.

## Docker

```bash
docker build -t gridpulse-backend .
docker compose up --build
```

The root Dockerfile installs and validates only the backend. Frontend installation and build are intentionally separate from backend/Silver validation.

## Future Silver Task Candidates

1. Older readings should not overwrite current status.
2. History must remain append-only during UPSERT.
3. Mixed meter and vehicle payload should be rejected.
4. Batch ingest should not partially mutate DB on validation failure.
5. Analytics must exclude readings older than 24 hours.
6. Efficiency should be null when AC total is zero.
7. Current status endpoints must use hot tables, not history scans.
8. Vehicle SOC must stay within 0-100.
9. Analytics should not use current status for 24-hour totals.
10. Equal timestamp ingestion should be deterministic.
11. Disabled alert rules should not create alert events.
12. Failed ingestion should not create audit logs.
13. Pending or failed export jobs cannot be downloaded.
14. Export rows must match requested date range.
15. Negative energy readings should be rejected without DB mutation.
