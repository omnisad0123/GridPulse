import { useState } from 'react';

export default function MeterForm({ onSubmit }) {
  const [form, setForm] = useState({ meterId: 'M1', kwhConsumedAc: 10, voltage: 220, timestamp: new Date().toISOString() });
  return (
    <form className="form-grid" onSubmit={(event) => { event.preventDefault(); onSubmit({ ...form, kwhConsumedAc: Number(form.kwhConsumedAc), voltage: Number(form.voltage) }); }}>
      <input value={form.meterId} onChange={(event) => setForm({ ...form, meterId: event.target.value })} placeholder="Meter ID" />
      <input value={form.kwhConsumedAc} type="number" onChange={(event) => setForm({ ...form, kwhConsumedAc: event.target.value })} placeholder="AC kWh" />
      <input value={form.voltage} type="number" onChange={(event) => setForm({ ...form, voltage: event.target.value })} placeholder="Voltage" />
      <input value={form.timestamp} onChange={(event) => setForm({ ...form, timestamp: event.target.value })} placeholder="Timestamp" />
      <button>Send meter reading</button>
    </form>
  );
}
