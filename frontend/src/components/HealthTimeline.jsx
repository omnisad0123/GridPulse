import Badge from './Badge.jsx';
import { formatDateTime, riskTone } from '../utils/formatters.js';

export default function HealthTimeline({ rows = [] }) {
  if (!rows.length) {
    return null;
  }
  return (
    <section className="panel">
      <h2>Health timeline</h2>
      <ol className="timeline">
        {rows.slice(0, 8).map((row) => (
          <li key={`${row.deviceId ?? row.entityId}-${row.health ?? row.severity}`}>
            <div>
              <strong>{row.deviceId ?? row.entityId}</strong>
              <span>{formatDateTime(row.lastTelemetryAt ?? row.lastUpdated)}</span>
            </div>
            <Badge tone={riskTone(row.health ?? row.severity ?? row.state)}>{row.health ?? row.severity ?? row.state}</Badge>
          </li>
        ))}
      </ol>
    </section>
  );
}
