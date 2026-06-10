import { useEffect, useState } from 'react';
import { capacityApi } from '../api/capacityApi.js';
import AnalyticsPanel from '../components/AnalyticsPanel.jsx';
import Badge from '../components/Badge.jsx';
import RiskSummary from '../components/RiskSummary.jsx';

export default function Capacity() {
  const [siteLimitKw, setSiteLimitKw] = useState(500);
  const [plan, setPlan] = useState(null);
  const load = () => capacityApi.plan(24, siteLimitKw).then(setPlan);
  useEffect(() => { load(); }, []);
  const tone = plan?.risk === 'high' ? 'danger' : plan?.risk === 'medium' ? 'warning' : 'success';
  return (
    <div className="page-stack">
      <form className="search-row" onSubmit={(event) => { event.preventDefault(); load(); }}>
        <input type="number" value={siteLimitKw} onChange={(event) => setSiteLimitKw(Number(event.target.value))} />
        <button>Plan capacity</button>
      </form>
      {plan ? <AnalyticsPanel data={{ peakKw: plan.observedPeakKw, utilization: plan.utilizationPercent, headroom: plan.headroomKw, risk: plan.risk }} /> : null}
      {plan ? (
        <RiskSummary
          title="Capacity risk"
          risk={plan.risk}
          metrics={[
            { label: 'Observed peak kW', value: plan.observedPeakKw },
            { label: 'Utilization', value: plan.utilizationPercent, percent: true },
            { label: 'Headroom kW', value: plan.headroomKw },
          ]}
          notes={plan.recommendations}
        />
      ) : null}
    </div>
  );
}
