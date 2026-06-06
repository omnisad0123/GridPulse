import { useEffect, useState } from 'react';
import { exportsApi } from '../api/exportsApi.js';
import ExportJobTable from '../components/ExportJobTable.jsx';

export default function ExportJobs() {
  const [jobs, setJobs] = useState([]);
  const load = () => exportsApi.list().then(setJobs);
  useEffect(() => { load().catch(() => undefined); }, []);
  const create = (event) => {
    event.preventDefault();
    exportsApi.create({ type: event.currentTarget.type.value }).then(load);
  };
  return (
    <div className="page-stack">
      <section className="panel">
        <h2>Create export</h2>
        <form className="search-row" onSubmit={create}>
          <select name="type"><option value="meter_readings">Meter readings</option><option value="vehicle_readings">Vehicle readings</option><option value="analytics_summary">Analytics summary</option></select>
          <button>Create</button>
        </form>
      </section>
      <ExportJobTable jobs={jobs} downloadUrl={exportsApi.downloadUrl} />
    </div>
  );
}
