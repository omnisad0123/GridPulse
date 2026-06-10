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
import MeterHistory from '../pages/MeterHistory.jsx';
import VehicleHistory from '../pages/VehicleHistory.jsx';
import Reports from '../pages/Reports.jsx';
import Devices from '../pages/Devices.jsx';
import Tariffs from '../pages/Tariffs.jsx';
import Anomalies from '../pages/Anomalies.jsx';
import Forecasts from '../pages/Forecasts.jsx';
import Reconciliation from '../pages/Reconciliation.jsx';
import Sla from '../pages/Sla.jsx';
import Capacity from '../pages/Capacity.jsx';
import Maintenance from '../pages/Maintenance.jsx';
import Notifications from '../pages/Notifications.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/ingest" element={<IngestTelemetry />} />
      <Route path="/meters" element={<MeterStatus />} />
      <Route path="/vehicles" element={<VehicleStatus />} />
      <Route path="/meter-history" element={<MeterHistory />} />
      <Route path="/vehicle-history" element={<VehicleHistory />} />
      <Route path="/vehicle-analytics" element={<VehicleAnalytics />} />
      <Route path="/fleet" element={<FleetAnalytics />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/exports" element={<ExportJobs />} />
      <Route path="/audit" element={<AuditLogs />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/devices" element={<Devices />} />
      <Route path="/tariffs" element={<Tariffs />} />
      <Route path="/anomalies" element={<Anomalies />} />
      <Route path="/forecasts" element={<Forecasts />} />
      <Route path="/reconciliation" element={<Reconciliation />} />
      <Route path="/sla" element={<Sla />} />
      <Route path="/capacity" element={<Capacity />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
}
