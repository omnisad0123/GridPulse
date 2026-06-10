import { apiClient, unwrap } from './client.js';

export const tariffsApi = {
  listWindows() {
    return unwrap(apiClient.get('/tariffs/windows'));
  },
  createWindow(payload) {
    return unwrap(apiClient.post('/tariffs/windows', payload));
  },
  estimate(payload) {
    return unwrap(apiClient.post('/tariffs/estimate', payload));
  },
};
