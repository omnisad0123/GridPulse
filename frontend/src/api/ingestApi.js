import { apiClient, unwrap } from './client.js';

export const ingestApi = {
  single(payload) {
    return unwrap(apiClient.post('/ingest', payload));
  },
  batch(records) {
    return unwrap(apiClient.post('/ingest/batch', { records }));
  },
};
