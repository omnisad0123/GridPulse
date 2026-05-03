import { useEffect, useState } from 'react';
import { historyApi } from '../api/historyApi.js';
import DataTable from '../components/DataTable.jsx';
import PaginationControls from '../components/PaginationControls.jsx';
import AnalyticsPanel from '../components/AnalyticsPanel.jsx';
import ErrorState from '../components/ErrorState.jsx';

const columns = [
  { key: 'timestamp', label: 'Timestamp', render: (row) => new Date(row.timestamp).toLocaleString() },
  { key: 'kwhConsumedAc', label: 'AC kWh' },
  { key: 'voltage', label: 'Voltage' },
  { key: 'batchId', label: 'Batch', render: (row) => row.batchId ?? 'single' },
];

export default function MeterHistory() {
  const [meterId, setMeterId] = useState('M1');
  const [page, setPage] = useState(1);
  const [history, setHistory] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    Promise.all([historyApi.getMeterHistory(meterId, page, 10), historyApi.getMeterSummary(meterId)])
      .then(([nextHistory, nextSummary]) => {
        setHistory(nextHistory);
        setSummary(nextSummary);
        setError('');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [page]);

  const submit = (event) => {
    event.preventDefault();
    setPage(1);
    load();
  };

  return (
    <div className="page-stack">
      <form className="search-row" onSubmit={submit}>
        <input value={meterId} onChange={(event) => setMeterId(event.target.value)} placeholder="Meter ID" />
        <button>Load meter history</button>
      </form>
      {summary ? (
        <AnalyticsPanel
          data={{
            readings: summary.count,
            minKwh: summary.kwhConsumedAc.min,
            maxKwh: summary.kwhConsumedAc.max,
            avgVoltage: summary.voltage.avg,
          }}
        />
      ) : null}
      {error ? <ErrorState message={error} /> : null}
      <DataTable columns={columns} rows={history?.data ?? []} loading={loading} emptyMessage="No meter readings found." />
      <PaginationControls currentPage={history?.page ?? page} totalPages={history?.totalPages ?? 1} onPageChange={setPage} />
    </div>
  );
}
