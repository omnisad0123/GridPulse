import { apiClient, unwrap } from './client.js';

export const historyApi = {
  getMeterHistory(meterId, page = 1, limit = 10) {
    return unwrap(apiClient.get(`/history/meters/${meterId}`, { params: { page, limit } }));
  },
  getVehicleHistory(vehicleId, page = 1, limit = 10) {
    return unwrap(apiClient.get(`/history/vehicles/${vehicleId}`, { params: { page, limit } }));
  },
  getMeterSummary(meterId) {
    return unwrap(apiClient.get(`/history/meters/${meterId}/summary`));
  },
  getVehicleSummary(vehicleId) {
    return unwrap(apiClient.get(`/history/vehicles/${vehicleId}/summary`));
  },
};
