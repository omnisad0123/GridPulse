import { apiClient, unwrap } from './client.js';

export const notificationsApi = {
  createRoute(payload) {
    return unwrap(apiClient.post('/notifications/routes', payload));
  },
  listRoutes() {
    return unwrap(apiClient.get('/notifications/routes'));
  },
  preview(payload) {
    return unwrap(apiClient.post('/notifications/preview', payload));
  },
};
