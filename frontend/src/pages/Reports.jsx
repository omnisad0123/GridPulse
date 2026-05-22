import { useEffect, useState } from 'react';
import { reportsApi } from '../api/reportsApi.js';
import DataTable from '../components/DataTable.jsx';
import AnalyticsPanel from '../components/AnalyticsPanel.jsx';
import Badge from '../components/Badge.jsx';
import ErrorState from '../components/ErrorState.jsx';

export default function Reports() {
  const [hours, setHours] = useState(24);
  const [operations, setOperations] = useState(null);
  const [quality, setQuality] = useState(null);
  const [error, setError] = useState('');

  const load = () => {
    Promise.all([reportsApi.operations(hours), reportsApi.ingestionQuality()])
      .then(([nextOperations, nextQuality]) => {
        setOperations(nextOperations);
        setQuality(nextQuality);
        setError('');
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    load();
  }, [hours]);

  const metricMap = Object.fromEntries((operations?.metrics ?? []).map((metric) => [metric.label, metric.value]));

  return (
    <div className="page-stack">
      <form className="search-row" onSubmit={(event) => { event.preventDefault(); load(); }}>
        <select value={hours} onChange={(event) => setHours(Number(event.target.value))}>
          <option value={24}>24 hours</option>
          <option value={48}>48 hours</option>
          <option value={72}>72 hours</option>
          <option value={168}>7 days</option>
        </select>
        <button>Refresh reports</button>
      </form>
      {error ? <ErrorState message={error} /> : null}
      {operations ? (
        <AnalyticsPanel
          data={{
            meterReadings: metricMap.meterReadings,
            vehicleReadings: metricMap.vehicleReadings,
            totalAc: metricMap.totalAc,
            totalDc: metricMap.totalDc,
            efficiency: metricMap.efficiency,
            alerts: metricMap.alertEvents,
          }}
        />
      ) : null}
      <section className="panel">
        <h2>Recommendations</h2>
        {(operations?.recommendations ?? []).map((item) => <p key={item}>{item}</p>)}
      </section>
      <section className="panel">
        <h2>Stale entities</h2>
        <DataTable
          columns={[
            { key: 'entityType', label: 'Type', render: (row) => <Badge tone={row.entityType === 'meter' ? 'neutral' : 'success'}>{row.entityType}</Badge> },
            { key: 'entityId', label: 'Entity ID' },
            { key: 'ageMinutes', label: 'Age minutes' },
            { key: 'state', label: 'State', render: (row) => <Badge tone={row.state === 'critical' ? 'danger' : 'warning'}>{row.state}</Badge> },
          ]}
          rows={operations?.staleEntities ?? []}
          emptyMessage="No stale entities detected."
        />
      </section>
      {quality ? (
        <AnalyticsPanel
          data={{
            auditEvents: quality.totalAuditEvents,
            ingests: quality.ingestEvents,
            batches: quality.batchEvents,
            alertMutations: quality.alertMutationEvents,
            exports: quality.exportEvents,
          }}
        />
      ) : null}
    </div>
  );
}
