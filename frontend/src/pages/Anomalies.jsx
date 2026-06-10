import { useEffect, useState } from 'react';
import { anomaliesApi } from '../api/anomaliesApi.js';
import DataTable from '../components/DataTable.jsx';
import Badge from '../components/Badge.jsx';
import AnalyticsPanel from '../components/AnalyticsPanel.jsx';

export default function Anomalies() {
  const [hours, setHours] = useState(24);
  const [scan, setScan] = useState(null);
  const load = () => anomaliesApi.scan(hours).then(setScan).catch(() => setScan(null));

  useEffect(() => { load(); }, [hours]);

  return (
    <div className="page-stack">
      <form className="search-row" onSubmit={(event) => { event.preventDefault(); load(); }}>
        <select value={hours} onChange={(event) => setHours(Number(event.target.value))}><option value={24}>24h</option><option value={48}>48h</option><option value={168}>7d</option></select>
        <button>Scan</button>
      </form>
      {scan ? <AnalyticsPanel data={{ total: scan.total, high: scan.high, medium: scan.medium, low: scan.low }} /> : null}
      <DataTable columns={[
        { key: 'severity', label: 'Severity', render: (row) => <Badge tone={row.severity === 'high' ? 'danger' : row.severity === 'medium' ? 'warning' : 'neutral'}>{row.severity}</Badge> },
        { key: 'kind', label: 'Kind' },
        { key: 'entityId', label: 'Entity' },
        { key: 'measuredValue', label: 'Measured' },
        { key: 'expectedRange', label: 'Expected' },
      ]} rows={scan?.data ?? []} emptyMessage="No anomalies detected." />
    </div>
  );
}
