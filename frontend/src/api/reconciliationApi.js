import { apiClient, unwrap } from './client.js';

export const reconciliationApi = {
  energy(hours = 24, bucketHours = 1) {
    return unwrap(apiClient.get('/reconciliation/energy', { params: { hours, bucketHours } }));
  },
};
