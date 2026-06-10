export function formatNumber(value, digits = 2) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return 'n/a';
  return Number(value).toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  });
}

export function formatPercent(value, digits = 1) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return 'n/a';
  return `${formatNumber(value, digits)}%`;
}

export function formatDateTime(value) {
  if (!value) return 'n/a';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'n/a';
  return date.toLocaleString();
}

export function riskTone(risk) {
  if (['critical', 'high', 'urgent', 'breach', 'offline', 'loss_high'].includes(risk)) return 'danger';
  if (['medium', 'warning', 'watch', 'delayed'].includes(risk)) return 'warning';
  if (['low', 'balanced', 'online', 'active'].includes(risk)) return 'success';
  return 'neutral';
}

export function compactId(value, size = 10) {
  if (!value) return 'n/a';
  const text = String(value);
  return text.length <= size ? text : `${text.slice(0, size)}...`;
}

export function sortNewestFirst(rows, field = 'createdAt') {
  return [...(rows ?? [])].sort((a, b) => new Date(b[field]).getTime() - new Date(a[field]).getTime());
}
