import { apiClient, unwrap } from './client.js';

export const slaApi = {
  policies() {
    return unwrap(apiClient.get('/sla/policies'));
  },
  freshness() {
    return unwrap(apiClient.get('/sla/freshness'));
  },
};
