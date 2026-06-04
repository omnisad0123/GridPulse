import { useState } from 'react';
import { analyticsApi } from '../api/analyticsApi.js';
import AnalyticsPanel from '../components/AnalyticsPanel.jsx';
import ErrorState from '../components/ErrorState.jsx';

export default function VehicleAnalytics() {
  const [vehicleId, setVehicleId] = useState('V1');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const search = (event) => {
    event.preventDefault();
    analyticsApi.performance(vehicleId).then((result) => { setData(result); setError(''); }).catch((err) => setError(err.message));
  };
  return (
    <div className="page-stack">
      <form className="search-row" onSubmit={search}><input value={vehicleId} onChange={(event) => setVehicleId(event.target.value)} /><button>Analyze</button></form>
      {data ? <AnalyticsPanel data={data} /> : null}
      {error ? <ErrorState message={error} /> : null}
    </div>
  );
}
