import { useEffect, useState } from 'react';
import { devicesApi } from '../api/devicesApi.js';
import DataTable from '../components/DataTable.jsx';
import Badge from '../components/Badge.jsx';
import ErrorState from '../components/ErrorState.jsx';
import HealthTimeline from '../components/HealthTimeline.jsx';

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [health, setHealth] = useState([]);
  const [form, setForm] = useState({ deviceId: 'M100', kind: 'meter', siteId: 'SITE-A', displayName: 'Main meter', model: 'MX', firmwareVersion: '1.0.0', commissionedAt: new Date().toISOString() });
  const [error, setError] = useState('');
  const load = () => Promise.all([devicesApi.list({ limit: 50 }), devicesApi.health({ limit: 50 })])
    .then(([list, healthList]) => { setDevices(list.data); setHealth(healthList.data); setError(''); })
    .catch((err) => setError(err.message));

  useEffect(() => { load(); }, []);

  const submit = (event) => {
    event.preventDefault();
    devicesApi.register(form).then(load).catch((err) => setError(err.message));
  };

  return (
    <div className="page-stack">
      <section className="panel">
        <h2>Register device</h2>
        <form className="form-grid" onSubmit={submit}>
          <input value={form.deviceId} onChange={(event) => setForm({ ...form, deviceId: event.target.value })} placeholder="Device ID" />
          <select value={form.kind} onChange={(event) => setForm({ ...form, kind: event.target.value })}><option value="meter">Meter</option><option value="vehicle">Vehicle</option></select>
          <input value={form.siteId} onChange={(event) => setForm({ ...form, siteId: event.target.value })} placeholder="Site" />
          <input value={form.displayName} onChange={(event) => setForm({ ...form, displayName: event.target.value })} placeholder="Display name" />
          <input value={form.model} onChange={(event) => setForm({ ...form, model: event.target.value })} placeholder="Model" />
          <input value={form.firmwareVersion} onChange={(event) => setForm({ ...form, firmwareVersion: event.target.value })} placeholder="Firmware" />
          <button>Register</button>
        </form>
      </section>
      {error ? <ErrorState message={error} /> : null}
      <DataTable columns={[
        { key: 'deviceId', label: 'Device' },
        { key: 'kind', label: 'Kind', render: (row) => <Badge>{row.kind}</Badge> },
        { key: 'siteId', label: 'Site' },
        { key: 'state', label: 'State', render: (row) => <Badge tone={row.state === 'active' ? 'success' : 'warning'}>{row.state}</Badge> },
      ]} rows={devices} />
      <DataTable columns={[
        { key: 'deviceId', label: 'Device' },
        { key: 'health', label: 'Health', render: (row) => <Badge tone={row.health === 'online' ? 'success' : row.health === 'delayed' ? 'warning' : 'danger'}>{row.health}</Badge> },
        { key: 'minutesSinceTelemetry', label: 'Minutes since telemetry' },
      ]} rows={health} emptyMessage="No device health rows." />
      <HealthTimeline rows={health} />
    </div>
  );
}
