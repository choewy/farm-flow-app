import axios from 'axios';

import { API_BASE_URL } from '@app/config';

export const httpPublic = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

httpPublic.interceptors.request.use((config) => {
  return config;
});
