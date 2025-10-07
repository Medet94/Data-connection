import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    console.error('[API ERROR]', err?.response?.status, err?.message);
    return Promise.reject(err);
  }
);

export default api;
