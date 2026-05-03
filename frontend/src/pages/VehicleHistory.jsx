import { useEffect, useState } from 'react';
import { historyApi } from '../api/historyApi.js';
import DataTable from '../components/DataTable.jsx';
import PaginationControls from '../components/PaginationControls.jsx';
import AnalyticsPanel from '../components/AnalyticsPanel.jsx';
import Badge from '../components/Badge.jsx';
import ErrorState from '../components/ErrorState.jsx';

const columns = [
  { key: 'timestamp', label: 'Timestamp', render: (row) => new Date(row.timestamp).toLocaleString() },
  { key: 'soc', label: 'SOC', render: (row) => <Badge tone={row.soc < 20 ? 'danger' : 'success'}>{row.soc}%</Badge> },
  { key: 'kwhDeliveredDc', label: 'DC kWh' },
  { key: 'batteryTemp', label: 'Battery temp' },
];

export default function VehicleHistory() {
  const [vehicleId, setVehicleId] = useState('V1');
  const [page, setPage] = useState(1);
  const [history, setHistory] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    Promise.all([historyApi.getVehicleHistory(vehicleId, page, 10), historyApi.getVehicleSummary(vehicleId)])
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
        <input value={vehicleId} onChange={(event) => setVehicleId(event.target.value)} placeholder="Vehicle ID" />
        <button>Load vehicle history</button>
      </form>
      {summary ? (
        <AnalyticsPanel
          data={{
            readings: summary.count,
            avgSoc: summary.soc.avg,
            avgDc: summary.kwhDeliveredDc.avg,
            avgTemp: summary.batteryTemp.avg,
          }}
        />
      ) : null}
      {error ? <ErrorState message={error} /> : null}
      <DataTable columns={columns} rows={history?.data ?? []} loading={loading} emptyMessage="No vehicle readings found." />
      <PaginationControls currentPage={history?.page ?? page} totalPages={history?.totalPages ?? 1} onPageChange={setPage} />
    </div>
  );
}
