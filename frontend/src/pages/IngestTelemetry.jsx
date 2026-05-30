import { useState } from 'react';
import { ingestApi } from '../api/ingestApi.js';
import TelemetryForm from '../components/TelemetryForm.jsx';
import ErrorState from '../components/ErrorState.jsx';

export default function IngestTelemetry() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const submit = (payload) => ingestApi.single(payload).then((result) => { setMessage(`${result.type} accepted`); setError(''); }).catch((err) => setError(err.message));
  const submitBatch = (event) => {
    event.preventDefault();
    const records = JSON.parse(event.currentTarget.records.value);
    ingestApi.batch(records).then((result) => setMessage(`Batch ${result.batchId} accepted`)).catch((err) => setError(err.message));
  };
  return (
    <div className="page-stack">
      <TelemetryForm onMeter={submit} onVehicle={submit} />
      <section className="panel">
        <h2>Batch ingest</h2>
        <form onSubmit={submitBatch}>
          <textarea name="records" rows="8" defaultValue={JSON.stringify([{ meterId: 'M2', kwhConsumedAc: 11, voltage: 221, timestamp: new Date().toISOString() }], null, 2)} />
          <button>Send batch</button>
        </form>
      </section>
      {message ? <div className="state success">{message}</div> : null}
      {error ? <ErrorState message={error} /> : null}
    </div>
  );
}
