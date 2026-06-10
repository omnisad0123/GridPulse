import { apiClient, unwrap } from './client.js';

export const maintenanceApi = {
  create(payload) {
    return unwrap(apiClient.post('/maintenance/work-orders', payload));
  },
  list(params = {}) {
    return unwrap(apiClient.get('/maintenance/work-orders', { params }));
  },
  update(id, payload) {
    return unwrap(apiClient.patch(`/maintenance/work-orders/${id}`, payload));
  },
};
