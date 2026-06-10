import Badge from './Badge.jsx';
import KeyValueList from './KeyValueList.jsx';
import { formatNumber, formatPercent, riskTone } from '../utils/formatters.js';
import { highestStatus, statusAction, statusCopy } from '../utils/statusCopy.js';

export default function RiskSummary({ title, risk, metrics = [], notes = [] }) {
  return (
    <section className="panel">
      <header className="panel-header">
        <h2>{title}</h2>
        <Badge tone={riskTone(risk)}>{highestStatus([risk])}</Badge>
      </header>
      <KeyValueList
        rows={metrics.map((metric) => ({
          label: metric.label,
          value: metric.percent ? formatPercent(metric.value) : formatNumber(metric.value),
        }))}
      />
      <p className="muted">{statusCopy(risk)}</p>
      <p className="muted">{statusAction(risk)}</p>
      {notes.length ? (
        <ul className="note-list">
          {notes.map((note) => <li key={note}>{note}</li>)}
        </ul>
      ) : null}
    </section>
  );
}
