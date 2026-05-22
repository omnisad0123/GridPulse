import { apiClient, unwrap } from './client.js';

export const reportsApi = {
  operations(hours = 24) {
    return unwrap(apiClient.get('/reports/operations', { params: { hours } }));
  },
  ingestionQuality() {
    return unwrap(apiClient.get('/reports/ingestion-quality'));
  },
};
