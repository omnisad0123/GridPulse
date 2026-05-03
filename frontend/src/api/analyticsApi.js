import { apiClient, unwrap } from './client.js';

export const analyticsApi = {
  performance(vehicleId, hours = 24) {
    return unwrap(apiClient.get(`/analytics/performance/${vehicleId}`, { params: { hours } }));
  },
  fleet() {
    return unwrap(apiClient.get('/analytics/fleet'));
  },
  meters() {
    return unwrap(apiClient.get('/analytics/meters'));
  },
};
