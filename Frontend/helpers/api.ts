import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { toCamelCase, toSnakeCase } from './utils'

type TokenKey = 'accessToken' | 'refreshToken'

export const saveToken = async (key: TokenKey, value: string) => {
  console.log(value, 'saveToken')
  if (typeof key !== 'string' || typeof value !== 'string') {
    throw new Error('Invalid value provided to SecureStore')
  }
  await SecureStore.setItemAsync(key, value)
  console.log(key, 'save token')
}

const getToken = async (key: TokenKey) => {
  const value = await SecureStore.getItemAsync(key)
  console.log(value, 'get token')
  console.log(key)
  return value
}

const deleteToken = async (key: TokenKey) => {
  await SecureStore.deleteItemAsync(key)
}

const api = axios.create({
  baseURL: 'http://192.168.8.189:3000',
})

api.interceptors.request.use(
  async (config) => {
    const token = await getToken('accessToken')
    console.log(token, 'api config')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    if (config.data) {
      config.data = toSnakeCase(config.data)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  async (response) => {
    if (response.data) {
      response.data = toCamelCase(response.data)
    }
    return response
  },
  async (error) => {
    const originalRequest = error.config
    console.log(error.response.status)
    if (error.response && [401, 403].includes(error.response.status)) {
      console.log('Token expired')
      try {
        const refreshToken = await getToken('refreshToken')
        if (!refreshToken) {
          console.error('Brak refresh tokena')
          return Promise.reject(error)
        }

        const { data } = await axios.post('http://192.168.8.189:3000/auth/refresh-token', { refresh_token: refreshToken })
        console.log(data)
        const newToken = data.accessToken
        // Zapisujemy nowy access token
        await saveToken('accessToken', data.accessToken)
        console.log(newToken, 'MEEEEE')

        originalRequest.headers['Authorization'] = `Bearer ${newToken}`

        return api.request(originalRequest)
      } catch (e) {
        console.error('Nie udało się odświeżyć tokena:', e)

        await deleteToken('accessToken')
        await deleteToken('refreshToken')
        return Promise.reject(error)
      }
    }

    if (error.response) {
      return Promise.reject(error.response.data)
    } else {
      return Promise.reject(error)
    }
  },
)

export default api
