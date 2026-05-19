export default function EmptyState({ message = 'No records yet.' }) {
  return <div className="state">{message}</div>;
}
