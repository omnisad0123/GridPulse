import MeterForm from './MeterForm.jsx';
import VehicleForm from './VehicleForm.jsx';

export default function TelemetryForm({ onMeter, onVehicle }) {
  return (
    <div className="two-column">
      <section className="panel">
        <h2>Meter reading</h2>
        <MeterForm onSubmit={onMeter} />
      </section>
      <section className="panel">
        <h2>Vehicle reading</h2>
        <VehicleForm onSubmit={onVehicle} />
      </section>
    </div>
  );
}
