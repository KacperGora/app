import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext, AuthContextType } from '../../context/AuthContext'
import api from '../../helpers/api'
import { Text, TextInput, Button } from 'react-native-paper'
import { useQuery } from 'react-query'
import Loader from '../../components/Loader'

interface LoginForm {
  username: string
  password: string
}

const LoginScreen = () => {
  const { setIsLoggedIn, setLogin, setUserId } = useContext(AuthContext) as AuthContextType
  const [remindChecked, setRemindChecked] = useState(false)
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: '',
    password: '',
  })

  const { username, password } = loginForm

  const login = async () => {
    const response = await api.post('auth/login', { username, password })
    return response.data
  }

  const storeToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token)
    } catch (error) {
      console.error('Error storing token', error)
    }
  }

  const { data, error, isLoading, refetch } = useQuery('login', login, {
    enabled: false,
    onSuccess: async (data) => {
      const {
        token,
        user: { login, id },
      } = data
      setLogin(login)
      setIsLoggedIn(true)
      setUserId(id)
      storeToken(token)
      await AsyncStorage.setItem('login', login)
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })

  const handleInputChange = (key: keyof LoginForm) => (value: string) => {
    setLoginForm({ ...loginForm, [key]: value })
  }

  const handleLogin = () => {
    refetch()
  }

  if (isLoading) {
    return <Loader />
  }
  return (
    <View style={styles.container}>
      <Text variant='headlineMedium'>Login</Text>
      <TextInput mode='outlined' label='Username' value={username} onChangeText={handleInputChange('username')} style={styles.input} />
      <TextInput
        mode='outlined'
        label='Password'
        value={password}
        onChangeText={handleInputChange('password')}
        secureTextEntry
        style={styles.input}
      />
      <Button mode='contained' onPress={handleLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
})

export default LoginScreen
