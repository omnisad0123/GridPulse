import EmptyState from './EmptyState.jsx';

export default function ExportJobTable({ jobs, downloadUrl }) {
  if (!jobs.length) return <EmptyState message="No export jobs created." />;
  return (
    <table>
      <thead>
        <tr><th>Type</th><th>Status</th><th>Rows</th><th>Created</th><th></th></tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id}>
            <td>{job.type}</td>
            <td>{job.status}</td>
            <td>{job.rowCount}</td>
            <td>{new Date(job.createdAt).toLocaleString()}</td>
            <td>{job.status === 'completed' ? <a href={downloadUrl(job.id)}>Download</a> : null}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
