import { useState } from 'react';
import { analyticsApi } from '../api/analyticsApi.js';
import AnalyticsPanel from '../components/AnalyticsPanel.jsx';
import ErrorState from '../components/ErrorState.jsx';

export default function VehicleAnalytics() {
  const [vehicleId, setVehicleId] = useState('V1');
  const [hours, setHours] = useState(24);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const search = (event) => {
    event.preventDefault();
    analyticsApi.performance(vehicleId, hours).then((result) => { setData(result); setError(''); }).catch((err) => setError(err.message));
  };
  const efficiency = data?.efficiency == null ? 0 : Math.round(data.efficiency * 100);
  const tempTone = data?.avgBatteryTemp == null ? 'neutral' : data.avgBatteryTemp >= 45 ? 'danger' : data.avgBatteryTemp >= 35 ? 'warning' : 'success';
  return (
    <div className="page-stack">
      <form className="search-row" onSubmit={search}>
        <input value={vehicleId} onChange={(event) => setVehicleId(event.target.value)} />
        <select value={hours} onChange={(event) => setHours(Number(event.target.value))}>
          <option value={24}>24h</option>
          <option value={48}>48h</option>
          <option value={72}>72h</option>
          <option value={168}>168h</option>
        </select>
        <button>Analyze</button>
      </form>
      {data ? <AnalyticsPanel data={data} /> : null}
      {data ? (
        <section className="panel">
          <h2>Efficiency</h2>
          <div className="bar"><span style={{ width: `${Math.min(efficiency, 100)}%` }} /></div>
          <p>{efficiency}% DC/AC conversion ratio</p>
          <p className={`badge badge-${tempTone}`}>Average battery temp {data.avgBatteryTemp ?? 'n/a'}</p>
        </section>
      ) : null}
      {error ? <ErrorState message={error} /> : null}
    </div>
  );
}
