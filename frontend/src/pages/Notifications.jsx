import { useEffect, useState } from 'react';
import { notificationsApi } from '../api/notificationsApi.js';
import DataTable from '../components/DataTable.jsx';
import Badge from '../components/Badge.jsx';

export default function Notifications() {
  const [routes, setRoutes] = useState([]);
  const [preview, setPreview] = useState([]);
  const load = () => notificationsApi.listRoutes().then(setRoutes);
  useEffect(() => { load(); }, []);
  const create = (event) => {
    event.preventDefault();
    notificationsApi.createRoute({ name: event.currentTarget.name.value, channel: event.currentTarget.channel.value, target: event.currentTarget.target.value, minSeverity: event.currentTarget.minSeverity.value }).then(load);
  };
  const runPreview = () => notificationsApi.preview({ severity: 'medium', title: 'Operational watch', message: 'GridPulse generated a notification preview.' }).then(setPreview);
  return (
    <div className="page-stack">
      <form className="form-grid panel" onSubmit={create}>
        <input name="name" placeholder="Route name" />
        <select name="channel"><option>email</option><option>sms</option><option>webhook</option></select>
        <input name="target" placeholder="Target" />
        <select name="minSeverity"><option>low</option><option>medium</option><option>high</option></select>
        <button>Create route</button>
      </form>
      <button onClick={runPreview}>Preview medium alert</button>
      <DataTable columns={[
        { key: 'name', label: 'Name' },
        { key: 'channel', label: 'Channel' },
        { key: 'target', label: 'Target' },
        { key: 'minSeverity', label: 'Min severity', render: (row) => <Badge>{row.minSeverity}</Badge> },
      ]} rows={routes} />
      <DataTable columns={[
        { key: 'channel', label: 'Channel' },
        { key: 'target', label: 'Target' },
        { key: 'wouldSend', label: 'Would send', render: (row) => <Badge tone={row.wouldSend ? 'success' : 'neutral'}>{String(row.wouldSend)}</Badge> },
      ]} rows={preview} emptyMessage="No preview generated." />
    </div>
  );
}
