import MetricCard from './MetricCard.jsx';

export default function AnalyticsPanel({ data }) {
  return (
    <div className="metric-grid">
      {Object.entries(data).map(([key, value]) => (
        <MetricCard key={key} label={key} value={value ?? 'n/a'} />
      ))}
    </div>
  );
}
