import { useEffect, useState } from 'react';
import { analyticsApi } from '../api/analyticsApi.js';
import AnalyticsPanel from '../components/AnalyticsPanel.jsx';
import LoadingState from '../components/LoadingState.jsx';

export default function FleetAnalytics() {
  const [fleet, setFleet] = useState(null);
  useEffect(() => { analyticsApi.fleet().then(setFleet).catch(() => setFleet({ totalVehicles: 0 })); }, []);
  return fleet ? <AnalyticsPanel data={fleet} /> : <LoadingState />;
}
