import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import api from './api'

export const checkTokenExpiration = async () => {
  const token = await AsyncStorage.getItem('token')
  if (!token) return
  const decodedToken = jwtDecode(token)
  const currentTime = Date.now() / 1000
  if (decodedToken.exp && decodedToken.exp < currentTime) {
    try {
      const response = await api.post('/auth/refresh-token')
      await AsyncStorage.setItem('token', response.data.token)
    } catch (error) {
      console.error('Error refreshing token', error)
    }
  }
}
