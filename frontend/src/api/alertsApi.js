import { apiClient, unwrap } from './client.js';

export const alertsApi = {
  createRule(payload) {
    return unwrap(apiClient.post('/alerts/rules', payload));
  },
  listRules() {
    return unwrap(apiClient.get('/alerts/rules'));
  },
  updateRule(ruleId, payload) {
    return unwrap(apiClient.patch(`/alerts/rules/${ruleId}`, payload));
  },
  deleteRule(ruleId) {
    return unwrap(apiClient.delete(`/alerts/rules/${ruleId}`));
  },
  listEvents(params = {}) {
    return unwrap(apiClient.get('/alerts/events', { params }));
  },
};
