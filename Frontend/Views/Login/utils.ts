import api from '@helpers/api'
import { LoginForm, LoginSuccess } from './types'
import * as SecureStore from 'expo-secure-store'

export const validateLoginForm = (form: LoginForm) => {
  if (!form.username || !form.password) {
    return 'Proszę wypełnić wszystkie pola'
  }
  return null
}

export const loginApiHandler = async (form: LoginForm) => {
  const { data } = await api.post('/auth/login', form)
  return data
}

export const loginSuccessHandler = async (data: LoginSuccess, setIsLoggedIn: (value: boolean) => void) => {
  await SecureStore.setItemAsync('accessToken', data.accessToken).catch((error) => {
    console.error('Error saving access token:', error)
  })
  await SecureStore.setItemAsync('refreshToken', data.refreshToken).catch((error) => {
    console.error('Error saving refresh token:', error)
  })
  console.log(data);
  setIsLoggedIn(true)
}
