import { apiClient, unwrap } from './client.js';

export const analyticsApi = {
  performance(vehicleId) {
    return unwrap(apiClient.get(`/analytics/performance/${vehicleId}`));
  },
  fleet() {
    return unwrap(apiClient.get('/analytics/fleet'));
  },
  meters() {
    return unwrap(apiClient.get('/analytics/meters'));
  },
};
