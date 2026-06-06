import { useEffect, useState } from 'react';
import { alertsApi } from '../api/alertsApi.js';
import AlertRuleCard from '../components/AlertRuleCard.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function Alerts() {
  const [rules, setRules] = useState([]);
  const [events, setEvents] = useState([]);
  const load = () => Promise.all([alertsApi.listRules(), alertsApi.listEvents()]).then(([nextRules, nextEvents]) => { setRules(nextRules); setEvents(nextEvents); });
  useEffect(() => { load().catch(() => undefined); }, []);
  const create = (event) => {
    event.preventDefault();
    alertsApi.createRule({ name: event.currentTarget.name.value, kind: event.currentTarget.kind.value, threshold: Number(event.currentTarget.threshold.value) }).then(load);
  };
  return (
    <div className="page-stack">
      <section className="panel">
        <h2>Alert rules</h2>
        <form className="form-grid" onSubmit={create}>
          <input name="name" placeholder="Rule name" />
          <select name="kind"><option>HIGH_BATTERY_TEMP</option><option>LOW_SOC</option><option>VOLTAGE_ANOMALY</option></select>
          <input name="threshold" type="number" placeholder="Threshold" />
          <button>Create rule</button>
        </form>
      </section>
      <div className="rule-grid">{rules.map((rule) => <AlertRuleCard key={rule.id} rule={rule} onToggle={(r) => alertsApi.updateRule(r.id, { enabled: !r.enabled }).then(load)} onDelete={(id) => alertsApi.deleteRule(id).then(load)} />)}</div>
      <section className="panel"><h2>Events</h2>{events.length ? events.map((event) => <p key={event.id}>{event.message}</p>) : <EmptyState />}</section>
    </div>
  );
}
