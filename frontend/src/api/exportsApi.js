import { apiClient, unwrap } from './client.js';

export const exportsApi = {
  create(payload) {
    return unwrap(apiClient.post('/exports', payload));
  },
  list() {
    return unwrap(apiClient.get('/exports'));
  },
  downloadUrl(jobId) {
    return `${apiClient.defaults.baseURL}/exports/${jobId}/download`;
  },
};
