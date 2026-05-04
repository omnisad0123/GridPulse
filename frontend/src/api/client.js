import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/v1',
  timeout: 8000,
});

export async function unwrap(request) {
  const response = await request;
  return response.data;
}
