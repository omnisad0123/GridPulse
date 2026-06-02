import { useState } from 'react';
import { statusApi } from '../api/statusApi.js';
import StatusCard from '../components/StatusCard.jsx';
import ErrorState from '../components/ErrorState.jsx';

export default function VehicleStatus() {
  const [vehicleId, setVehicleId] = useState('V1');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');
  const search = (event) => {
    event.preventDefault();
    statusApi.vehicle(vehicleId).then((result) => { setStatus(result); setError(''); }).catch((err) => setError(err.message));
  };
  return (
    <div className="page-stack">
      <form className="search-row" onSubmit={search}><input value={vehicleId} onChange={(event) => setVehicleId(event.target.value)} /><button>Find vehicle</button></form>
      {status ? <StatusCard title={status.vehicleId} rows={[{ label: 'SOC', value: status.soc }, { label: 'DC kWh', value: status.kwhDeliveredDc }, { label: 'Battery temp', value: status.batteryTemp }, { label: 'Updated', value: new Date(status.lastUpdated).toLocaleString() }]} /> : null}
      {error ? <ErrorState message={error} /> : null}
    </div>
  );
}
