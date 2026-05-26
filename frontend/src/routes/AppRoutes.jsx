import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard.jsx';
import IngestTelemetry from '../pages/IngestTelemetry.jsx';
import MeterStatus from '../pages/MeterStatus.jsx';
import VehicleStatus from '../pages/VehicleStatus.jsx';
import VehicleAnalytics from '../pages/VehicleAnalytics.jsx';
import FleetAnalytics from '../pages/FleetAnalytics.jsx';
import Alerts from '../pages/Alerts.jsx';
import ExportJobs from '../pages/ExportJobs.jsx';
import AuditLogs from '../pages/AuditLogs.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/ingest" element={<IngestTelemetry />} />
      <Route path="/meters" element={<MeterStatus />} />
      <Route path="/vehicles" element={<VehicleStatus />} />
      <Route path="/vehicle-analytics" element={<VehicleAnalytics />} />
      <Route path="/fleet" element={<FleetAnalytics />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/exports" element={<ExportJobs />} />
      <Route path="/audit" element={<AuditLogs />} />
    </Routes>
  );
}
