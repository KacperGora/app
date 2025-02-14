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
  return value;
};

const deleteToken = async (key: TokenKey) => {
  await SecureStore.deleteItemAsync(key);
};

const api = axios.create({
  baseURL: 'http://192.168.8.103:3000',
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log(config.data, 'config.data');
    if (config.data) {
      console.log(config.data, 'config.data');
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
      // Apply camelCase transformation to the response data
      const transformedData = toCamelCase(response.data);

      // Return the entire response object with the transformed data
      return { ...response, data: transformedData };
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && [401, 403].includes(error.response.status)) {
      try {
        const refreshToken = await getToken('refreshToken');
        if (!refreshToken) {
          return Promise.reject(error.response.data);
        }

        const { data } = await axios.post('http://192.168.8.103:3000/auth/refresh-token', {
          refresh_token: refreshToken,
        });

        const newToken = data.accessToken;

        await saveToken('accessToken', newToken);

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
    }
    return Promise.reject(error);
  },
);

export default api;
