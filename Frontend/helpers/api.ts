import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { toCamelCase, toSnakeCase } from './utils';

type TokenKey = 'accessToken' | 'refreshToken';

export const saveToken = async (key: TokenKey, value: string) => {
  if (typeof key !== 'string' || typeof value !== 'string') {
    throw new Error('Invalid value provided to SecureStore');
  }
  await SecureStore.setItemAsync(key, value);
};

export const getToken = async (key: TokenKey) => {
  const value = await SecureStore.getItemAsync(key);
  console.log(value);
  return value;
};

const deleteToken = async (key: TokenKey) => {
  await SecureStore.deleteItemAsync(key);
};

const api = axios.create({
  baseURL: 'http://192.168.8.189:3000',
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (config.data) {
      config.data = toSnakeCase(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  async (response) => {
    if (response.data) {
      response.data = toCamelCase(response.data);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && [401, 403].includes(error.response.status)) {
      try {
        const refreshToken = await getToken('refreshToken');
        if (!refreshToken) {
          return Promise.reject(error);
        }

        const { data } = await axios.post('http://192.168.8.189:3000/auth/refresh-token', {
          refresh_token: refreshToken,
        });
        console.log('New token:', data);
        const newToken = data.accessToken;
        await saveToken('accessToken', data.accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        return api.request(originalRequest);
      } catch (e) {
        await deleteToken('accessToken');
        await deleteToken('refreshToken');
        return Promise.reject(error);
      }
    }

    if (error.response) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  },
);

export default api;
