import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { toCamelCase, toSnakeCase } from './utils';

type TokenKey = 'accessToken' | 'refreshToken';

const API_BASE_URL = 'http://192.168.8.103:3000';

export const saveToken = async (key: TokenKey, value: string) => {
  try {
    if (typeof key !== 'string' || typeof value !== 'string') {
      throw new Error('Invalid value provided to SecureStore');
    }
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const getToken = async (key: TokenKey) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

const deleteToken = async (key: TokenKey) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('Error deleting token:', error);
  }
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

api.interceptors.request.use(
  async (config) => {
    const token = await getToken('accessToken');
    console.log(token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (config.data) {
      config.data = toSnakeCase(config.data);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  async (response) => {
    if (response.data) {
      return { ...response, data: toCamelCase(response.data) };
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && [401, 403].includes(error.response.status)) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((token) => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              resolve(api.request(originalRequest));
            });
          });
        }

        isRefreshing = true;
        try {
          const refreshToken = await getToken('refreshToken');
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const { data } = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            refresh_token: refreshToken,
          });

          const newToken = data.accessToken;
          await saveToken('accessToken', newToken);

          onRefreshed(newToken);
          isRefreshing = false;

          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return api.request(originalRequest);
        } catch (e) {
          console.error('Token refresh failed:', e);
          await deleteToken('accessToken');
          await deleteToken('refreshToken');
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error.response ? error.response.data : error);
  },
);

export default api;
