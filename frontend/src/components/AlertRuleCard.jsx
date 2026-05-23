export default function AlertRuleCard({ rule, onToggle, onDelete }) {
  return (
    <article className="rule-card">
      <strong>{rule.name}</strong>
      <span>{rule.kind}</span>
      <span>Threshold {rule.threshold}</span>
      <button onClick={() => onToggle(rule)}>{rule.enabled ? 'Disable' : 'Enable'}</button>
      <button className="ghost" onClick={() => onDelete(rule.id)}>Delete</button>
    </article>
  );
}
