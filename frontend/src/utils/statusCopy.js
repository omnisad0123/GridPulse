export function statusCopy(status) {
  const normalized = String(status ?? 'unknown');
  const messages = {
    low: 'Operating normally.',
    medium: 'Needs monitoring.',
    high: 'Action should be scheduled.',
    critical: 'Immediate action recommended.',
    warning: 'Approaching a limit.',
    breach: 'Policy has been breached.',
    online: 'Telemetry is fresh.',
    delayed: 'Telemetry is delayed.',
    offline: 'Telemetry is missing.',
    balanced: 'Energy is reconciled.',
    loss_high: 'Energy loss is high.',
  };
  return messages[normalized] ?? 'Status has no detailed copy yet.';
}

export function statusAction(status) {
  const normalized = String(status ?? 'unknown');
  if (['critical', 'breach', 'offline', 'loss_high'].includes(normalized)) return 'Open an investigation work order.';
  if (['high', 'warning', 'delayed'].includes(normalized)) return 'Review the next operations report.';
  if (['medium', 'watch'].includes(normalized)) return 'Monitor for another window.';
  return 'No action required.';
}

export function statusSortWeight(status) {
  const normalized = String(status ?? 'unknown');
  const weights = {
    critical: 100,
    breach: 95,
    offline: 90,
    loss_high: 85,
    high: 80,
    urgent: 78,
    warning: 60,
    delayed: 55,
    medium: 50,
    watch: 45,
    low: 20,
    online: 10,
    balanced: 5,
  };
  return weights[normalized] ?? 0;
}

export function highestStatus(statuses = []) {
  return [...statuses].sort((a, b) => statusSortWeight(b) - statusSortWeight(a))[0] ?? 'unknown';
}

export function isActionableStatus(status) {
  return statusSortWeight(status) >= 50;
}
