import { useState } from 'react';
import { forecastsApi } from '../api/forecastsApi.js';
import DataTable from '../components/DataTable.jsx';
import AnalyticsPanel from '../components/AnalyticsPanel.jsx';
import ErrorState from '../components/ErrorState.jsx';
import TrendSparkline from '../components/TrendSparkline.jsx';
import KeyValueList from '../components/KeyValueList.jsx';

export default function Forecasts() {
  const [entityType, setEntityType] = useState('meter');
  const [entityId, setEntityId] = useState('M1');
  const [metric, setMetric] = useState('kwhDeliveredDc');
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');
  const submit = (event) => {
    event.preventDefault();
    const horizonHours = Number(event.currentTarget.horizonHours.value);
    const request = entityType === 'meter' ? forecastsApi.meter(entityId, horizonHours) : forecastsApi.vehicle(entityId, horizonHours, metric);
    request.then((result) => { setForecast(result); setError(''); }).catch((err) => setError(err.message));
  };
  return (
    <div className="page-stack">
      <form className="search-row" onSubmit={submit}>
        <select value={entityType} onChange={(event) => setEntityType(event.target.value)}><option value="meter">Meter</option><option value="vehicle">Vehicle</option></select>
        <input value={entityId} onChange={(event) => setEntityId(event.target.value)} />
        {entityType === 'vehicle' ? <select value={metric} onChange={(event) => setMetric(event.target.value)}><option value="kwhDeliveredDc">DC kWh</option><option value="soc">SOC</option></select> : null}
        <input name="horizonHours" type="number" defaultValue="6" min="1" max="24" />
        <button>Forecast</button>
      </form>
      {forecast ? <AnalyticsPanel data={{ basis: forecast.basisReadings, horizon: forecast.horizonHours, confidence: forecast.confidence, metric: forecast.metric }} /> : null}
      {forecast ? (
        <section className="panel">
          <TrendSparkline points={forecast.points} />
          <KeyValueList rows={[
            { label: 'Entity', value: forecast.entityId },
            { label: 'Type', value: forecast.entityType },
            { label: 'Metric', value: forecast.metric },
            { label: 'Confidence', value: forecast.confidence },
          ]} />
        </section>
      ) : null}
      {error ? <ErrorState message={error} /> : null}
      <DataTable columns={[
        { key: 'timestamp', label: 'Time', render: (row) => new Date(row.timestamp).toLocaleString() },
        { key: 'expectedValue', label: 'Expected' },
        { key: 'lowerBound', label: 'Lower' },
        { key: 'upperBound', label: 'Upper' },
      ]} rows={forecast?.points ?? []} emptyMessage="No forecast generated." />
    </div>
  );
}
