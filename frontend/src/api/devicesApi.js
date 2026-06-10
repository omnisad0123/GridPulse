import { apiClient, unwrap } from './client.js';

export const devicesApi = {
  register(payload) {
    return unwrap(apiClient.post('/devices', payload));
  },
  list(params = {}) {
    return unwrap(apiClient.get('/devices', { params }));
  },
  health(params = {}) {
    return unwrap(apiClient.get('/devices/health', { params }));
  },
  update(deviceId, payload) {
    return unwrap(apiClient.patch(`/devices/${deviceId}`, payload));
  },
};
