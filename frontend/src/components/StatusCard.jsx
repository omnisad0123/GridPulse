export default function StatusCard({ title, rows }) {
  return (
    <article className="panel">
      <h2>{title}</h2>
      <dl className="status-list">
        {rows.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
