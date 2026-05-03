import { apiClient, unwrap } from './client.js';

export const auditApi = {
  list() {
    return unwrap(apiClient.get('/audit-logs'));
  },
};
