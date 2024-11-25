import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'

const toCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v))
  } else if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()), toCamelCase(value)]),
    )
  }
  return obj
}

const toSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toSnakeCase(v))
  } else if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`), toSnakeCase(value)]),
    )
  }
  return obj
}

const api = axios.create({
  baseURL: 'http://192.168.8.189:3000',
})

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  if (config.data) {
    config.data = toSnakeCase(config.data)
  }
  return config
})

api.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = toCamelCase(response.data)
    }
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = await AsyncStorage.getItem('refreshToken')

      try {
        const res = await api.post('/auth/refresh-token', {
          token: refreshToken,
        })
        const newToken = res.data.accessToken
        await AsyncStorage.setItem('token', newToken)
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (e) {
        console.error('Failed to refresh token', e)
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  },
)

export default api
