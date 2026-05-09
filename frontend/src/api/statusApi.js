import { apiClient, unwrap } from './client.js';

export const statusApi = {
  meter(meterId) {
    return unwrap(apiClient.get(`/status/meters/${meterId}`));
  },
  vehicle(vehicleId) {
    return unwrap(apiClient.get(`/status/vehicles/${vehicleId}`));
  },
};
