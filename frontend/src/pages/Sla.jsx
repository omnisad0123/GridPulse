import { useEffect, useState } from 'react';
import { slaApi } from '../api/slaApi.js';
import DataTable from '../components/DataTable.jsx';
import Badge from '../components/Badge.jsx';
import AnalyticsPanel from '../components/AnalyticsPanel.jsx';
import HealthTimeline from '../components/HealthTimeline.jsx';

export default function Sla() {
  const [report, setReport] = useState(null);
  const [policies, setPolicies] = useState([]);
  useEffect(() => {
    Promise.all([slaApi.policies(), slaApi.freshness()]).then(([nextPolicies, nextReport]) => {
      setPolicies(nextPolicies);
      setReport(nextReport);
    });
  }, []);
  return (
    <div className="page-stack">
      {report ? <AnalyticsPanel data={{ policies: report.policyCount, warnings: report.warningCount, breaches: report.breachCount }} /> : null}
      <DataTable columns={[
        { key: 'id', label: 'Policy' },
        { key: 'entityType', label: 'Entity' },
        { key: 'warningAgeMinutes', label: 'Warning' },
        { key: 'maxTelemetryAgeMinutes', label: 'Breach' },
      ]} rows={policies} />
      <DataTable columns={[
        { key: 'severity', label: 'Severity', render: (row) => <Badge tone={row.severity === 'breach' ? 'danger' : 'warning'}>{row.severity}</Badge> },
        { key: 'entityId', label: 'Entity' },
        { key: 'ageMinutes', label: 'Age' },
        { key: 'message', label: 'Message' },
      ]} rows={report?.violations ?? []} emptyMessage="No SLA violations." />
      <HealthTimeline rows={report?.violations ?? []} />
    </div>
  );
}
