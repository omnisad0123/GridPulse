import { useState } from 'react';

export default function VehicleForm({ onSubmit }) {
  const [form, setForm] = useState({ vehicleId: 'V1', soc: 60, kwhDeliveredDc: 8, batteryTemp: 32, timestamp: new Date().toISOString() });
  return (
    <form className="form-grid" onSubmit={(event) => { event.preventDefault(); onSubmit({ ...form, soc: Number(form.soc), kwhDeliveredDc: Number(form.kwhDeliveredDc), batteryTemp: Number(form.batteryTemp) }); }}>
      <input value={form.vehicleId} onChange={(event) => setForm({ ...form, vehicleId: event.target.value })} placeholder="Vehicle ID" />
      <input value={form.soc} type="number" onChange={(event) => setForm({ ...form, soc: event.target.value })} placeholder="SOC" />
      <input value={form.kwhDeliveredDc} type="number" onChange={(event) => setForm({ ...form, kwhDeliveredDc: event.target.value })} placeholder="DC kWh" />
      <input value={form.batteryTemp} type="number" onChange={(event) => setForm({ ...form, batteryTemp: event.target.value })} placeholder="Battery temp" />
      <input value={form.timestamp} onChange={(event) => setForm({ ...form, timestamp: event.target.value })} placeholder="Timestamp" />
      <button>Send vehicle reading</button>
    </form>
  );
}
