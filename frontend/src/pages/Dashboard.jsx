import { useEffect, useState } from 'react';
import { analyticsApi } from '../api/analyticsApi.js';
import { alertsApi } from '../api/alertsApi.js';
import MetricCard from '../components/MetricCard.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function Dashboard() {
  const [data, setData] = useState({ fleet: null, meters: null, events: [] });
  useEffect(() => {
    Promise.all([analyticsApi.fleet(), analyticsApi.meters(), alertsApi.listEvents()])
      .then(([fleet, meters, events]) => setData({ fleet, meters, events }))
      .catch(() => setData({ fleet: null, meters: null, events: [] }));
  }, []);

  return (
    <div className="page-stack">
      <div className="metric-grid">
        <MetricCard label="Vehicles" value={data.fleet?.totalVehicles ?? 0} />
        <MetricCard label="Average SOC" value={data.fleet?.averageSoc ?? 'n/a'} />
        <MetricCard label="Meters" value={data.meters?.totalMeters ?? 0} />
        <MetricCard label="AC total" value={data.meters?.totalAcConsumption ?? 0} />
      </div>
      <section className="panel">
        <h2>Recent alert events</h2>
        {data.events.length ? data.events.slice(0, 5).map((event) => <p key={event.id}>{event.message}</p>) : <EmptyState />}
      </section>
    </div>
  );
}
