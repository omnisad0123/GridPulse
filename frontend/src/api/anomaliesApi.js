import { apiClient, unwrap } from './client.js';

export const anomaliesApi = {
  scan(hours = 24) {
    return unwrap(apiClient.get('/anomalies', { params: { hours } }));
  },
};
