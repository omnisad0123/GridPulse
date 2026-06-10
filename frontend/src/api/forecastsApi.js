import { apiClient, unwrap } from './client.js';

export const forecastsApi = {
  meter(meterId, horizonHours = 6) {
    return unwrap(apiClient.get(`/forecasts/meters/${meterId}`, { params: { horizonHours } }));
  },
  vehicle(vehicleId, horizonHours = 6, metric = 'kwhDeliveredDc') {
    return unwrap(apiClient.get(`/forecasts/vehicles/${vehicleId}`, { params: { horizonHours, metric } }));
  },
};
