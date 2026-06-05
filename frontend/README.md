# GridPulse Frontend

React and Vite dashboard for GridPulse operations.

Set `VITE_API_URL` when the API is not available at `http://localhost:3000/v1`.

```bash
npm install
npm run dev
```

The frontend is intentionally independent from backend validation so Silver tasks can target backend behavior without building UI assets.

## Page Guide

| URL | Page | API Dependencies |
| --- | --- | --- |
| `/` | Dashboard | Fleet analytics, meter analytics, alert events, audit logs |
| `/ingest` | Ingest telemetry | Single ingest and batch ingest |
| `/meters` | Meter status | Current meter status lookup |
| `/vehicles` | Vehicle status | Current vehicle status lookup |
| `/meter-history` | Meter history | Meter history and meter summary |
| `/vehicle-history` | Vehicle history | Vehicle history and vehicle summary |
| `/vehicle-analytics` | Vehicle analytics | Vehicle performance with configurable hours |
| `/fleet` | Fleet analytics | Fleet summary |
| `/alerts` | Alerts | Alert rules and alert events |
| `/exports` | Export jobs | Export job create/list/download |
| `/audit` | Audit logs | Audit log listing |

## Component Map

- `Layout`, `Navbar`, and `Sidebar` define the application shell.
- `MetricCard` and `AnalyticsPanel` display summary metrics.
- `DataTable` renders tabular operational data with an empty state.
- `PaginationControls` provides simple previous/next navigation.
- `Badge` shows status, severity, and health markers.
- `Modal` is used for detail flows that should not navigate away.
- `MeterForm`, `VehicleForm`, and `TelemetryForm` support manual ingestion.

## API Layer

Each domain has a small API wrapper:

- `ingestApi`
- `analyticsApi`
- `statusApi`
- `historyApi`
- `alertsApi`
- `exportsApi`
- `auditApi`

Keep page components focused on state and rendering. Add new HTTP calls to the domain API files first, then consume them from pages.
