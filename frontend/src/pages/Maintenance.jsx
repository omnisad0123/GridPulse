import { useEffect, useState } from 'react';
import { maintenanceApi } from '../api/maintenanceApi.js';
import DataTable from '../components/DataTable.jsx';
import Badge from '../components/Badge.jsx';

export default function Maintenance() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ entityType: 'meter', entityId: 'M1', priority: 'medium', title: 'Inspect device', description: 'Operational follow-up' });
  const load = () => maintenanceApi.list({ limit: 50 }).then((result) => setOrders(result.data));
  useEffect(() => { load(); }, []);
  const submit = (event) => {
    event.preventDefault();
    maintenanceApi.create(form).then(load);
  };
  return (
    <div className="page-stack">
      <form className="form-grid panel" onSubmit={submit}>
        <select value={form.entityType} onChange={(event) => setForm({ ...form, entityType: event.target.value })}><option>meter</option><option>vehicle</option><option>site</option></select>
        <input value={form.entityId} onChange={(event) => setForm({ ...form, entityId: event.target.value })} />
        <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })}><option>low</option><option>medium</option><option>high</option><option>urgent</option></select>
        <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
        <button>Create work order</button>
      </form>
      <DataTable columns={[
        { key: 'priority', label: 'Priority', render: (row) => <Badge tone={row.priority === 'urgent' || row.priority === 'high' ? 'danger' : 'warning'}>{row.priority}</Badge> },
        { key: 'status', label: 'Status' },
        { key: 'entityId', label: 'Entity' },
        { key: 'title', label: 'Title' },
      ]} rows={orders} />
    </div>
  );
}
