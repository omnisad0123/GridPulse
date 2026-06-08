import { useEffect, useState } from 'react';
import { apiClient, unwrap } from '../api/client.js';
import EmptyState from '../components/EmptyState.jsx';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  useEffect(() => { unwrap(apiClient.get('/audit-logs')).then(setLogs).catch(() => setLogs([])); }, []);
  if (!logs.length) return <EmptyState message="No audit logs recorded." />;
  return (
    <table>
      <thead><tr><th>Action</th><th>Target</th><th>ID</th><th>Created</th></tr></thead>
      <tbody>{logs.map((log) => <tr key={log.id}><td>{log.action}</td><td>{log.targetType}</td><td>{log.targetId}</td><td>{new Date(log.createdAt).toLocaleString()}</td></tr>)}</tbody>
    </table>
  );
}
