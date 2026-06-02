import { useState } from 'react';
import { statusApi } from '../api/statusApi.js';
import StatusCard from '../components/StatusCard.jsx';
import ErrorState from '../components/ErrorState.jsx';

export default function MeterStatus() {
  const [meterId, setMeterId] = useState('M1');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');
  const search = (event) => {
    event.preventDefault();
    statusApi.meter(meterId).then((result) => { setStatus(result); setError(''); }).catch((err) => setError(err.message));
  };
  return (
    <div className="page-stack">
      <form className="search-row" onSubmit={search}><input value={meterId} onChange={(event) => setMeterId(event.target.value)} /><button>Find meter</button></form>
      {status ? <StatusCard title={status.meterId} rows={[{ label: 'AC kWh', value: status.kwhConsumedAc }, { label: 'Voltage', value: status.voltage }, { label: 'Updated', value: new Date(status.lastUpdated).toLocaleString() }]} /> : null}
      {error ? <ErrorState message={error} /> : null}
    </div>
  );
}
