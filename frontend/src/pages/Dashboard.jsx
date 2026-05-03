import { useEffect, useState } from 'react';
import { analyticsApi } from '../api/analyticsApi.js';
import { alertsApi } from '../api/alertsApi.js';
import { auditApi } from '../api/auditApi.js';
import MetricCard from '../components/MetricCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import DataTable from '../components/DataTable.jsx';

export default function Dashboard() {
  const [data, setData] = useState({ fleet: null, meters: null, events: [], logs: [], refreshedAt: null });
  const load = () => {
    Promise.all([analyticsApi.fleet(), analyticsApi.meters(), alertsApi.listEvents(), auditApi.list()])
      .then(([fleet, meters, events, logs]) => setData({ fleet, meters, events, logs, refreshedAt: new Date() }))
      .catch(() => setData({ fleet: null, meters: null, events: [] }));
  };
  useEffect(() => {
    load();
    const timer = setInterval(load, 30_000);
    return () => clearInterval(timer);
  }, []);
  const efficiency = data.meters?.totalAcConsumption > 0 ? Math.round((data.fleet?.totalDcDelivered / data.meters.totalAcConsumption) * 100) : null;

  return (
    <div className="page-stack">
      <div className="metric-grid">
        <MetricCard label="Vehicles" value={data.fleet?.totalVehicles ?? 0} />
        <MetricCard label="Average SOC" value={data.fleet?.averageSoc ?? 'n/a'} />
        <MetricCard label="Meters" value={data.meters?.totalMeters ?? 0} />
        <MetricCard label="AC total" value={data.meters?.totalAcConsumption ?? 0} />
        <MetricCard label="Fleet efficiency" value={efficiency == null ? 'n/a' : `${efficiency}%`} />
      </div>
      <p className="muted">Last refreshed {data.refreshedAt ? data.refreshedAt.toLocaleTimeString() : 'not yet'}</p>
      <section className="panel">
        <h2>Recent alert events</h2>
        {data.events.length ? data.events.slice(0, 5).map((event) => <p key={event.id}>{event.message}</p>) : <EmptyState />}
      </section>
      <section className="panel">
        <h2>Recent ingestion activity</h2>
        <DataTable
          columns={[
            { key: 'action', label: 'Action' },
            { key: 'targetType', label: 'Target' },
            { key: 'targetId', label: 'ID' },
            { key: 'createdAt', label: 'Time', render: (row) => new Date(row.createdAt).toLocaleString() },
          ]}
          rows={data.logs.filter((log) => log.action?.startsWith('ingest')).slice(0, 10)}
          emptyMessage="No ingestion audit activity yet."
        />
      </section>
    </div>
  );
}
