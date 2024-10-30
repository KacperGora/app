import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'

const api = axios.create({
  baseURL: 'http://192.168.8.189:3000',
})

const refreshToken = async () => {
  const token = await AsyncStorage.getItem('token')
  if (!token) return null
  try {
    const response = await api.post('/auth/refresh-token')
    const newToken = response.data.token
    await AsyncStorage.setItem('token', newToken)
    return newToken
  } catch (error) {
    console.error('Error refreshing token', error)
    return null
  }
}

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    const decoded = jwtDecode(token)
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      const newToken = await refreshToken()
      if (newToken) {
        config.headers['Authorization'] = `Bearer ${newToken}`
      }
    } else {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  }
  return config
})

// api.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (error) => {
//     const originalRequest = error.config
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true
//       const newToken = await refreshToken()
//       if (newToken) {
//         originalRequest.headers['Authorization'] = `Bearer ${newToken}`
//         return api(originalRequest)
//       }
//     }
//     return Promise.reject(error)
//   },
// )

export default api
