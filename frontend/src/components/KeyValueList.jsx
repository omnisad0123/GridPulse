export default function KeyValueList({ rows }) {
  return (
    <dl className="status-list">
      {rows.map((row) => (
        <div key={row.label}>
          <dt>{row.label}</dt>
          <dd>{row.value ?? 'n/a'}</dd>
        </div>
      ))}
    </dl>
  );
}
