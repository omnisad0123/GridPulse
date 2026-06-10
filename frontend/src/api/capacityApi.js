import { apiClient, unwrap } from './client.js';

export const capacityApi = {
  plan(hours = 24, siteLimitKw = 500) {
    return unwrap(apiClient.get('/capacity/plan', { params: { hours, siteLimitKw } }));
  },
};
