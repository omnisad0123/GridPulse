import { useEffect, useState } from 'react';
import { tariffsApi } from '../api/tariffsApi.js';
import DataTable from '../components/DataTable.jsx';
import AnalyticsPanel from '../components/AnalyticsPanel.jsx';
import ErrorState from '../components/ErrorState.jsx';

export default function Tariffs() {
  const [windows, setWindows] = useState([]);
  const [estimate, setEstimate] = useState(null);
  const [error, setError] = useState('');
  const [meterId, setMeterId] = useState('M1');
  const load = () => tariffsApi.listWindows().then(setWindows).catch((err) => setError(err.message));

  useEffect(() => { load(); }, []);

  const submit = (event) => {
    event.preventDefault();
    tariffsApi.estimate({ meterId, from: event.currentTarget.from.value, to: event.currentTarget.to.value })
      .then((result) => { setEstimate(result); setError(''); })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="page-stack">
      <DataTable columns={[
        { key: 'name', label: 'Name' },
        { key: 'dayType', label: 'Day type' },
        { key: 'startHour', label: 'Start' },
        { key: 'endHour', label: 'End' },
        { key: 'ratePerKwh', label: 'Rate' },
      ]} rows={windows} />
      <section className="panel">
        <h2>Estimate energy cost</h2>
        <form className="form-grid" onSubmit={submit}>
          <input value={meterId} onChange={(event) => setMeterId(event.target.value)} placeholder="Meter ID" />
          <input name="from" defaultValue="2026-02-09T00:00:00Z" />
          <input name="to" defaultValue={new Date().toISOString()} />
          <button>Estimate</button>
        </form>
      </section>
      {estimate ? <AnalyticsPanel data={{ totalKwh: estimate.totalKwh, totalCost: estimate.totalEnergyCost, averageRate: estimate.averageRate, rows: estimate.lineItems.length }} /> : null}
      {error ? <ErrorState message={error} /> : null}
    </div>
  );
}
