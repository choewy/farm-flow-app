import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { ErrorCode } from './error-code';

import { API_BASE_URL } from '@app/config';

export const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

let isRefreshing = false;
let refreshSubscribers: ((token?: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token?: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed() {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
}

async function refreshToken() {
  await axios.post(`${API_BASE_URL}/auth/refresh`, {}, { withCredentials: true });
}

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ errorCode: ErrorCode }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.data?.errorCode !== ErrorCode.ExpiredToken || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!isRefreshing) {
      isRefreshing = true;

      try {
        await refreshToken();
        isRefreshing = false;
        onRefreshed();
      } catch (err) {
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    return new Promise((resolve) => {
      subscribeTokenRefresh(() => {
        resolve(http(originalRequest));
      });
    });
  },
);
