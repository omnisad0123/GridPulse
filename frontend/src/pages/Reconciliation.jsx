import { useEffect, useState } from 'react';
import { reconciliationApi } from '../api/reconciliationApi.js';
import DataTable from '../components/DataTable.jsx';
import Badge from '../components/Badge.jsx';
import AnalyticsPanel from '../components/AnalyticsPanel.jsx';
import { formatDateTime, formatPercent, riskTone } from '../utils/formatters.js';

export default function Reconciliation() {
  const [hours, setHours] = useState(24);
  const [bucketHours, setBucketHours] = useState(1);
  const [report, setReport] = useState(null);
  const load = () => reconciliationApi.energy(hours, bucketHours).then(setReport).catch(() => setReport(null));
  useEffect(() => { load(); }, [hours, bucketHours]);
  return (
    <div className="page-stack">
      <form className="search-row" onSubmit={(event) => { event.preventDefault(); load(); }}>
        <select value={hours} onChange={(event) => setHours(Number(event.target.value))}><option value={24}>24h</option><option value={48}>48h</option><option value={168}>7d</option></select>
        <select value={bucketHours} onChange={(event) => setBucketHours(Number(event.target.value))}><option value={1}>1h buckets</option><option value={4}>4h buckets</option><option value={12}>12h buckets</option></select>
        <button>Reconcile</button>
      </form>
      {report ? <AnalyticsPanel data={{ totalAc: report.totalAc, totalDc: report.totalDc, lossKwh: report.totalLossKwh, avgLoss: report.averageLossPercent }} /> : null}
      <section className="panel">{(report?.notes ?? []).map((note) => <p key={note}>{note}</p>)}</section>
      <DataTable columns={[
        { key: 'from', label: 'From', render: (row) => formatDateTime(row.from) },
        { key: 'totalAc', label: 'AC' },
        { key: 'totalDc', label: 'DC' },
        { key: 'lossPercent', label: 'Loss %', render: (row) => formatPercent((row.lossPercent ?? 0) * 100) },
        { key: 'status', label: 'Status', render: (row) => <Badge tone={riskTone(row.status)}>{row.status}</Badge> },
      ]} rows={report?.windows ?? []} />
    </div>
  );
}
