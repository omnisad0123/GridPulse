import EmptyState from './EmptyState.jsx';
import LoadingState from './LoadingState.jsx';

export default function DataTable({ columns, rows, loading = false, emptyMessage = 'No rows found.', onRowClick }) {
  if (loading) return <LoadingState />;
  if (!rows || rows.length === 0) return <EmptyState message={emptyMessage} />;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.id ?? `${row.timestamp}-${index}`}
              className={onRowClick ? 'clickable-row' : ''}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
